# Cloud — Adapter- und Sicherheitsentwurf

**Noch keine Cloudanbindung implementiert.** Im Modul existieren deshalb keine angeblich bereits durchgesetzten Quoten oder Anmeldefelder ohne Backend. Manuelles Ablegen eines Export-ZIPs auf einem Cloudspeicher ist unabhängig nutzbar.

## Anbieterprüfung

| Anbieter | Zu prüfender Zugang | Grenze einer reinen Foundry-Client-Erweiterung |
| --- | --- | --- |
| Dropbox | OAuth mit PKCE, providerkonforme Redirects und Scopes | Appregistrierung, Redirect-Lebenszyklus und Tokenaufbewahrung klären |
| Google Drive | Provider-OAuth, möglichst begrenzter Dateizugriff | Browserorigins, Appfreigaben und Refreshregeln prüfen |
| OneDrive | Microsoft-OAuth mit PKCE | Persönliche/Organisationskonten und erlaubte Redirects unterscheiden |
| Nextcloud/WebDAV | Anbieterendpoint und begrenztes Appkennwort | CORS, Credentials im Client, keine versteckte Serverweiterleitung |
| S3 / B2 | Foundry-native S3-Konfiguration oder kurzlebige eingeschränkte Berechtigung | Keine langlebigen Rootschlüssel in Flags/Einstellungen |
| SFTP | Sichere Transport-/Authschnittstelle | Im Browser nicht als gewöhnliches Fetch-Protokoll verfügbar; keine eingebildete Node-SSH-Laufzeit |

Diese Tabelle ist eine Prüfagenda, keine bestätigte Providerunterstützung. Jeder Anbieter wird erst nach aktueller primärer API-Prüfung und Ende-zu-Ende-Test freigegeben. Ein weiterer lokaler Dienst oder manuell eingerichteter systemd-Prozess darf keine Modulvoraussetzung werden.

## Profilmodell

`profile = { id, provider, displayName, accountLabel, quotaGB, fallbackProfileId, capabilities, status }`. Mehrere Profile dürfen denselben Provider besitzen. Metadaten und Tokens getrennt halten; der exportierte Katalog enthält keine Secrets. Tokenpersistenz nur anbieten, wenn die tatsächliche Sicherheitsgrenze klar und vertretbar ist.

Anbieterauswahl zuerst, danach ausschließlich passende Felder. Keine unsichere Anmeldung durch Eingabe eines Client-Secret in frei abrufbare Moduldateien. PKCE ist kein Ersatz für die Prüfung von erlaubten Origins, Redirects und Tokenzugriff anderer Foundry-Clients.

## Speicher und Cache

- Globales lokales Cachelimit in GB; `0` bedeutet keine vom Modul gesetzte Obergrenze.
- Jedes Konto besitzt ein eigenes Modul-Speichernutzungslimit in GB; `0` bedeutet keine Modulobergrenze, nicht unbegrenztes Anbieterkontingent.
- Kategorie bevorzugt ein Profil und optional ein Fallback. Neue Zuordnung verschiebt keine vorhandenen Dateien automatisch.
- Uploadplan reserviert erwartete Bytes vor dem Transfer und gleicht tatsächliche Bytes danach ab. Limit überschritten → expliziter Fallback oder stoppen.
- Metadaten/Thumbnails lokal, Originale gegebenenfalls remote. Jede Assetkopie trägt Hash, Anbieterkennung, Version und Kennzeichnung Original/Cache.
- Cachebereinigung entfernt ausschließlich nachweisbare Cachekopien. Aktive Welt-Szenen pinnen die nötigen lokalen Assets. Keine einzige letzte Originalkopie löschen.

## Manuelle Sync

Ein Button startet einen nachvollziehbaren Scan-/Transferplan mit Abbruch und Bericht. Keine Timer-Synchronisierung. Ein optional vollständiger Scan kann außerhalb des Moduls hinzugefügte Dateien entdecken.

| Befund | Aktion |
| --- | --- |
| Remote neu, lokal unbekannt | Als Importkandidat melden |
| Beide Seiten identischer Hash | Keine Übertragung |
| Lokal/remote unterschiedliche Version | Konflikt anzeigen, keine automatische Gewinnerwahl |
| Lokal fehlt | Remote unverändert lassen |
| Remote fehlt | Lokales Original behalten, Fehlstatus zeigen |
| Zugriff/Quota/Netzwerkfehler | Plan stoppen oder geprüften Fallback anbieten; kein stiller Erfolg |

Abnahme pro Anbieter: zwei Konten desselben Providers, leeres und ausgeschöpftes Limit, unterbrochener Transfer, Credentialablauf, gleichzeitige Änderungen, fehlende Remote-Datei, aktives Asset im Cache und Export ohne Secrets. Erst danach weitere Anbieter ergänzen.
