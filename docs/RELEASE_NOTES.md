Map Library 0.4.0-alpha.4 ergänzt die beiden fehlenden Zugriffe auf die Szenenbibliothek.

**Im Szenenverzeichnis:** Unten erscheint für GMs **„Map Library öffnen“**. Der Button öffnet die zentrale Bibliothek und erscheint auch im separaten Szenenfenster. Andere Modulbuttons bleiben erhalten. Die Einstellung für den schwebenden Button beeinflusst diesen Zugriff nicht.

**Im Rechtsklickmenü einer Welt-Szene:** **„In Map Library sichern“** öffnet direkt die Importvorschau der angeklickten Szene. Gespeichert wird erst über die Bestätigung in der Vorschau. Rechte und die Existenz der Szene werden erneut geprüft; Ordner und Kompendieneinträge werden nicht als Welt-Szenen behandelt.

**Geprüft:** Alle 48 Tests bestehen. Die neuen Hook-/DOM-Tests prüfen erneutes Rendern, Erhalt anderer Schaltflächen, die Auswahl der richtigen Szene, fehlende Szenen, Spielerrechte und die Registrierung vor dem ersten Szenenrendern. Ein Test öffnet die tatsächliche Modulvorschau mit Service-/Storage-Doubles und prüft, dass dabei weder archiviert noch die Quellszene verändert wird. Eine Prüfung dieser Menüs in einer echten Foundry-v14-Laufzeit steht noch aus.

**Weiterhin enthalten:** Sichere Medienkopien mit `_` statt Leerzeichen, korrektes Lesen von `%20`-Pfaden und die Collection-Korrektur aus Alpha 2. Bestehende Archive bleiben lesbar.

**Update:** Welt beenden, im Foundry-Setup unter **Zusatzmodule** die Map Library aktualisieren und die Welt neu laden. Anschließend muss die Modulversion **0.4.0-alpha.4** angezeigt werden. Der unten stehende Manifest-Link bleibt gleich.

Enthalten: native Original-Szenenarchive, lokale Assetkopien, Kategorien und Metadaten, neue World-Scene ohne Tokens, portable ZIPs mit Prüfsummen, Fremd-ZIP-Inventar und manuelle Assetzuordnung, Suche/Favoriten/Paging, unveränderliche Revisionen und Konflikterkennung.

Automatisierte Daten-, Sicherheits-, API-Double- und DOM-Tests sind vorhanden. **Eine echte Foundry-v14-/Canvas-Abnahme steht noch aus.** Zunächst eine separate Testwelt verwenden. Die Runtime-Kompatibilität wird im Manifest nicht als verifiziert ausgegeben.

Noch offen: Detect Grid, UVTT/DD2VTT, sicherer direkter serverseitiger URL-Import, Cloudadapter, per-Level-Vorschauen und eine Wiederherstellungsoberfläche. Die Lizenzentscheidung für den eigenen Projektcode steht noch aus; fflate ist separat MIT-lizenziert.

Dieses Projekt wird mit Unterstützung von OpenAI ChatGPT entwickelt. Es enthält keine fremden Karten oder privaten Foundry-Weltdaten.

Installation in Foundry über **Zusatzmodule → Modul installieren → Manifest URL**:

[https://raw.githubusercontent.com/Shining-Moon-54/map-library/main/module.json](https://raw.githubusercontent.com/Shining-Moon-54/map-library/main/module.json)

Foundry lädt das in der JSON referenzierte ZIP automatisch. Assets: dieses Installationspaket, Modulmanifest und SHA256SUMS. Vollständige Test-/Sicherheitshinweise stehen in der README und docs/TESTING.md.
