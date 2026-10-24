import test from "node:test";
import assert from "node:assert/strict";
import { FoundryStorage, ROOT, localURL } from "../scripts/foundry/storage.js";
import { emptyCatalog } from "../scripts/core/catalog.js";
import { jsonBytes } from "../scripts/core/util.js";

function setup() {
  globalThis.document = { baseURI: "https://foundry.example/vtt/game" };
  const files = new Map(), directories = new Set(["modules/map-library"]);
  let permitted = true;
  const picker = {
    async browse(source, path) {
      if (!directories.has(path)) throw new Error("Missing directory");
      return { files: [...files.keys()].filter(p => p.slice(0, p.lastIndexOf("/")) === path) };
    },
    async createDirectory(source, path) { directories.add(path); return { path }; },
    async uploadPersistent(id, folder, file) { const path = `${ROOT}/${folder ? folder + "/" : ""}${file.name}`; files.set(path, new Uint8Array(await file.arrayBuffer())); return { path }; }
  };
  const fetcher = async url => {
    const path = new URL(url).pathname.slice("/vtt/".length);
    return files.has(path) ? new Response(files.get(path)) : new Response(null, { status: 404 });
  };
  const storage = new FoundryStorage({ picker: () => picker, fetcher, permission: () => { if (!permitted) throw new Error("Denied"); } });
  return { storage, files, picker, deny: () => { permitted = false; } };
}

test("local asset URLs respect reverse proxy route prefix", () => {
  setup(); assert.equal(localURL("modules/map-library/storage/maps/test.png"), "https://foundry.example/vtt/modules/map-library/storage/maps/test.png");
});
test("persistent storage initializes and serializes queued catalog changes", async () => {
  const { storage, files } = setup(); await storage.init();
  assert.equal((await storage.load()).head, "root");
  await Promise.all([storage.transaction(c => { c.categories[0].name = "First"; return c; }), storage.transaction(c => { c.categories[1].name = "Second"; return c; })]);
  const result = await storage.load(); assert.equal(result.catalog.categories[0].name, "First"); assert.equal(result.catalog.categories[1].name, "Second");
  assert.equal(files.size, 2); assert.equal((await storage.heads()).length, 1);
});
test("concurrent catalog forks are detected and both immutable snapshots survive", async () => {
  const { storage, files } = setup(); await storage.init();
  for (const revision of ["a".repeat(32), "b".repeat(32)]) files.set(`${ROOT}/catalogs/c.${revision}.root.json`, jsonBytes({ revision, parent: "root", catalog: emptyCatalog() }));
  await assert.rejects(() => storage.load(), /Katalogkonflikt/); assert.equal(files.size, 2);
});
test("tampered snapshot identity is refused", async () => {
  const { storage, files } = setup(); await storage.init();
  files.set(`${ROOT}/catalogs/c.${"a".repeat(32)}.root.json`, jsonBytes({ revision: "b".repeat(32), parent: "root", catalog: emptyCatalog() }));
  await assert.rejects(() => storage.load(), /Dateinamen/);
});
test("writes outside module storage and denied effective operations are refused", async () => {
  const { storage, deny } = setup(); await storage.init();
  await assert.rejects(() => storage.upload("worlds/test/file.json", jsonBytes({})), /eigenen/);
  deny(); await assert.rejects(() => storage.read(`${ROOT}/maps/file.png`), /Denied/);
  await assert.rejects(() => storage.upload(`${ROOT}/maps/file.json`, jsonBytes({})), /Denied/);
});
test("redirects and bounded streaming reads are enforced at the fetch boundary", async () => {
  const { picker } = setup(); let options;
  const storage = new FoundryStorage({ picker: () => picker, permission: () => {}, fetcher: async (url, opts) => { options = opts; return new Response(new Uint8Array(100)); } });
  await assert.rejects(() => storage.read("worlds/test/map.png", undefined, 10), /Dateigröße/);
  assert.equal(options.redirect, "error"); assert.equal(options.credentials, "same-origin");
});
