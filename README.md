# Songtexter-Tool 2026 PROVOWARE Version

Multi-Modul-Tool, erweiterbar und barrierefrei gedacht, mit farbkodiertem Debugging-Fußbereich.

## Schnelleinstieg

- `npm run bootstrap`: Startroutine prüft Ordner, installiert fehlende Abhängigkeiten und meldet Status in einfacher Sprache.
- `npm test`: führt Linting, Format-Check und Unit-Tests aus.
- `npm run format`: formatiert den Code konsistent.

Öffne `src/index.html`, um die barrierearme Demo aufzurufen. Dort kannst du Farb-Themes wählen, die Schriftgröße regulieren und per Button nur die **Schriftfarben** invertieren (Hintergründe bleiben stabil). Ein Debug-Schalter blendet zusätzliche Meldungen im farbkodierten Debug-/Log-Protokoll in der Fußzeile ein (inklusive Zeitstempel und Ebenenfarben).

## Planungsdokumente

- **Ziele analysiert:** `ZIELE-ANALYSE.md` enthält eine laienfreundliche, farb- und kontrastbewusste Checkliste zu Layout (Sidebars, Dreispalten-Workflow), Startroutine/Self-Repair, Autosave/Backups, Farb-Themes, Validierungen und Tests.
- **Nächste Schritte:** `todo.txt` listet priorisierte Aufgaben zu Architektur, Trennung von System/Config/Daten, automatischer Abhängigkeitsprüfung, Test/Linting-Pipeline und Hilfe-/Tooltip-Konzept.
