const DEFAULT_VERSION = 1;

const dataFileEntries = [
  {
    id: "profiles",
    path: "data/profiles.json",
    format: "json",
    description: "Profile für Genres, Stimmung und Stil.",
    template: {
      version: DEFAULT_VERSION,
      updatedAt: null,
      profiles: []
    }
  },
  {
    id: "archive",
    path: "data/archive.json",
    format: "json",
    description: "Archivierte Begriffe, Tags und Hashtags.",
    template: {
      version: DEFAULT_VERSION,
      updatedAt: null,
      entries: []
    }
  },
  {
    id: "activity-log",
    path: "data/activity-log.txt",
    format: "text",
    description: "Einfache Aktivitäts- und Fehlernotizen.",
    template: "# Contentmaker Aktivitätslog\n# Jede Zeile ist eine Notiz mit Datum, Typ und Text.\n"
  }
];

function normalizeString(value) {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : "";
}

export function isValidDataFileEntry(entry) {
  if (!entry || typeof entry !== "object") return false;
  const id = normalizeString(entry.id);
  const filePath = normalizeString(entry.path);
  const format = normalizeString(entry.format);
  const description = normalizeString(entry.description);
  const hasTemplate = entry.template !== undefined && entry.template !== null;
  const isJson = format === "json" && typeof entry.template === "object";
  const isText = format === "text" && typeof entry.template === "string";
  return Boolean(id && filePath && description && hasTemplate && (isJson || isText));
}

export function getDataFileEntries() {
  return dataFileEntries.map((entry) => ({ ...entry }));
}

export function serializeDataFileContent(entry) {
  if (!isValidDataFileEntry(entry)) return "";
  if (entry.format === "json") {
    return `${JSON.stringify(entry.template, null, 2)}\n`;
  }
  if (entry.format === "text") {
    return entry.template.endsWith("\n") ? entry.template : `${entry.template}\n`;
  }
  return "";
}

export function getDataFileEntryById(id) {
  const safeId = normalizeString(id);
  if (!safeId) return null;
  return dataFileEntries.find((entry) => entry.id === safeId) ?? null;
}
