Map Library **0.4.0-alpha.7** ergänzt Löschen/Papierkorb und manuelle Cloudexporte nach Google Drive und Dropbox.

- **Löschen:** Button an der Karte und für mehrere ausgewählte Karten; erst nach Bestätigung. Unter **Bereich → Papierkorb** einzeln/gemeinsam wiederherstellen. Mediendateien und Historie bleiben für vorhandene Welt-Szenen erhalten; noch keine Speicherbereinigung.
- **Cloudexport:** **Cloud-Konten** in Bibliothek/Moduleinstellungen → Anbieter und eigenes Profil einrichten → verbinden → einzelne Karte oder Auswahl exportieren. Mehrere Konten, Profillimit in GB, frischer Nutzungsscan, neue Exportdatei und Anbieter-Prüfsummenabgleich.
- **Einrichtung erforderlich:** Diese Alpha enthält keine gemeinsame Anbieter-App. Eigene Google-Web-OAuth-Client-ID bzw. Dropbox-App-Key einmalig erforderlich; **kein Client-Secret**. Zugangstokens bleiben nur in der laufenden Browsersitzung. Nach Neuladen/Ablauf erneut verbinden. [Einrichtung](https://github.com/Shining-Moon-54/map-library/blob/main/docs/CLOUD.md).
- **Datenhaltung:** Archiv bleibt vollständig lokal. Keine automatische Cloud-Synchronisierung, kein Remote-Delete und kein Cloud-only-/Cachebetrieb. Geräteübergreifende Quoten sind nicht atomar reserviert. Ein abgebrochener Upload kann bereits abgeschlossen sein; Ziel vor erneutem Export prüfen.

**Geprüft:** Alle 86 automatisierten Tests bestehen. 28 neue Prüfungen für Papierkorb/DOM, Profile ohne Tokenpersistenz, Kontoabgleich, GM-Rechte, Limits und konkurrierende Exporte, Dropbox-PKCE, Google-Tokenkonfiguration, paginierte Nutzungsscans, Uploadblöcke und Prüfsummenabweichungen. Je ein HTTP-Adapter-Roundtrip führt ein vollständiges Kartenpaket durch simulierten Google-/Dropbox-Upload und unabhängige Wiederaufnahme.

**Offene Abnahme:** Keine echten Cloudkonten oder lizenzierte Foundry-v14-Laufzeit in der Entwicklungsumgebung. Appregistrierungen, Kontouploads, Popup-/CORS-Verhalten und Bedienabläufe anhand `docs/TESTING.md` prüfen. Manifest weiterhin ohne `compatibility.verified`.

Bisherige SVG-, Pfad-, Menü- und Collection-Korrekturen bleiben enthalten. Bestehende Archive bleiben lesbar. Offen: Detect Grid, UVTT/DD2VTT, direkter serverseitiger URL-Import, weitere Cloudanbieter, Cache/Sync/Kategorieprofile, per-Level-Vorschauen und historische Recovery-/Merge-Oberfläche. Lizenzentscheidung für eigenen Code offen; fflate separat MIT.

**Update:** Welt beenden → Foundry-Setup → **Zusatzmodule → Map Library aktualisieren** → Welt neu laden. Anschließend muss **0.4.0-alpha.7** angezeigt werden. Installation über **Modul installieren → Manifest URL**:

[https://raw.githubusercontent.com/Shining-Moon-54/map-library/main/module.json](https://raw.githubusercontent.com/Shining-Moon-54/map-library/main/module.json)

Dieses Projekt wird mit Unterstützung von OpenAI ChatGPT entwickelt und enthält keine privaten Weltdaten, fremden Karten oder Zugangsdaten.
