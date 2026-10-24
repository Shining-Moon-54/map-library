# Changelog

## 0.4.0-alpha.2 — 2026-10-24

- Fehler „(destructured parameter) is not iterable“ beim Öffnen der Importvorschau behoben. `game.modules` ist eine Foundry Collection, deren Standarditerator Modulobjekte statt Schlüssel-Wert-Paaren liefert. Vorschau und Importprüfung lesen jetzt ausdrücklich die Werte und aktiven Modulkennungen.
- Nichtleere Foundry-Collection-Doubles und ein Regressionstest für Vorschau, Archivierung und Importprüfung; aktive, deaktivierte und nicht installierte Fremdmodule werden unterschieden.
- Release-Zweige werden erst nach Veröffentlichung und anonymer Prüfung des Installationspakets nach `main` übernommen. Der Manifest-Link bleibt unverändert.

Keine Änderung des Archivformats. Eine vollständige echte Foundry-v14-/Canvas-Abnahme steht weiterhin aus.

## 0.4.0-alpha.1 — 2026-10-24

Neuer, modularer Implementierungsstand unter der ID `map-library`, anhand der vollständigen Projektübergabe vom 24.10.2026. Der alte Prototyp wird nicht als fertiger Vorgänger übernommen.

- Native Szenenoriginale über `toObject()`, kein pauschales Entfernen von Leveln, Regionen, Tiles, Dächern oder Flags im Archiv.
- Weltkopien ohne Tokens; neue Stammkennung und Erhaltung eingebetteter Kennungen über `keepEmbeddedIds`; bekannte Selbstverweise folgen der neuen Szenenkennung.
- Konservative Warnungen vor fremden Flags, unbekannter Automatisierung, nicht auflösbaren Szenenzielen und fehlenden Assets; explizite Freigaben.
- Lokale Assetkopien, SHA-256, Vorlagenrevisionen, Katalog-Snapshots ohne Überschreiben und Erkennung paralleler Katalogzweige.
- Kategorienhierarchie, Metadaten, Suche, Filter, Favoriten, Kachel-/Listenansicht, Paging mit 48 Einträgen und Mehrfachauswahl.
- PNG/JPG/WebP, native Szenen-JSON, eigener ZIP-Roundtrip sowie Fremd-ZIP-Inventar mit manueller Assetzuordnung.
- ZIP-Pfadschutz, Größen-/Dateianzahl-/Kompressionslimits, Headerabgleich, CRC32 und SHA-256.
- Entwicklungstests, API-Diagnose, CI, Paketbau und manuell auslösbarer Prerelease-Workflow.
- Ausgearbeitete Architektur, Sicherheitsgrenzen, Formate, Migration und nächste Meilensteine.

Noch keine echte Foundry-v14-/Canvas-Abnahme. Detect Grid, UVTT/DD2VTT, sicherer serverseitiger URL-Import und Cloud-Adapter folgen in gesonderten Meilensteinen.
