# Sicherheitsmodell und bekannte Grenzen

## Vertrauensgrenzen

Das Modul läuft in Foundrys Browser-Client. Es installiert keinen Serverprozess und besitzt keinen selbst erfundenen HTTP- oder Dateisystem-Endpunkt. Schreibvorgänge gehen über Foundrys dokumentierte FilePicker-APIs. Foundry muss serverseitig die Uploadberechtigung des angemeldeten Nutzers durchsetzen; diese Ablehnung ist vor einer stabilen Veröffentlichung mit einem echten Spielerclient zu prüfen.

Jede wirksame Modulaktion prüft den aktuellen GM-Status. Diese Prüfung verhindert Fehlbedienung und direkte Modul-API-Aufrufe durch normale Clients. Sie ist **keine eigenständige serverseitige Autorisierungsbarriere**: Client-JavaScript kann vom Anwender verändert werden. Das Modul bietet deshalb keinen Socket-RPC an, der beliebige Datei- oder Netzwerkoperationen im Namen eines GM ausführt.

## Gespeicherte Originale

`scene.json` enthält das native Original einschließlich Tokens/Flags und möglicherweise verborgener Spielinhalte. Das ist eine bewusste, in der Importvorschau erläuterte Alpha-Entscheidung zur verlustarmen Aufbewahrung. Tokens werden bei jedem Weltimport aus einer Arbeitskopie entfernt; keine Actors werden erstellt. `FogExploration`-Dokumente werden nie angefordert oder gespeichert.

**Der persistente Modulordner ist keine private Datenbank.** Statische URLs können entsprechend der Foundry-/Webserverkonfiguration abrufbar sein. Keine Cloudpasswörter, OAuth-Tokens, privaten Schlüssel oder vertraulichen Zusatzdaten ablegen. Szenen mit erkannten Zugangsdatenfeldern oder signierten URLs werden abgewiesen; dies ist eine Heuristik und keine Garantie, jedes Geheimnis zu erkennen.

## Eingangsdateien

- JSON: Größen-, Tiefen- und Knotengrenzen; verbotene Prototype-Schlüssel; keine Auswertung als JavaScript.
- ZIP: relative normalisierte Pfade, keine Traversals, Symlinks, Verschlüsselung, ZIP64, Multipart-Archive oder widersprüchlichen Header; maximal unterstützte Kompressionsmethoden 0 und 8.
- Vor Entpacken werden Verzeichnis und deklarierte Größen geprüft. Während des Entpackens gelten tatsächliche Bytegrenzen; jede Datei erhält einen CRC32-Abgleich. Native Pakete zusätzlich SHA-256.
- Dateinamen aus ZIPs werden nicht als Schreibpfade übernommen. Medien werden unter neuen Modulpfaden mit SHA-256-Dateinamen hochgeladen. Fremde Skripte, Shellprogramme und Modulcode im ZIP bleiben ungenutzt.
- Medien werden anhand von Endung und Signatur eingeschränkt; das ersetzt keinen vollständigen Medienparser. SVG und HTML werden nicht importiert. Vorschaubilder werden mit Browserbilddecoder und Canvas erzeugt.
- Keine automatische Änderung eines bestehenden Archivoriginals. Kataloge und Vorlagenrevisionen sind unveränderliche neue Dateien. Keine automatischen Originaldatei-Löschungen.

## Automatisierung in Szenen

Bekannte native Regionsdaten bleiben erhalten. Unbekannte Verhaltensarten und erkennbare Skript-/Makrofelder benötigen ausdrücklich bestätigte Prüfung. Drittanbieter-Flags sind in der Weltkopie standardmäßig aus; ihre Übernahme verlangt dieselbe Prüfbestätigung. Das Archiv bleibt dabei unverändert.

**Diese Heuristik ist keine Sandbox und kein vollständiger Code-Audit.** Insbesondere können aktive fremde Module Daten anders interpretieren. Nur vertrauenswürdige Kartenautomatisierungen übernehmen. Region-/Journal-/Playlist-Ziele werden nur teilweise statisch geprüft; eine vollständige Abhängigkeitsauflösung steht noch aus.

## Netzwerk

Aktuell nur gleichursprüngliche Foundry-Dateien mit `credentials: same-origin`, ohne Redirects, Streaminggrößenlimit und Zeitlimit. Kein generischer Proxy, keine automatischen externen Assetdownloads, kein URL-Import. Damit wird kein ungesicherter Server-Fetch als vermeintlicher SSRF-Schutz eingeführt. DNS-Auflösung, Redirect-Ketten und private IP-Bereiche können mit den bisher geprüften Client-APIs nicht zuverlässig serverseitig kontrolliert werden.

## Meldung eines Problems

Bei öffentlichen Fehlerberichten eine selbst erstellte Minimaldatei verwenden. Keine echten Kartenarchive, Zugangsdaten, signierten URLs, privaten Weltdateien oder personenbezogenen Angaben veröffentlichen. Derzeit gibt es noch keinen eingerichteten privaten Meldekanal; sensible Details bis zur Einrichtung eines solchen Kanals nicht in ein öffentliches Issue schreiben.
