Map Library 0.4.0-alpha.2 behebt den gemeldeten Fehler beim Archivieren einer Welt-Szene in Foundry VTT v14.

**Behoben:** Beim Klick auf „Importvorschau öffnen“ erschien „(destructured parameter) is not iterable“. Die Auswertung der aktiven Module behandelt Foundrys Collection jetzt korrekt. Dieselbe Korrektur gilt für die Prüfung vor dem Weltimport.

**Geprüft:** Der Fehler wurde automatisiert vor der Korrektur reproduziert. Alle 38 Tests bestehen mit einem nichtleeren Foundry-Collection-Double; aktive, deaktivierte und fehlende Fremdmodule werden geprüft. Das Archivformat bleibt unverändert.

**Update:** Welt beenden, im Foundry-Setup unter **Zusatzmodule** die Map Library aktualisieren und die Welt neu laden. Anschließend muss die Modulversion **0.4.0-alpha.2** angezeigt werden. Der unten stehende Manifest-Link bleibt gleich.

Enthalten: native Original-Szenenarchive, lokale Assetkopien, Kategorien und Metadaten, neue World-Scene ohne Tokens, portable ZIPs mit Prüfsummen, Fremd-ZIP-Inventar und manuelle Assetzuordnung, Suche/Favoriten/Paging, unveränderliche Revisionen und Konflikterkennung.

Automatisierte Daten-, Sicherheits-, API-Double- und DOM-Tests sind vorhanden. **Eine echte Foundry-v14-/Canvas-Abnahme steht noch aus.** Zunächst eine separate Testwelt verwenden. Die Runtime-Kompatibilität wird im Manifest nicht als verifiziert ausgegeben.

Noch offen: Detect Grid, UVTT/DD2VTT, sicherer direkter serverseitiger URL-Import, Cloudadapter, per-Level-Vorschauen und eine Wiederherstellungsoberfläche. Die Lizenzentscheidung für den eigenen Projektcode steht noch aus; fflate ist separat MIT-lizenziert.

Dieses Projekt wird mit Unterstützung von OpenAI ChatGPT entwickelt. Es enthält keine fremden Karten oder privaten Foundry-Weltdaten.

Installation in Foundry über **Zusatzmodule → Modul installieren → Manifest URL**:

[https://raw.githubusercontent.com/Shining-Moon-54/map-library/main/module.json](https://raw.githubusercontent.com/Shining-Moon-54/map-library/main/module.json)

Foundry lädt das in der JSON referenzierte ZIP automatisch. Assets: dieses Installationspaket, Modulmanifest und SHA256SUMS. Vollständige Test-/Sicherheitshinweise stehen in der README und docs/TESTING.md.
