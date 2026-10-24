import { ID, VERSION } from "./core/constants.js";
import { FoundryStorage, requireGM } from "./foundry/storage.js";
import { LibraryService } from "./foundry/service.js";
import { makeApplications, node } from "./foundry/ui.js";
import { diagnoseScene } from "./foundry/diagnostics.js";

Hooks.once("init", () => {
  const storage = new FoundryStorage(), service = new LibraryService(storage);
  const { MapLibraryApp } = makeApplications(storage, service);
  const open = () => { requireGM(); return new MapLibraryApp().render({ force: true }); };
  game.settings.registerMenu(ID, "library", {
    name: "Map Library öffnen", label: "Bibliothek öffnen", icon: "fa-solid fa-map",
    hint: "Weltübergreifendes Archiv für native Foundry-v14-Szenen. Experimentelle Alpha.", type: MapLibraryApp, restricted: true
  });
  game.settings.register(ID, "launcher", { name: "Map-Library-Schaltfläche anzeigen", scope: "client", config: true, type: Boolean, default: true, requiresReload: true });
  game.modules.get(ID).api = Object.freeze({ version: VERSION, open, storage, service, diagnoseScene });
});

Hooks.once("ready", () => {
  if (!game.user.isGM) return;
  if (Number(game.release?.generation) !== 14) {
    ui.notifications.error("Map Library unterstützt ausschließlich Foundry VTT v14."); return;
  }
  if (game.settings.get(ID, "launcher")) {
    const launch = node("button", "Map Library", "ml-launcher"); launch.type = "button";
    launch.addEventListener("click", () => { game.modules.get(ID).api.open().catch(error => ui.notifications.error(error.message)); });
    document.body.append(launch);
  }
});
