Map Library 0.4.0-alpha.1 ist die erste neu aufgebaute experimentelle Alpha für Foundry VTT v14.

Enthalten: native Original-Szenenarchive, lokale Assetkopien, Kategorien und Metadaten, neue World-Scene ohne Tokens, portable ZIPs mit Prüfsummen, Fremd-ZIP-Inventar und manuelle Assetzuordnung, Suche/Favoriten/Paging, unveränderliche Revisionen und Konflikterkennung.

Automatisierte Daten-, Sicherheits-, API-Double- und DOM-Tests sind vorhanden. **Eine echte Foundry-v14-/Canvas-Abnahme steht noch aus.** Zunächst eine separate Testwelt verwenden. Die Runtime-Kompatibilität wird im Manifest nicht als verifiziert ausgegeben.

Noch offen: Detect Grid, UVTT/DD2VTT, sicherer direkter serverseitiger URL-Import, Cloudadapter, per-Level-Vorschauen und eine Wiederherstellungsoberfläche. Die Lizenzentscheidung für den eigenen Projektcode steht noch aus; fflate ist separat MIT-lizenziert.

Dieses Projekt wird mit Unterstützung von OpenAI ChatGPT entwickelt. Es enthält keine fremden Karten oder privaten Foundry-Weltdaten.

Installation in Foundry über **Zusatzmodule → Modul installieren → Manifest URL**:

[https://raw.githubusercontent.com/Shining-Moon-54/map-library/main/module.json](https://raw.githubusercontent.com/Shining-Moon-54/map-library/main/module.json)

Foundry lädt das in der JSON referenzierte ZIP automatisch. Assets: dieses Installationspaket, Modulmanifest und SHA256SUMS. Vollständige Test-/Sicherheitshinweise stehen in der README und docs/TESTING.md.
