# Tests und Abnahme

Stand 24.10.2026: **37 automatisierte Tests bestanden**. Ausgeführt mit Node 24.19.0. Kein realer Foundry-v14-Server war in der Entwicklungsumgebung verfügbar. Die synthetischen Fixtures sind selbst erzeugt; sie sind keine von Foundry validierten Exportbeispiele.

## Automatisch geprüft

```bash
npm ci --ignore-scripts
npm run check
npm test
npm run build
```

| Testgruppe | Inhalt |
| --- | --- |
| Szene | 32 Level, eingebettete Kennungen, native Daten unverändert, Wände/Licht/Tiles/Dächer/Regionen, optionale Flags, Tokens nur aus Arbeitskopie entfernt |
| Medien/Referenzen | Levelhintergründe, Dachbilder, Zeichnungen, Tile-/Flag-Medien, Audio bei tatsächlicher Referenz, fehlende Szenenziele |
| JSON/Pfade | Prototype-Schlüssel, Tiefenlimit, Dokumenttyp, erkennbare Secrets, Traversal und kodierte Pfade |
| Katalog | Hierarchie, Umbenennen/Verschieben, Zyklusfehler, Suche und Paging mit 5.000 Metadaten |
| ZIP | Stored/Deflate, CRC32, Headerabweichungen, Verschlüsselung, Größen-/Dateianzahl-/Expansionsschutz, Fremdzuordnung und Abbruch |
| Roundtrip | Archiv → ZIP → zweite simulierte Bibliothek → neue simulierte World-Scene |
| Datenverlust | Uploadfehler, Dublettenbestätigung, unveränderliche alte Revision, veraltete Update-Anforderung, Hashmanipulation |
| Rechte/Speicher | GM-Prüfung direkt am Service, Modulpfadgrenze, Unterpfadproxy, Streaminglimits, Snapshotidentität, zwei Katalogköpfe |
| DOM | Maximal 48 Karten, Text statt Ausführung fremder HTML-Namen; mit linkedom ohne echten Browserrender |

Diese Tests verwenden API-Doubles für Foundry. Sie prüfen **nicht** die native Szenevalidierung, die Canvasdarstellung, tatsächlich serverseitige Uploadrechte oder Foundrys Modulupdateverhalten.

## Echte v14-Abnahme — noch offen

Einträge erst nach tatsächlicher Durchführung mit Version, Datum, Betriebssystem und Ergebnis ergänzen. Keine Häkchen allein aufgrund isolierter Tests setzen.

| ID | Durchführung | Erwartetes Ergebnis | Stand |
| --- | --- | --- | --- |
| V14-01 | Installations-ZIP in separater v14-Testwelt aktivieren | Init/Ready ohne Konsolefehler, Settings und Schaltfläche sichtbar | Offen |
| V14-02 | Bild mit bekanntem Raster importieren | Richtige Maße; natives Level; Rasterdaten bleiben unangetastet | Offen |
| V14-03 | Echte Szene mit 32 Leveln, unterschiedlichen Höhen/Sichtbarkeiten, Tiles und Dächern archivieren | Vollständige native Daten, Assets und Warnungen; Original unverändert | Offen |
| V14-04 | `toObject`, `toCompendium`, manuelles `exportToJSON` vergleichen | Tatsächliche Bereinigung dokumentiert; keine Mutationen am Original | Offen |
| V14-05 | Aus Archiv neue Szene in zweiter Welt auf demselben Server erstellen | Keine Tokens; keine Actors; alle eingebetteten Level/Regionen/IDs korrekt | Offen |
| V14-06 | ZIP auf zweiter Foundry-Installation importieren | Keine alten absoluten Serverpfade nötig; alle Medien nutzbar | Offen |
| V14-07 | Regionen mit Level-/Szenenzielen, fehlendem Journal und Fremdflags | Warnungen konkret; keine vorsorgliche Regionslöschung; optionale Übernahme funktioniert | Offen |
| V14-08 | Verdächtige/ungewöhnliche Regionsbehaviors und Modulflags | Ohne Prüfbestätigung kein unbeabsichtigtes Ausführen | Offen |
| V14-09 | Fehlende Datei, ersetzte Mediendatei, beschädigte Szene | Sichtbarer Fehler bzw. bewusstes Trotzdem; Szenenhashfehler blockiert | Offen |
| V14-10 | Spielerclient, Rollenwechsel während Upload, direkte Uploadanfrage | Modul-GM-Prüfung und reale Foundry-Serverberechtigungen wirksam | Offen |
| V14-11 | Unterpfad-Reverseproxy, Dateinamen mit Leerzeichen, Hostupdate | Pfade korrekt; persistente Daten nach gewöhnlichem Update noch da | Offen |
| V14-12 | Gleichzeitige GMs / zwei Geräte | Keine stillen überschriebenen Kataloge; Konflikt erkannt und Quellen erhalten | Offen |
| V14-13 | 10.000 Metadaten, große Karte, Pi-Hosting | Ladezeit/RAM/CPU messen, keine Tausende aktiven World-Scenes | Offen |
| V14-14 | Abbruch und Fehler während Medienupload / Katalogabschluss | Alte Bibliothek intakt; eventuell unverknüpfte Dateien dokumentiert | Offen |
| V14-15 | Veröffentlichtes Manifest und ZIP ohne Anmeldung laden | Korrekte anonyme Antworten, vollständiges ZIP, Manifestversion identisch | Release-Workflow führt Prüfung aus; Erfolg erst danach eintragen |

## Echte Testszene vorbereiten

In einer Testwelt selbst eine Karte mit deutlichem Raster und mehreren sichtbaren markierten Ebenen erstellen. Je Ebene mindestens eine andere Höhenlage und eine andere Bildzuordnung. Dazu verschlossene Tür, Licht, transparentes Dachtile, Zeichnung, mehrere Regionsformen, einen Levelübergang und einen absichtlich fehlenden Szenenverweis. Einige Tokens zur Kontrolle des Ausschlusses setzen. Falls Fremdmodulflags getestet werden, Anbieter und Version nennen.

Hash/Export des Originals vor und nach Archivieren sowie vor und nach abgebrochenem Weltimport vergleichen. Neue Szenen zunächst nur ansehen und kontrollieren; erst nach erfolgreicher Prüfung aktivieren. Testweltartefakte nicht ungeprüft öffentlich committen.

## Releasekriterium

Eine experimentelle Alpha darf mit offenen Runtimepunkten klar gekennzeichnet werden. Für einen stabilen Release sind V14-01 bis V14-14, das anonyme Installationskriterium sowie die relevante Funktionsabnahme der jeweiligen Etappe erforderlich. `compatibility.verified` wird erst nach dokumentierter echter Laufzeitprüfung gesetzt.
