Map Library 0.4.0-alpha.6 korrigiert zu strenge SVG-Stilprüfungen beim Sichern einer Szene.

**Korrektur:** `touch-action` und `height` wurden in Alpha 5 fälschlich als nicht unterstützte SVG-Stile abgewiesen. Die Prüfung erlaubt nun `touch-action`, Breite/Höhe, Mindest-/Maximalgrößen und SVG-Geometrie in Inline-Stilen. Damit entfallen diese Ablehnungsgründe bei statischen Foundry-Icons und Modul-Tiles. Akzeptierte SVG-Bytes bleiben unverändert; Skripte, externe Ressourcen und dynamische oder nicht erlaubte Stile werden weiterhin abgewiesen.

**Geprüft:** Alle 58 Tests bestehen. Neue Regressionstests prüfen die gemeldeten Stilmuster, aktive/externe Werte und eine synthetische Vier-Ebenen-Szene mit den Pfaden für `book.svg`, `daze.svg`, `sun.svg`, `explosion.svg` und `rope-coil.svg` bis zum Archiv-/ZIP-/Weltimport. Der Fehler wurde vor der Korrektur mit diesen Mustern reproduziert. Es wurden keine Foundry- oder Hersteller-Grafiken in das Repository aufgenommen. Die tatsächlichen Nutzerdateien und die echte Foundry-v14-/Canvas-Darstellung sind hier noch nicht geprüft.

**Weiterhin enthalten:** Statische SVG-Szenenassets, keine zusammengesetzten Modultexte als Einzeldateien, Bibliotheksbutton im Szenenverzeichnis, Sichern per Szenen-Rechtsklick, Medienkopien mit `_` statt Leerzeichen, korrektes Lesen von `%20`-Pfaden und die Collection-Korrektur. Bestehende Archive bleiben lesbar. Pro SVG gelten weiterhin 2 MiB, 10.000 Elemente und 80 Verschachtelungsebenen; der eigenständige Bildimport bleibt bei PNG/JPG/WebP.

**Update:** Welt beenden, im Foundry-Setup unter **Zusatzmodule** die Map Library aktualisieren und die Welt neu laden. Anschließend muss die Modulversion **0.4.0-alpha.6** angezeigt werden. Der unten stehende Manifest-Link bleibt gleich.

Enthalten: native Original-Szenenarchive, lokale Assetkopien, Kategorien und Metadaten, neue World-Scene ohne Tokens, portable ZIPs mit Prüfsummen, Fremd-ZIP-Inventar und manuelle Assetzuordnung, Suche/Favoriten/Paging, unveränderliche Revisionen und Konflikterkennung.

Automatisierte Daten-, Sicherheits-, API-Double- und DOM-Tests sind vorhanden. **Eine echte Foundry-v14-/Canvas-Abnahme steht noch aus.** Zunächst eine separate Testwelt verwenden. Die Runtime-Kompatibilität wird im Manifest nicht als verifiziert ausgegeben.

Noch offen: Detect Grid, UVTT/DD2VTT, sicherer direkter serverseitiger URL-Import, Cloudadapter, per-Level-Vorschauen und eine Wiederherstellungsoberfläche. Die Lizenzentscheidung für den eigenen Projektcode steht noch aus; fflate ist separat MIT-lizenziert.

Dieses Projekt wird mit Unterstützung von OpenAI ChatGPT entwickelt. Es enthält keine fremden Karten oder privaten Foundry-Weltdaten.

Installation in Foundry über **Zusatzmodule → Modul installieren → Manifest URL**:

[https://raw.githubusercontent.com/Shining-Moon-54/map-library/main/module.json](https://raw.githubusercontent.com/Shining-Moon-54/map-library/main/module.json)

Foundry lädt das in der JSON referenzierte ZIP automatisch. Assets: dieses Installationspaket, Modulmanifest und SHA256SUMS. Vollständige Test-/Sicherheitshinweise stehen in der README und docs/TESTING.md.
