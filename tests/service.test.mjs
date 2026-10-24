import test from "node:test";
import assert from "node:assert/strict";
import { MemoryStorage, fixture, png, runtime } from "./helpers.mjs";
import { LibraryService } from "../scripts/foundry/service.js";
import { assetsOf } from "../scripts/core/scene.js";
import { inspectPackage } from "../scripts/core/package.js";

function setup() {
  runtime(); const storage = new MemoryStorage();
  const service = new LibraryService(storage, { imageInspector: async () => ({ width: 1, height: 1, thumbnail: null }) });
  const scene = fixture(); scene.levels = scene.levels.map(l => ({ ...l, foreground: { src: "" } })); scene.sounds = [];
  const mappings = new Map(assetsOf(scene).map(a => [a.source, { name: a.source, bytes: png }]));
  return { storage, service, scene, mappings };
}
const meta = { name: "Test map", category: "dungeons", tags: "tower, test" };

test("archive + portable ZIP + independent library + new world copy preserves native data", async () => {
  const { storage, service, scene, mappings } = setup();
  const original = structuredClone(scene);
  const plan = await service.plan({ scene, mappings }); const record = await service.archive(plan, meta);
  assert.deepEqual(scene, original); assert.equal(storage.catalog.entries.length, 1);
  const zip = await service.export(storage.catalog, [record]); const parsed = await inspectPackage(zip);
  assert(parsed.own); assert.equal(parsed.candidates.length, 1);
  const fresh = new MemoryStorage(); const next = new LibraryService(fresh, { imageInspector: async () => null });
  const nextPlan = await next.plan(parsed.candidates[0]); const copied = await next.archive(nextPlan, meta);
  let createData, options;
  globalThis.CONFIG = { Scene: { documentClass: { create: async (d, opts) => { createData = d; options = opts; return { ...d, id: d._id }; } } } };
  const created = await next.importToWorld(copied, { includeModuleFlags: true, reviewedAutomation: true });
  assert.equal(created.id, "NewWorldScene001"); assert.equal(options.keepEmbeddedIds, true);
  assert.equal(createData.levels.length, 32); assert.equal(createData.tokens.length, 0);
  assert.equal(createData.regions[0]._id, scene.regions[0]._id); assert(createData.flags.vendor);
  assert(createData.levels[0].background.src.startsWith("modules/map-library/storage/"));
  assert.deepEqual(scene, original);
});
test("failed upload leaves existing archive and catalog intact", async () => {
  const { storage, service, scene, mappings } = setup(); const plan = await service.plan({ scene, mappings });
  const first = await service.archive(plan, meta); const before = structuredClone(storage.catalog);
  storage.failAt = storage.uploadCount + 2;
  await assert.rejects(() => service.archive(plan, meta, { updateId: first.id, expectedRevision: first.revision }), /Synthetic/);
  assert.deepEqual(storage.catalog, before); assert(storage.files.has(first.scene));
});
test("duplicate detection and explicit version update never overwrite old files", async () => {
  const { storage, service, scene, mappings } = setup(); const plan = await service.plan({ scene, mappings });
  const first = await service.archive(plan, meta);
  await assert.rejects(() => service.archive(plan, meta), /Identische/);
  const updated = await service.archive(plan, meta, { updateId: first.id, expectedRevision: first.revision });
  assert.equal(updated.history[0].scene, first.scene); assert.notEqual(updated.scene, first.scene);
  await assert.rejects(() => service.archive(plan, meta, { updateId: first.id, expectedRevision: first.revision }), /verändert/);
});
test("missing/remote assets are reported and require explicit acceptance", async () => {
  const { service, scene } = setup(); scene.levels[0].background.src = "https://example.org/map.png";
  const plan = await service.plan({ scene });
  assert(plan.warnings.some(w => w.code === "asset")); await assert.rejects(() => service.archive(plan, meta), /Fehlende/);
  const record = await service.archive(plan, meta, { allowMissing: true }); assert(record.assets.some(a => !a.path));
});
test("checksum tampering blocks scene import and reports changed assets", async () => {
  const { storage, service, scene, mappings } = setup(); const record = await service.archive(await service.plan({ scene, mappings }), meta);
  storage.files.get(record.assets[0].path)[0] ^= 1;
  const result = await service.preflight(record); assert(result.warnings.some(w => w.code === "asset"));
  storage.files.get(record.scene)[0] ^= 1; await assert.rejects(() => service.preflight(record), /Szenendatei/);
});
test("GM enforcement applies to service mutations even when bypassing UI", async () => {
  const { service, scene, mappings } = setup(); game.user.isGM = false;
  await assert.rejects(() => service.plan({ scene, mappings }), /Spielleitungen/);
  await assert.rejects(() => service.updateMetadata([], {}), /Spielleitungen/);
});
test("aborted archival never commits a catalog entry", async () => {
  const { storage, service, scene, mappings } = setup(); const plan = await service.plan({ scene, mappings });
  await assert.rejects(() => service.archive(plan, meta, { signal: AbortSignal.abort() }), /abort/i);
  assert.equal(storage.catalog.entries.length, 0); assert.equal(storage.uploadCount, 0);
});
test("world self-references follow new root ID and external targets stay intact", async () => {
  const { service, scene, mappings } = setup(); scene.regions[0].behaviors[0].system.destination = `Scene.${scene._id}.Region.Region0000000001`;
  const record = await service.archive(await service.plan({ scene, mappings }), meta);
  globalThis.CONFIG = { Scene: { documentClass: { create: async d => d } } };
  const result = await service.importToWorld(record);
  assert.equal(result.regions[0].behaviors[0].system.destination, "Scene.NewWorldScene001.Region.Region0000000001");
});
