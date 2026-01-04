#!/usr/bin/env bash
set -e
# ClickStart launcher (Linux)
# Make executable: chmod +x start.sh

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
cd "$REPO_ROOT"

echo "Starting ClickStart... (logs: ./logs/start.log)"
npm run bootstrap
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
  echo "ClickStart exited with code $EXIT_CODE"
  exit $EXIT_CODE
fi

echo "ClickStart finished. See ./logs/start-report.md for the report."
