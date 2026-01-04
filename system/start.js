#!/usr/bin/env node
import path from "node:path";
import { runStart } from "./start/index.js";

const projectRoot = path.resolve(new URL("..", import.meta.url).pathname);

runStart({ projectRoot }).catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Startroutine ist unerwartet abgebrochen: ${message}`);
  process.exit(1);
});
