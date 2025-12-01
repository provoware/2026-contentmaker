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
   neu zum anpassen und in todoübertragen:
   Analysiere das Layout und die Anornung und verbesser sie. Maximale Flexibilität der Bereichsgrößen und auch verschiebbarkeit der einzelbereiche. Die sollen zum platz sparen auch einrollbar sein, so das nur überschrift zu sehen bleibt. insesamt vier farbthemes und verbessere die farben und kontraste. Implementiere auch backup, Import/Export und andere hilfreiche nützliche Aspekte. Und mache einzelbereiche und schrift separat von einander mit STRG und Mausrad vergrößer und verkleinerbar. In allen eingabe bereichen einen button zum maximieren und einen button zum minimieren und einen button zum deaktivieren implementieren. Analysiere und verbessere auch die barrierefreiheit und Nutzerfreundlichkeit.
   Mache den Haupterbeitsbereich doch lieber in vier gleich große Bereiche, also stelle den zufallsgenerator und das Archiv einzeln seperat. verwende für elemente auch intuitive farben, wie zum beispiel rot für deaktivieren. die buttons für min max und deaktivieren in jedem bereich im hauptarbeitsbereich anzeigen. sidebars auch wieder aufklappbar mit button machen. verändere die farben der vier hauptbereich so das sie sich ein wenig von einander unterscheiden.
   wende alles vollständig auf den code an und optimiere suboptmiale aspekte. Außerdem kann ich im hauptbereich die unteren bereiche nicht sehen. Es soll aber alles in einem 2x2 GRID Flexibel und ohne scrollen zu müssen sichtbar sein. optimiere das. Außerdem sollen alle bereiche auch einzeln verschoben werden können.

Diese Zusammenfassung ordnet die im Projekt geplanten Funktionen und Prioritäten. Sie ist bewusst in leicht verständlicher Sprache gehalten. Fachbegriffe stehen in Klammern und werden erklärt.

## Übersicht

- Ziel ist ein webbasiertes Tool, das das Schreiben und Organisieren von Songtexten vereinfacht.
- Das Dashboard soll robust, erweiterbar (Plugin-fähig) und laienfreundlich sein.
- Alle Bedienelemente müssen barrierefrei (zugänglich für alle Nutzer) gestaltet werden.

## Kernfunktionen

- **Layout mit drei Hauptbereichen:**
  1. Linke Sidebar für Songbereiche und Templates (Vorlagen). Bereiche wie Intro, Strophe, Bridge usw. sollen frei definierbar sein.
  2. Rechte Sidebar für gespeicherte Songs im Projektordner, inklusive Bearbeitung und Organisation.
  3. Dreispaltiger Arbeitsbereich in der Mitte:
     - Spalte 1: Song erarbeiten, Bereiche einfügen, Texte schreiben, Titel vergeben.
     - Spalte 2: Zusatzinfos (Genres, Tags, Hashtags, Coverideen, Versionen, Sonstiges). Oben/unten geteilt mit Eingabeprofilen (z. B. Techno, Hörspiel). Profile speichern, importieren/exportieren. Kommaseparierte Eingaben einzeln speichern, Duplikate ignorieren.
     - Spalte 3: Gesamttext-Vorschau und Steuerung zum Speichern im Archiv.
- **Genre-Zufallsgenerator:**
  - Mehrere Mengenmodi (4–20) für Genres, Stimmungen, Effekte.
  - Ergebnis ohne Duplikate, direkt in Genres-Feld und Zwischenablage schreiben.
  - Protokollierung der erzeugten Listen (Log).
- **Archiv- und Profilverwaltung:**
  - Sortierbare, scrollbare, editierbare Listen.
  - Anzahl der Inhalte anzeigen.
  - Ergebnisse in JSON und TXT speichern.
- **Autosave und Backups:** Alle 5 Minuten und bei Logout speichern. Dateiname entspricht Songtitel.
- **Echtzeit-Feedback:** Dashboard zeigt Status, Ereignisse und Statistiken sowie Datum/Uhrzeit live an.
- **Einstellungen:** Separater Tab mit umfangreichen, individuell konfigurierbaren Optionen.
- **Fehlerhandling:** Automatisches, transparentes Self-Repair (Selbstheilung) und robustes Logging/Debugging.

## Barrierefreiheit und UI-Design

- Mehrere Farb-Themes mit hohen Kontrasten und anpassbarer Schriftgröße.
- Responsive Gestaltung: passt sich kleinen und großen Bildschirmen an, keine Überlappungen oder abgeschnittenen Elemente.
- Klare Hilfe- und Tooltips in einfacher Sprache, konsistente Standards und globale Layout-Regeln.

## Daten- und Strukturvorgaben

- Saubere Trennung von Systemlogik, Konfigurationsdateien und veränderlichen Nutzerdaten.
- Import/Export von Profilen und Songs als JSON oder TXT.
- Selbstständige Auflösung von Abhängigkeiten (z. B. Bibliotheken) durch eine Startroutine mit Nutzerfeedback.

## Tests, Qualität und Sicherheit

- Vollautomatische, sinnvolle Tests für Funktionalität, Code-Qualität und Format (Linting).
- Jede Funktion soll Eingaben prüfen und den Erfolg der Ausgaben bestätigen.
- Aktivierbarer Debug- und Logging-Modus, um Abläufe nachzuvollziehen.

## Laienfreundliche Vorschläge

- **Schnellstart:** Startroutine bereitstellen, die alle Abhängigkeiten installiert und einen kurzen Fortschritts-Dialog anzeigt (z. B. mit `npm install` oder `python -m venv .venv && pip install -r requirements.txt`, je nach Technologie-Stack).
- **Bedienhilfen:** Tooltips und Hilfetexte mit konkreten Beispielen (z. B. „Gib Genres durch Komma getrennt ein: Rock, Pop, Funk“).
- **Themenwahl:** Buttons oder Dropdowns für Farb-Themes und Schieberegler für Schriftgröße.
- **Sicheres Speichern:** Klar sichtbarer Status für Autosave und Backup, inklusive Zeitstempel.
- **Tests ausführen:** Einfache Befehle dokumentieren (z. B. `npm test` oder `pytest`), damit Nutzer Qualität schnell prüfen können.

## Nächste Schritte (kurz)

- Informationsarchitektur für Sidebars und Spalten präzisieren.
- Datenmodell für Profile, Archiv und Logs als JSON/TXT definieren.
- Designsystem mit Farb-Themes und Skalierungsregeln festlegen.
- Automatisierte Tests und Linting-Setup auswählen und integrieren.
