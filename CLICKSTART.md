ClickStart — Linux launcher for 2026-contentmaker

Overview
- This repository includes a small helper to make it easy for non-technical users to install dependencies, run automated validations/fixes and launch the UI on Linux.

Files added
- start.sh — Executable starter script (double-clickable if your file manager allows it). Run with: chmod +x start.sh && ./start.sh
- scripts/clickstart.js — Node.js automation script (already present)
- clickstart.desktop — Optional .desktop file; copy it to ~/Desktop or ~/.local/share/applications and make it executable to double-click.
- scripts/clickstart.log and scripts/clickstart-report.md — generated logs and a human-readable report.

How to use
1) Ensure Node.js >= 14 is installed (>=18 recommended).
2) Make start.sh executable: chmod +x start.sh
3) Option A (terminal): ./start.sh
   Option B (GUI): Copy clickstart.desktop to your Desktop or Applications folder and make it executable.

What ClickStart does (high level)
- Verifies OS is Linux and Node.js version.
- Installs project dependencies (npm ci or npm install).
- Runs npm audit fix --force automatically.
- Installs recommended devDependencies (eslint, stylelint, htmlhint) if missing.
- Runs linters/formatters where configured (with --fix when supported).
- Detects a start/build script (prefers npm run dev, then start, serve, preview, build) and runs it.
- If no start script found, attempts to open a static index.html (public/index.html, dist/index.html, build/index.html).
- Produces detailed logs at scripts/clickstart.log and a report at scripts/clickstart-report.md.

Safety notes
- npm audit fix --force may update dependencies and package-lock.json. This tool runs it automatically per your instruction; review the generated report if you are concerned.
- The script will install devDependencies if they are not present.

Support
If something fails, open scripts/clickstart.log and scripts/clickstart-report.md and paste them in an issue.