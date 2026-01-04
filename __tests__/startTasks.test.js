import { existsSync, mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { checkDirectories, ensureDirectories } from "../system/start/tasks.js";

function createTempProject() {
  return mkdtempSync(path.join(os.tmpdir(), "contentmaker-start-"));
}

describe("start tasks", () => {
  test("checkDirectories erkennt fehlende ordner", () => {
    const projectRoot = createTempProject();
    const results = checkDirectories(projectRoot, ["config", "data"]);
    expect(results).toEqual([
      { dir: "config", exists: false },
      { dir: "data", exists: false }
    ]);
    rmSync(projectRoot, { recursive: true, force: true });
  });

  test("ensureDirectories legt fehlende ordner an", () => {
    const projectRoot = createTempProject();
    const results = ensureDirectories(projectRoot, ["config", "data"]);
    expect(results).toEqual([
      { dir: "config", created: true, exists: true },
      { dir: "data", created: true, exists: true }
    ]);
    expect(existsSync(path.join(projectRoot, "config"))).toBe(true);
    expect(existsSync(path.join(projectRoot, "data"))).toBe(true);
    rmSync(projectRoot, { recursive: true, force: true });
  });

  test("ensureDirectories blockiert pfade außerhalb des projekts", () => {
    const projectRoot = createTempProject();
    const outsidePath = path.resolve(projectRoot, "..", "contentmaker-outside");
    const results = ensureDirectories(projectRoot, ["../contentmaker-outside"]);
    expect(results).toEqual([
      {
        dir: "../contentmaker-outside",
        created: false,
        exists: false,
        error: "Ordner liegt außerhalb des Projekts."
      }
    ]);
    expect(existsSync(outsidePath)).toBe(false);
    rmSync(projectRoot, { recursive: true, force: true });
  });
});
