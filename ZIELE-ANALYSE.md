# Analyse der Ziele für das Songtext-Dashboard

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
