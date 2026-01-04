import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { isValidDataFileEntry, serializeDataFileContent } from "../../config/data-models.js";

function normalizeString(value) {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : "";
}

function resolveProjectRoot(projectRoot) {
  return normalizeString(projectRoot) || process.cwd();
}

export function checkDataFiles(projectRoot, entries) {
  const root = resolveProjectRoot(projectRoot);
  const safeEntries = Array.isArray(entries) ? entries : [];
  return safeEntries.map((entry) => {
    const filePath = normalizeString(entry?.path);
    const fullPath = filePath ? path.join(root, filePath) : "";
    const exists = Boolean(filePath) && existsSync(fullPath);
    return {
      id: normalizeString(entry?.id),
      path: filePath,
      exists,
      valid: isValidDataFileEntry(entry)
    };
  });
}

export function ensureDataFiles(projectRoot, entries) {
  const root = resolveProjectRoot(projectRoot);
  const safeEntries = Array.isArray(entries) ? entries : [];
  return safeEntries.map((entry) => {
    if (!isValidDataFileEntry(entry)) {
      return {
        id: normalizeString(entry?.id),
        path: normalizeString(entry?.path),
        created: false,
        exists: false,
        error: "Ungültige Datenmodell-Definition."
      };
    }

    const filePath = normalizeString(entry.path);
    const fullPath = path.join(root, filePath);
    const exists = existsSync(fullPath);

    if (!exists) {
      try {
        mkdirSync(path.dirname(fullPath), { recursive: true });
        const content = serializeDataFileContent(entry);
        if (!content) {
          return {
            id: entry.id,
            path: filePath,
            created: false,
            exists: false,
            error: "Standardinhalt fehlt."
          };
        }
        writeFileSync(fullPath, content, "utf8");
        return { id: entry.id, path: filePath, created: true, exists: true };
      } catch (error) {
        return {
          id: entry.id,
          path: filePath,
          created: false,
          exists: false,
          error: String(error)
        };
      }
    }

    return { id: entry.id, path: filePath, created: false, exists: true };
  });
}
