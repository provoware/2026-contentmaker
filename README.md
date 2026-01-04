# Contentmaker – Steuerzentrale

Barrierefreundliches Multi-Modul-Tool mit Fokus auf klare Rückmeldungen, geprüfte Farb-Themes und
einfaches Debugging (Fehlersuche).

## Schnelleinstieg (einfache Sprache)

1. **Startroutine ausführen**  
   `npm run bootstrap`  
   Prüft Ordner, installiert fehlende Abhängigkeiten (Dependencies), führt Tests aus und gibt
   Nutzerfeedback.
2. **Tests laufen lassen**  
   `npm test`  
   Führt Linting (Code-Prüfung), Format-Check (Formatprüfung) und Unit-Tests (Einzeltests) aus.
3. **Code formatieren**  
   `npm run format`  
   Formatiert den Code konsistent.

Öffne `src/index.html`, um die barrierearme Demo aufzurufen. Dort kannst du Farb-Themes
(Farbschemata) wählen, die Schriftgröße regulieren und per Button nur die **Schriftfarben**
invertieren (umkehren). Hintergründe bleiben stabil, damit die Orientierung leicht bleibt. Ein
Debug-Schalter blendet zusätzliche Meldungen im farbkodierten Debug-/Log-Protokoll in der Fußzeile
ein (mit Uhrzeit und Ebenenfarben).

## Start- und Ordnerlogik

- **Systemlogik:** `system/` enthält die Startroutine und überprüft automatisch alle notwendigen
  Ordner (Self-Repair: fehlende Ordner werden erstellt).
- **Konfiguration:** `config/` enthält feste Einstellungen wie Farb-Themes und Start-Parameter.
- **Nutzerdaten:** `data/` ist für spätere Inhalte (z. B. Profile, Archive) reserviert.
- **Logs/Reports:** `logs/` sammelt Protokolle und Berichte für die Startroutine.

## Planungsdokumente

- **Ziele analysiert:** `ZIELE-ANALYSE.md` enthält eine laienfreundliche Checkliste zu Layout
  (Sidebars, Dreispalten-Workflow), Startroutine, Autosave/Backups, Farb-Themes, Validierungen und
  Tests.
- **Nächste Schritte:** `todo.txt` listet priorisierte Aufgaben zu Architektur, Datenformaten,
  automatischer Abhängigkeitsprüfung, Tests und Hilfe-/Tooltip-Konzept.

## Weiterführende Tipps (laienfreundlich)

- **Ordner sichern:** Lege regelmäßig Sicherungskopien an (z. B. ZIP des Projektordners).
- **Kontrast prüfen:** Teste die Themes bei Tageslicht und im Dunkeln.
- **Tastatur testen:** Alle Funktionen sollten auch ohne Maus erreichbar sein.
