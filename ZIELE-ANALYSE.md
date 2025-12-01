# Analyse der Ziele für das Songtext-Dashboard

Diese Version ist als übersichtliche Checkliste aufgebaut. Alle Aussagen sind in Alltagssprache formuliert, Fachwörter stehen in Klammern und werden sofort erklärt. Ziel ist maximale Barrierefreiheit, Robustheit und Sichtbarkeit der wichtigsten To-dos.

## Schneller Überblick
- **Zweck:** Ein webbasiertes Songtext-Dashboard zum Schreiben, Organisieren und Archivieren.
- **Qualität:** Robust, erweiterbar (Plugin-fähig), laienfreundlich, voll zugänglich (barrierefrei) und mit klaren Farb-Themes.
- **Sicherheit & Kontrolle:** Jede Funktion prüft Eingaben, bestätigt Ergebnisse, loggt Abläufe und hat Debug-Modus.
- **Automatik:** Startroutine löst Abhängigkeiten, richtet Tests ein und gibt Fortschritt mit deutlichem Nutzerfeedback aus.

## Layout & Bedienung (sichtbar in drei Zonen)
1. **Linke Sidebar** – Songbereiche und Templates (Vorlagen) anlegen, umbenennen, speichern. Bereiche wie Intro, Strophe, Bridge frei definierbar, keine Doppelungen.
2. **Mittlerer Arbeitsbereich (drei Spalten)**
   - Spalte 1: Song aufbauen, Bereiche einfügen, Texte bearbeiten, Titel setzen.
   - Spalte 2 (oben/unten geteilt): Zusatzinfos (Genres, Tags, Hashtags, Coverideen, Versionen, Sonstiges). Profile speichern/importieren/exportieren. Kommaseparierte Eingaben werden einzeln gespeichert; Duplikate werden automatisch ignoriert; Anzahl anzeigen.
   - Spalte 3: Gesamttext-Vorschau plus Steuerung zum Speichern/Export ins Archiv.
3. **Rechte Sidebar** – Projektordner mit gespeicherten Songs, sortier- und editierbar, inklusive Status (Autosave, Backups, Zeitstempel).

## Automatik, Startroutine & Self-Repair
- **Startroutine** prüft fehlende Abhängigkeiten (Bibliotheken, Tools), installiert sie automatisch, trennt Systemcode, Konfiguration und variable Nutzerdaten in eigene Ordner und zeigt den Fortschritt als Schritt-für-Schritt-Dialog.
- **Self-Repair** (Selbstheilung): erkennt Fehler früh, protokolliert sie, bietet klare Vorschläge und versucht automatische Behebung; falls erfolglos, Nutzerhinweis in einfacher Sprache.
- **Autosave & Backups:** Alle 5 Minuten und bei Logout; Dateiname = Songtitel; klarer Statusbalken mit Zeitstempel.

## Daten- & Strukturvorgaben
- **Saubere Trennung:**
  - System-/Tool-Logik in einem eigenen Modulpfad.
  - Konfigurationsdateien (config) separat, versioniert und dokumentiert.
  - Variable Nutzerdaten/Archive in eigenem Ordner.
- **Formate:** JSON und TXT für Songs, Profile, Logs; Import/Export immer möglich.
- **Validierung:** Jede Eingabe wird geprüft (z. B. Pflichtfelder, doppelte Einträge) und jede Ausgabe bestätigt (Erfolgsmeldung mit Klartext).

## Barrierefreiheit & Design (sichtbarkeit zuerst)
- **Farb-Themes:** Mehrere wählbare Themes, alle mit optimalem Kontrast (WCAG), Dunkel/Hell/Neutral. Schriftgrößen anpassbar per Schieberegler.
- **Responsiv:** Keine Überlappungen, kein Abschneiden auf kleinen Bildschirmen; klare Mindestabstände und Fokusmarkierungen.
- **Hilfe & Texte:** Tooltips und Hilfepanels in einfacher Sprache, mit Beispiel-Eingaben und kurzen Erklärungen zu Fachbegriffen.

## Werkzeuge & Generatoren
- **Genre-Zufallsgenerator:** Mengenmodi 4–20; keine Duplikate; Ergebnisse direkt in Genres-Feld, Zwischenablage und Log; Button „in Song übernehmen“.
- **Archiv- und Profilverwaltung:** Scrollbar, sortierbar, inline editierbar; Anzahl der Inhalte gut sichtbar.
- **Logging/Debug:** Umschaltbar; schreibt Aktionen, Warnungen und Fehler mit Zeitstempel; Filter für Leseleichtigkeit.

## Qualitätssicherung & Tests (vollautomatisch)
- **Test-Suite:** Funktionstests, Barrierefreiheits-Checks, Linting (Code-Stil) und Formatkontrolle; Befehle klar dokumentiert.
- **CI/Automatik:** Tests laufen in der Startroutine mit; Abbrüche geben konkrete Hinweise zur Behebung in einfacher Sprache.
- **Standards:** Konsistente Benennung, keine verschluckten Fehlermeldungen, keine überflüssigen Pop-ups.

## Laienfreundliche Tipps (mit fertigen Befehlen)
- **Schnellstart (Beispiel Node):** `npm ci && npm run lint && npm test` – installiert Abhängigkeiten, prüft Stil und startet Tests mit Fortschrittsanzeige.
- **Schnellstart (Beispiel Python):** `python -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt && pytest` – virtuelle Umgebung, Installation, Tests.
- **Themes umschalten:** Dropdown oder Buttons „Hell“, „Dunkel“, „Kontrastreich“; Farb-Vorschau zeigen.
- **Debug einschalten:** Schalter „Debug/Logging“, zeigt letzte Aktionen und Speicherschritte im Seitenpanel.
- **Eingaben prüfen:** Pflichtfelder klar markieren, fehlerhafte Eingaben mit Text erklären (kein Fachjargon ohne Erklärung).

## Roadmap (sofort sichtbare Reihenfolge)
1. Informationsarchitektur für Sidebars/Dreisparten finalisieren und globales Layout-Raster festlegen.
2. Datenmodell für Profile, Archiv, Logs (JSON/TXT) definieren; Pfade nach System/Config/Daten trennen.
3. Farb-Themes mit Kontrasttests, adaptive Schriftgrößen und Fokus-Styles finalisieren.
4. Startroutine inkl. Abhängigkeitsprüfung, Selbstheilung, Logging und Nutzerfeedback erstellen.
5. Genre-Zufallsgenerator und Profilverwaltung mit Duplikatprüfung, Logs und Buttons „in Song übernehmen“ implementieren.
6. Autosave/Backup mit Statusbalken, Zeitstempeln und manuellem Restore-Knopf umsetzen.
7. Test- und Linting-Pipeline (Funktion, Barrierefreiheit, Format) automatisieren und dokumentieren.
