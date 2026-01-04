import { appendFileSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

function ensureLogDir(logDir) {
  if (typeof logDir !== "string" || logDir.trim().length === 0) return false;
  mkdirSync(logDir, { recursive: true });
  return true;
}

function writeLine(filePath, line) {
  if (typeof filePath !== "string" || filePath.trim().length === 0) return false;
  appendFileSync(filePath, line);
  return true;
}

export function createStartLogger({ logDir, logFile, reportFile, projectRoot }) {
  const resolvedLogDir = path.resolve(projectRoot, logDir);
  const resolvedLogFile = path.resolve(resolvedLogDir, logFile);
  const resolvedReportFile = path.resolve(resolvedLogDir, reportFile);

  ensureLogDir(resolvedLogDir);
  writeFileSync(resolvedLogFile, `Start-Log ${new Date().toISOString()}\n\n`);
  writeFileSync(resolvedReportFile, `# Startreport\nZeit: ${new Date().toISOString()}\n\n`);

  const log = (message) => {
    const safeMessage =
      typeof message === "string" && message.trim().length > 0
        ? message.trim()
        : "Unbekannte Meldung";
    const line = `[${new Date().toLocaleTimeString("de-DE")}] ${safeMessage}\n`;
    process.stdout.write(line);
    writeLine(resolvedLogFile, line);
    return true;
  };

  const report = (section, content) => {
    const safeSection =
      typeof section === "string" && section.trim().length > 0 ? section.trim() : "Bericht";
    const safeContent =
      typeof content === "string" && content.trim().length > 0 ? content.trim() : "Keine Details.";
    writeLine(resolvedReportFile, `## ${safeSection}\n\n${safeContent}\n\n`);
    return true;
  };

  return {
    log,
    report,
    paths: { logFile: resolvedLogFile, reportFile: resolvedReportFile }
  };
}
