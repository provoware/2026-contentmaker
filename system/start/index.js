import { existsSync } from "node:fs";
import path from "node:path";
import { startConfig } from "../../config/start.config.js";
import { getDataFileEntries } from "../../config/data-models.js";
import { createStartLogger } from "./logger.js";
import {
  checkDirectories,
  checkNodeVersion,
  ensureDirectories,
  hasNodeModules,
  installDependencies,
  runTests
} from "./tasks.js";
import { checkDataFiles, ensureDataFiles } from "./dataFiles.js";

export async function runStart({ projectRoot = process.cwd() } = {}) {
  const logger = createStartLogger({
    logDir: startConfig.logDir,
    logFile: startConfig.logFile,
    reportFile: startConfig.reportFile,
    projectRoot
  });

  logger.log("Startroutine startet. Bitte kurz warten.");

  const nodeInfo = checkNodeVersion(startConfig.minNodeMajor, startConfig.recommendedNodeMajor);
  if (!nodeInfo.valid) {
    logger.log("Node-Version konnte nicht gelesen werden.");
    logger.report("Node", "Fehler: Node-Version nicht ermittelt.");
  } else if (!nodeInfo.meetsMin) {
    logger.log(`Node ${nodeInfo.raw} ist zu alt. Bitte auf Version >=${startConfig.minNodeMajor}.`);
    logger.report(
      "Node",
      `Gefunden ${nodeInfo.raw}. Benötigt wird mindestens ${startConfig.minNodeMajor}.`
    );
    process.exitCode = 1;
  } else {
    logger.log(
      `Node ${nodeInfo.raw} erkannt.${nodeInfo.meetsRecommended ? "" : " Empfehlung: >=18."}`
    );
    logger.report("Node", `OK: ${nodeInfo.raw}`);
  }

  const dirChecks = checkDirectories(projectRoot, startConfig.requiredDirs);
  dirChecks.forEach((check) => {
    logger.log(
      check.exists ? `Ordner ok: ${check.dir}` : `Ordner fehlt: ${check.dir || "unbekannt"}`
    );
  });
  logger.report(
    "Ordner",
    dirChecks
      .map((check) => `${check.exists ? "OK" : "FEHLT"}: ${check.dir || "unbekannt"}`)
      .join("\n")
  );

  const dirResults = ensureDirectories(projectRoot, startConfig.requiredDirs);
  dirResults.forEach((result) => {
    if (!result.dir) return;
    if (result.created) {
      logger.log(`Ordner erstellt: ${result.dir}`);
    } else if (!result.exists) {
      logger.log(`Ordner konnte nicht erstellt werden: ${result.dir}`);
    }
  });
  logger.report(
    "Ordner-Erstellung",
    dirResults
      .map((result) => {
        if (!result.dir) return "FEHLER: Ungültiger Ordnername";
        if (result.created) return `ERSTELLT: ${result.dir}`;
        return result.exists ? `OK: ${result.dir}` : `FEHLER: ${result.dir}`;
      })
      .join("\n")
  );

  const dataEntries = getDataFileEntries();
  const dataChecks = checkDataFiles(projectRoot, dataEntries);
  dataChecks.forEach((check) => {
    if (!check.path) {
      logger.log("Datenmodell-Eintrag ist ungültig.");
      return;
    }
    logger.log(check.exists ? `Datendatei ok: ${check.path}` : `Datendatei fehlt: ${check.path}`);
  });
  logger.report(
    "Datenmodelle",
    dataChecks
      .map((check) => {
        if (!check.path) return "FEHLER: Ungültiger Eintrag";
        const status = check.exists ? "OK" : "FEHLT";
        const valid = check.valid ? "gültig" : "ungültig";
        return `${status}: ${check.path} (${valid})`;
      })
      .join("\n")
  );

  const dataResults = ensureDataFiles(projectRoot, dataEntries);
  dataResults.forEach((result) => {
    if (!result.path) return;
    if (result.created) {
      logger.log(`Datendatei erstellt: ${result.path}`);
    } else if (!result.exists) {
      logger.log(`Datendatei konnte nicht erstellt werden: ${result.path}`);
    }
  });
  logger.report(
    "Datenmodelle-Erstellung",
    dataResults
      .map((result) => {
        if (!result.path) return "FEHLER: Ungültiger Eintrag";
        if (result.created) return `ERSTELLT: ${result.path}`;
        return result.exists ? `OK: ${result.path}` : `FEHLER: ${result.path}`;
      })
      .join("\n")
  );

  const pkgPath = path.join(projectRoot, "package.json");
  if (!existsSync(pkgPath)) {
    logger.log("package.json fehlt. Installation und Tests werden übersprungen.");
    logger.report("Abhängigkeiten", "Übersprungen: package.json fehlt.");
    return { ok: false, logger };
  }

  if (!hasNodeModules(projectRoot)) {
    logger.log("Abhängigkeiten fehlen. Installation wird gestartet.");
    const installResult = await installDependencies(
      projectRoot,
      startConfig.installCommand,
      logger
    );
    logger.report(
      "Abhängigkeiten",
      `Exit-Code: ${installResult.code}\n${installResult.stdout}\n${installResult.stderr}`
    );
    if (installResult.code !== 0) {
      logger.log("Installation fehlgeschlagen. Bitte npm install manuell ausführen.");
      process.exitCode = 1;
    }
  } else {
    logger.log("Abhängigkeiten vorhanden.");
    logger.report("Abhängigkeiten", "OK: node_modules vorhanden.");
  }

  if (startConfig.runTests) {
    logger.log("Starte automatische Tests (Lint, Format, Unit).");
    const testResult = await runTests(projectRoot, logger);
    logger.report(
      "Tests",
      `Exit-Code: ${testResult.code}\n${testResult.stdout}\n${testResult.stderr}`
    );
    if (testResult.code !== 0) {
      logger.log("Tests fehlgeschlagen. Bitte Ausgabe prüfen.");
      process.exitCode = 1;
    } else {
      logger.log("Tests erfolgreich abgeschlossen.");
    }
  }

  logger.log(`Startroutine abgeschlossen. Details: ${logger.paths.reportFile}`);
  return { ok: process.exitCode !== 1, logger };
}
