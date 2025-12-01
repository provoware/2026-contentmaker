#!/usr/bin/env node
import { existsSync } from "node:fs";
import { execSync } from "node:child_process";
import path from "node:path";

const projectRoot = path.resolve(new URL("..", import.meta.url).pathname);
const steps = [];

function log(step, status) {
  const timestamp = new Date().toLocaleTimeString("de-DE");
  console.log(`[${timestamp}] ${status.padEnd(10)} ${step}`);
}

function ensureNodeVersion() {
  const version = process.versions.node;
  steps.push({ label: `Node erkannt (${version})`, status: "OK" });
}

function ensureDirectories() {
  const required = ["config", "data", "logs", "src", "system"];
  required.forEach((dir) => {
    const present = existsSync(path.join(projectRoot, dir));
    steps.push({
      label: `Ordner ${dir} ${present ? "gefunden" : "fehlt"}`,
      status: present ? "OK" : "FEHLT"
    });
  });
}

function ensureDependencies() {
  const hasNodeModules = existsSync(path.join(projectRoot, "node_modules"));
  if (hasNodeModules) {
    steps.push({ label: "Abhängigkeiten vorhanden", status: "OK" });
    return;
  }

  try {
    execSync("npm install", { cwd: projectRoot, stdio: "inherit" });
    steps.push({ label: "Abhängigkeiten automatisch installiert", status: "OK" });
  } catch (error) {
    steps.push({ label: `Installation fehlgeschlagen: ${error.message}`, status: "FEHLER" });
  }
}

function report() {
  console.log("\nStartroutine – Ergebnis:\n");
  steps.forEach((step) => log(step.label, step.status));
  const hasFailure = steps.some((step) => step.status.startsWith("FEHL"));
  if (hasFailure) {
    process.exitCode = 1;
  }
}

function run() {
  ensureNodeVersion();
  ensureDirectories();
  ensureDependencies();
  report();
}

run();
