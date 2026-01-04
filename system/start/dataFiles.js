import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { isValidDataFileEntry, serializeDataFileContent } from "../../config/data-models.js";

function normalizeString(value) {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : "";
}

function resolveProjectRoot(projectRoot) {
  return normalizeString(projectRoot) || process.cwd();
}

function isPathWithin(root, target) {
  const relative = path.relative(root, target);
  if (relative === "") return true;
  return !relative.startsWith("..") && !path.isAbsolute(relative);
}

export function checkDataFiles(projectRoot, entries) {
  const root = path.resolve(resolveProjectRoot(projectRoot));
  const safeEntries = Array.isArray(entries) ? entries : [];
  return safeEntries.map((entry) => {
    const filePath = normalizeString(entry?.path);
    const fullPath = filePath ? path.resolve(root, filePath) : "";
    const safePath = Boolean(filePath) && isPathWithin(root, fullPath);
    const exists = safePath && existsSync(fullPath);
    return {
      id: normalizeString(entry?.id),
      path: filePath,
      exists,
      valid: isValidDataFileEntry(entry) && safePath
    };
  });
}

export function ensureDataFiles(projectRoot, entries) {
  const root = path.resolve(resolveProjectRoot(projectRoot));
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
    const fullPath = path.resolve(root, filePath);
    if (!isPathWithin(root, fullPath)) {
      return {
        id: entry.id,
        path: filePath,
        created: false,
        exists: false,
        error: "Datendatei liegt außerhalb des Projekts."
      };
    }
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
