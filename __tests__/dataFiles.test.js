import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { getDataFileEntries } from "../config/data-models.js";
import { ensureDataFiles } from "../system/start/dataFiles.js";

describe("data files", () => {
  test("erstellt fehlende Dateien", () => {
    const projectRoot = mkdtempSync(path.join(os.tmpdir(), "contentmaker-data-"));
    const entries = getDataFileEntries();
    const results = ensureDataFiles(projectRoot, entries);

    results.forEach((result) => {
      expect(result.exists).toBe(true);
      const filePath = path.join(projectRoot, result.path);
      const content = readFileSync(filePath, "utf8");
      expect(content.length).toBeGreaterThan(0);
    });

    const profilesPath = path.join(projectRoot, "data/profiles.json");
    const profilesContent = JSON.parse(readFileSync(profilesPath, "utf8"));
    expect(Array.isArray(profilesContent.profiles)).toBe(true);

    rmSync(projectRoot, { recursive: true, force: true });
  });

  test("verhindert datendateien außerhalb des projekts", () => {
    const projectRoot = mkdtempSync(path.join(os.tmpdir(), "contentmaker-data-"));
    const outsidePath = path.resolve(projectRoot, "..", "contentmaker-outside.json");
    const entries = [
      {
        id: "unsafe",
        path: "../contentmaker-outside.json",
        format: "json",
        description: "Soll außerhalb liegen.",
        template: { ok: true }
      }
    ];
    const results = ensureDataFiles(projectRoot, entries);
    expect(results).toEqual([
      {
        id: "unsafe",
        path: "../contentmaker-outside.json",
        created: false,
        exists: false,
        error: "Datendatei liegt außerhalb des Projekts."
      }
    ]);
    expect(() => readFileSync(outsidePath, "utf8")).toThrow();
    rmSync(projectRoot, { recursive: true, force: true });
  });
});
