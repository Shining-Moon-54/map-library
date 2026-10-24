Map Library 0.4.0-alpha.5 ergänzt statische SVG-Szenenassets und korrigiert die fälschliche Erkennung zusammengesetzter Modultexte als Dateipfade.

**SVG-Icons:** Statische SVG-Grafiken aus Foundry und Modulen werden vor dem Upload als XML geprüft und unverändert mitgesichert. Das begrenzte Profil weist aktive Inhalte, externe Ressourcen und nicht unterstützte SVG-Funktionen mit einem konkreten Grund zurück. Pro SVG gelten 2 MiB, 10.000 Elemente und 80 Verschachtelungsebenen. Es handelt sich um Unterstützung für Szenenabhängigkeiten; der eigenständige Bildimport bleibt bei PNG/JPG/WebP.

**Modultexte:** Angaben wie `IA: icons/svg/sun.svg|icons/svg/sleep.svg` werden nicht mehr als eine Datei angefordert. Eindeutige einzelne Dateipfade in Flags werden weiterhin kopiert und beim Weltimport angepasst; zusammengesetzte Texte und das native Archivoriginal bleiben unverändert. Die Vorschau meldet nicht lesbare oder abgelehnte Dateien nun als **„Asset nicht gesichert“** mit Ursache.

**Geprüft:** Alle 55 Tests bestehen, darunter statische SVG-Formen/Verläufe/Metadaten, aktive und externe Inhalte, XML-/UTF-8-/Komplexitätsgrenzen, SVG-Archiv-/ZIP-/Weltimport-Roundtrip und die gemeldete zusammengesetzte Zeichenfolge. Alle Testassets sind synthetisch. Die Prüfung mit den tatsächlichen Dateien des Nutzers in Foundry v14 steht noch aus.

**Weiterhin enthalten:** Bibliotheksbutton im Szenenverzeichnis, Sichern per Szenen-Rechtsklick, Medienkopien mit `_` statt Leerzeichen, korrektes Lesen von `%20`-Pfaden und die Collection-Korrektur. Bestehende Archive bleiben lesbar.

**Update:** Welt beenden, im Foundry-Setup unter **Zusatzmodule** die Map Library aktualisieren und die Welt neu laden. Anschließend muss die Modulversion **0.4.0-alpha.5** angezeigt werden. Der unten stehende Manifest-Link bleibt gleich.

Enthalten: native Original-Szenenarchive, lokale Assetkopien, Kategorien und Metadaten, neue World-Scene ohne Tokens, portable ZIPs mit Prüfsummen, Fremd-ZIP-Inventar und manuelle Assetzuordnung, Suche/Favoriten/Paging, unveränderliche Revisionen und Konflikterkennung.

Automatisierte Daten-, Sicherheits-, API-Double- und DOM-Tests sind vorhanden. **Eine echte Foundry-v14-/Canvas-Abnahme steht noch aus.** Zunächst eine separate Testwelt verwenden. Die Runtime-Kompatibilität wird im Manifest nicht als verifiziert ausgegeben.

Noch offen: Detect Grid, UVTT/DD2VTT, sicherer direkter serverseitiger URL-Import, Cloudadapter, per-Level-Vorschauen und eine Wiederherstellungsoberfläche. Die Lizenzentscheidung für den eigenen Projektcode steht noch aus; fflate ist separat MIT-lizenziert.

Dieses Projekt wird mit Unterstützung von OpenAI ChatGPT entwickelt. Es enthält keine fremden Karten oder privaten Foundry-Weltdaten.

Installation in Foundry über **Zusatzmodule → Modul installieren → Manifest URL**:

[https://raw.githubusercontent.com/Shining-Moon-54/map-library/main/module.json](https://raw.githubusercontent.com/Shining-Moon-54/map-library/main/module.json)

Foundry lädt das in der JSON referenzierte ZIP automatisch. Assets: dieses Installationspaket, Modulmanifest und SHA256SUMS. Vollständige Test-/Sicherheitshinweise stehen in der README und docs/TESTING.md.
