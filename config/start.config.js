export const startConfig = {
  requiredDirs: ["config", "data", "logs", "src", "system"],
  logDir: "logs",
  logFile: "start.log",
  reportFile: "start-report.md",
  minNodeMajor: 14,
  recommendedNodeMajor: 18,
  runTests: true,
  installCommand: {
    withLock: ["npm", ["ci"]],
    withoutLock: ["npm", ["install"]]
  }
};
