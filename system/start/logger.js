import { appendFileSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

function ensureLogDir(logDir) {
  if (typeof logDir !== "string" || logDir.trim().length === 0) return false;
  try {
    mkdirSync(logDir, { recursive: true });
    return true;
  } catch {
    return false;
  }
}

function writeLine(filePath, line) {
  if (typeof filePath !== "string" || filePath.trim().length === 0) return false;
  try {
    appendFileSync(filePath, line);
    return true;
  } catch {
    return false;
  }
}

function isPathWithin(root, target) {
  const relative = path.relative(root, target);
  if (relative === "") return true;
  return !relative.startsWith("..") && !path.isAbsolute(relative);
}

function resolveLogDir(projectRoot, logDir) {
  const resolvedRoot = path.resolve(projectRoot);
  const safeDir = typeof logDir === "string" && logDir.trim().length > 0 ? logDir : "logs";
  const resolvedDir = path.resolve(resolvedRoot, safeDir);
  if (!isPathWithin(resolvedRoot, resolvedDir)) {
    return path.join(resolvedRoot, "logs");
  }
  return resolvedDir;
}

function resolveLogFileName(fileName, fallback) {
  if (typeof fileName !== "string" || fileName.trim().length === 0) return fallback;
  return path.basename(fileName.trim());
}

export function createStartLogger({ logDir, logFile, reportFile, projectRoot }) {
  const resolvedRoot = path.resolve(projectRoot);
  const resolvedLogDir = resolveLogDir(resolvedRoot, logDir);
  const resolvedLogFile = path.join(resolvedLogDir, resolveLogFileName(logFile, "start.log"));
  const resolvedReportFile = path.join(
    resolvedLogDir,
    resolveLogFileName(reportFile, "start-report.md")
  );

  const ready = ensureLogDir(resolvedLogDir);
  if (ready) {
    try {
      writeFileSync(resolvedLogFile, `Start-Log ${new Date().toISOString()}\n\n`);
      writeFileSync(resolvedReportFile, `# Startreport\nZeit: ${new Date().toISOString()}\n\n`);
    } catch {
      // no-op, logging falls back to stdout
    }
  }

  const log = (message) => {
    const safeMessage =
      typeof message === "string" && message.trim().length > 0
        ? message.trim()
        : "Unbekannte Meldung";
    const line = `[${new Date().toLocaleTimeString("de-DE")}] ${safeMessage}\n`;
    process.stdout.write(line);
    if (ready) {
      writeLine(resolvedLogFile, line);
    }
    return true;
  };

  const report = (section, content) => {
    const safeSection =
      typeof section === "string" && section.trim().length > 0 ? section.trim() : "Bericht";
    const safeContent =
      typeof content === "string" && content.trim().length > 0 ? content.trim() : "Keine Details.";
    if (ready) {
      writeLine(resolvedReportFile, `## ${safeSection}\n\n${safeContent}\n\n`);
    }
    return true;
  };

  return {
    log,
    report,
    paths: { logFile: resolvedLogFile, reportFile: resolvedReportFile }
  };
}
