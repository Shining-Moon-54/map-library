# Changelog

## 0.4.0-alpha.4 — 2026-10-24

- Schaltfläche „Map Library öffnen“ unten im Szenenverzeichnis, einschließlich separatem Szenenfenster. Bestehende Schaltflächen anderer Module bleiben erhalten; erneutes Rendern erzeugt keine doppelten Einträge.
- Rechtsklick auf eine Welt-Szene → „In Map Library sichern“. Die Importvorschau erhält direkt die gewählte Szene und speichert erst nach Bestätigung. Ordner und Kompendien werden nicht als Welt-Szenen behandelt.
- Integration über die v14-Hooks `renderSceneDirectory` und `getSceneContextOptions`, Registrierung bereits während `init`; GM-Prüfung bei Anzeige und Ausführung. Die Modul-API bietet denselben Vorschauweg als `archiveScene(sceneId)`.
- Dialogrendern wird abgewartet, damit Fehler beim Öffnen von Vorschauen an den auslösenden Zugriff zurückgemeldet werden.
- Insgesamt 48 automatisierte Tests. Die Korrekturen aus Alpha 2 und 3 sind enthalten. Die tatsächliche Prüfung der beiden Menüzugriffe in Foundry v14 steht noch aus.

## 0.4.0-alpha.3 — 2026-10-24

- Beim Sichern ersetzen Medienkopien jedes Leerzeichen im Dateinamen durch `_`, einschließlich URI-kodiertem `%20`. Die Namen sind lesbar und enthalten die vollständige Prüfsumme. Portable Exporte verwenden dieselbe Regel, identische Medienbytes bleiben dedupliziert und Weltkopien verweisen auf die neuen Pfade.
- Lokale Medienpfade mit Leerzeichen und bereits kodierten URI-Zeichen werden genau einmal kodiert. `%20` wird nicht mehr fälschlich zu `%2520`; dadurch verursachte 404-Fehler beim Archivieren sind behoben. Originaldateien und native Szenenreferenzen bleiben erhalten.
- Fünf Regressionstests für rohe/kodierte/gemischte Pfade, Umlaute und reservierte Dateinamenzeichen, unveränderte Pfadschutzprüfungen, sichere Namen ohne Leerzeichen sowie Archivierung → portabler Export → Weltimport mit einem kodierten Serverdateinamen.
- Insgesamt 43 automatisierte Tests. Das Archivformat bleibt kompatibel; eine vollständige echte Foundry-v14-/Canvas-Abnahme steht weiterhin aus.

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
