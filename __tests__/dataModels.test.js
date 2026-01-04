import {
  getDataFileEntries,
  getDataFileEntryById,
  isValidDataFileEntry,
  serializeDataFileContent
} from "../config/data-models.js";

describe("data models", () => {
  test("liefert gültige Einträge", () => {
    const entries = getDataFileEntries();
    expect(entries.length).toBeGreaterThan(0);
    entries.forEach((entry) => {
      expect(isValidDataFileEntry(entry)).toBe(true);
      expect(typeof serializeDataFileContent(entry)).toBe("string");
    });
  });

  test("findet Eintrag per ID", () => {
    const entry = getDataFileEntryById("profiles");
    expect(entry).not.toBeNull();
    expect(entry.id).toBe("profiles");
  });
});
