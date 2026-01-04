ClickStart — Linux launcher for 2026-contentmaker

Overview

- This repository includes a small helper to make it easy for non-technical users to install
  dependencies, run automated validations and launch the UI on Linux.

Files added

- start.sh — Executable starter script (double-clickable if your file manager allows it).  
  Command: `chmod +x start.sh && ./start.sh`
- system/start.js — Node.js start routine (runs via `npm run bootstrap`).
- clickstart.desktop — Optional .desktop file; copy it to ~/Desktop or
  ~/.local/share/applications and make it executable to double-click.
- logs/start.log and logs/start-report.md — generated logs and a human-readable report.

How to use

1. Ensure Node.js >= 14 is installed (>=18 recommended).
2. Make start.sh executable: chmod +x start.sh
3. Option A (terminal): ./start.sh
   Option B (GUI): Copy clickstart.desktop to your Desktop or Applications folder and make it executable.

What ClickStart does (high level)

- Verifies Node.js version.
- Checks required folders and creates missing ones (Self-Repair).
- Installs project dependencies (npm ci or npm install).
- Runs automated checks (linting, formatting, unit tests).
- Produces detailed logs at logs/start.log and a report at logs/start-report.md.

Safety notes

- The script installs dependencies automatically. Review logs if something fails.

Support
If something fails, open logs/start.log and logs/start-report.md and paste them in an issue.
