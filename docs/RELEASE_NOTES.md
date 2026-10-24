Map Library 0.4.0-alpha.3 behebt falsche Meldungen über fehlende lokale Assets bei Dateipfaden mit Leerzeichen.

**Behoben:** Foundry hinterlegt Leerzeichen häufig als `%20` in Szenenreferenzen. Das Modul kodierte diese Zeichen bisher erneut zu `%2520` und erhielt dadurch einen 404-Fehler. Lokale Pfadbestandteile werden jetzt genau einmal dekodiert und anschließend für die HTTP-Anfrage kodiert. Rohe, kodierte und gemischte Leerzeichen sowie Umlaute funktionieren damit ohne Umbenennen der Dateien. Originaldateien und native Archivdaten bleiben unverändert.

**Geprüft:** Die falsche URL und der fehlgeschlagene Assetzugriff wurden vor der Korrektur reproduziert. Alle 41 Tests bestehen. Ein Integrationstest archiviert eine Datei mit kodiertem Leerzeichen über das simulierte Foundry-Dateisystem, exportiert sie portabel und erstellt eine neue Weltkopie. Tests für Pfadschutz, Umlaute, reservierte Dateinamenzeichen und wörtliche Prozentzeichen sind enthalten. Das Archivformat bleibt unverändert; die Collection-Korrektur aus Alpha 2 ist weiterhin enthalten.

**Update:** Welt beenden, im Foundry-Setup unter **Zusatzmodule** die Map Library aktualisieren und die Welt neu laden. Anschließend muss die Modulversion **0.4.0-alpha.3** angezeigt werden. Der unten stehende Manifest-Link bleibt gleich.

Enthalten: native Original-Szenenarchive, lokale Assetkopien, Kategorien und Metadaten, neue World-Scene ohne Tokens, portable ZIPs mit Prüfsummen, Fremd-ZIP-Inventar und manuelle Assetzuordnung, Suche/Favoriten/Paging, unveränderliche Revisionen und Konflikterkennung.

Automatisierte Daten-, Sicherheits-, API-Double- und DOM-Tests sind vorhanden. **Eine echte Foundry-v14-/Canvas-Abnahme steht noch aus.** Zunächst eine separate Testwelt verwenden. Die Runtime-Kompatibilität wird im Manifest nicht als verifiziert ausgegeben.

Noch offen: Detect Grid, UVTT/DD2VTT, sicherer direkter serverseitiger URL-Import, Cloudadapter, per-Level-Vorschauen und eine Wiederherstellungsoberfläche. Die Lizenzentscheidung für den eigenen Projektcode steht noch aus; fflate ist separat MIT-lizenziert.

Dieses Projekt wird mit Unterstützung von OpenAI ChatGPT entwickelt. Es enthält keine fremden Karten oder privaten Foundry-Weltdaten.

Installation in Foundry über **Zusatzmodule → Modul installieren → Manifest URL**:

[https://raw.githubusercontent.com/Shining-Moon-54/map-library/main/module.json](https://raw.githubusercontent.com/Shining-Moon-54/map-library/main/module.json)

Foundry lädt das in der JSON referenzierte ZIP automatisch. Assets: dieses Installationspaket, Modulmanifest und SHA256SUMS. Vollständige Test-/Sicherheitshinweise stehen in der README und docs/TESTING.md.
