import { existsSync, mkdirSync } from "node:fs";
import { spawn } from "node:child_process";
import path from "node:path";

function normalizeString(value, fallback) {
  if (typeof value === "string" && value.trim().length > 0) return value.trim();
  return fallback;
}

function resolveLogger(logger) {
  if (logger && typeof logger.log === "function") return logger;
  return { log: () => false };
}

function runCommand(command, args, cwd, logger) {
  return new Promise((resolve) => {
    const safeCommand = normalizeString(command, "");
    const safeArgs = Array.isArray(args) ? args : [];
    const safeLogger = resolveLogger(logger);
    if (!safeCommand) {
      resolve({ code: 1, stdout: "", stderr: "Ungültiger Befehl" });
      return;
    }

    safeLogger.log(`Starte: ${safeCommand} ${safeArgs.join(" ")}`);
    const processRef = spawn(safeCommand, safeArgs, { cwd, shell: false, stdio: "pipe" });
    let stdout = "";
    let stderr = "";

    processRef.stdout.on("data", (chunk) => {
      const text = chunk.toString();
      stdout += text;
      if (text.trim().length > 0) {
        safeLogger.log(text.trim());
      }
    });
    processRef.stderr.on("data", (chunk) => {
      const text = chunk.toString();
      stderr += text;
      if (text.trim().length > 0) {
        safeLogger.log(text.trim());
      }
    });

    processRef.on("error", (error) => {
      const message = error instanceof Error ? error.message : String(error);
      stderr += message;
      resolve({ code: 1, stdout, stderr: message });
    });

    processRef.on("close", (code) => resolve({ code: code ?? 0, stdout, stderr }));
  });
}

export function checkNodeVersion(minMajor, recommendedMajor) {
  const raw = normalizeString(process.versions.node, "0.0.0");
  const [major] = raw.split(".").map((part) => Number(part));
  const valid = Number.isFinite(major);
  const meetsMin = valid && major >= minMajor;
  const meetsRecommended = valid && major >= recommendedMajor;
  return {
    raw,
    major,
    valid,
    meetsMin,
    meetsRecommended
  };
}

export function checkDirectories(projectRoot, requiredDirs) {
  const safeDirs = Array.isArray(requiredDirs) ? requiredDirs : [];
  return safeDirs.map((dir) => {
    const dirName = normalizeString(dir, "");
    const exists = dirName ? existsSync(path.join(projectRoot, dirName)) : false;
    return { dir: dirName, exists };
  });
}

export function ensureDirectories(projectRoot, requiredDirs) {
  const safeDirs = Array.isArray(requiredDirs) ? requiredDirs : [];
  return safeDirs.map((dir) => {
    const dirName = normalizeString(dir, "");
    if (!dirName) return { dir: "", created: false, exists: false };
    const fullPath = path.join(projectRoot, dirName);
    const exists = existsSync(fullPath);
    if (!exists) {
      try {
        mkdirSync(fullPath, { recursive: true });
        return { dir: dirName, created: true, exists: true };
      } catch (error) {
        return { dir: dirName, created: false, exists: false, error: String(error) };
      }
    }
    return { dir: dirName, created: false, exists: true };
  });
}

export async function installDependencies(projectRoot, installCommand, logger) {
  const lockPath = path.join(projectRoot, "package-lock.json");
  const yarnPath = path.join(projectRoot, "yarn.lock");
  const hasLock = existsSync(lockPath) || existsSync(yarnPath);
  const command = hasLock ? installCommand.withLock : installCommand.withoutLock;

  if (!command || !Array.isArray(command) || command.length !== 2) {
    return { code: 1, stdout: "", stderr: "Installationsbefehl fehlt." };
  }

  const [cmd, args] = command;
  return runCommand(cmd, args, projectRoot, logger);
}

export async function runTests(projectRoot, logger) {
  return runCommand("npm", ["run", "test"], projectRoot, logger);
}

export function hasNodeModules(projectRoot) {
  return existsSync(path.join(projectRoot, "node_modules"));
}
