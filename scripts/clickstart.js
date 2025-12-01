const fs = require('fs');
const { spawn } = require('child_process');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const LOG_DIR = path.join(REPO_ROOT, 'scripts');
const LOG_FILE = path.join(LOG_DIR, 'clickstart.log');
const REPORT_FILE = path.join(LOG_DIR, 'clickstart-report.md');

function log(...args) {
  const line = `[${new Date().toISOString()}] ${args.join(' ')}\n`;
  process.stdout.write(line);
  fs.appendFileSync(LOG_FILE, line);
}

function run(cmd, args, opts = {}) {
  return new Promise((resolve) => {
    log(`RUN: ${cmd} ${args.join(' ')}`);
    const p = spawn(cmd, args, Object.assign({ cwd: REPO_ROOT, shell: false }, opts));
    let out = '';
    let err = '';
    p.stdout.on('data', (d) => { const s = d.toString(); process.stdout.write(s); fs.appendFileSync(LOG_FILE, s); out += s; });
    p.stderr.on('data', (d) => { const s = d.toString(); process.stderr.write(s); fs.appendFileSync(LOG_FILE, s); err += s; });
    p.on('close', (code) => resolve({ code: code === null ? 0 : code, out, err }));
  });
}

async function ensureLogDir() {
  try { await fs.promises.mkdir(LOG_DIR, { recursive: true }); } catch (e) { /* ignore */ }
  try { await fs.promises.writeFile(LOG_FILE, `ClickStart log - ${new Date().toISOString()}\n\n`); } catch (e) { /* ignore */ }
}

async function writeReport(section, content) {
  const header = `## ${section}\n\n`;
  await fs.promises.appendFile(REPORT_FILE, header + content + '\n\n');
}

async function main() {
  await ensureLogDir();
  try { await fs.promises.writeFile(REPORT_FILE, `# ClickStart Report\nGenerated: ${new Date().toISOString()}\n\n`); } catch (e) { /* ignore */ }

  log('Starting ClickStart (Linux only)');

  // OS check
  if (process.platform !== 'linux') {
    log('ERROR: This ClickStart script is designed for Linux. Exiting.');
    await writeReport('Platform check', 'Detected non-Linux platform. Aborting.');
    process.exit(1);
  }

  // Node version check (require >=14 but prefer >=18)
  const nodeVersion = process.versions.node;
  log(`Node version: ${nodeVersion}`);
  const [maj] = nodeVersion.split('.').map((v) => Number(v));
  if (isNaN(maj) || maj < 14) {
    const msg = `ERROR: Node.js >=14 is required. Detected ${nodeVersion}`;
    log(msg);
    await writeReport('Node check', msg);
    process.exit(1);
  }

  // Check for package.json
  const pkgPath = path.join(REPO_ROOT, 'package.json');
  let pkg = null;
  if (fs.existsSync(pkgPath)) {
    try { pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8')); } catch (e) { log('WARN: package.json exists but could not be parsed'); }
  } else {
    log('WARN: No package.json found. Some automated steps will be skipped.');
    await writeReport('Package.json', 'Not found.');
  }

  // Install dependencies if package.json exists
  if (pkg) {
    const hasLock = fs.existsSync(path.join(REPO_ROOT, 'package-lock.json')) || fs.existsSync(path.join(REPO_ROOT, 'yarn.lock'));
    const installCmd = fs.existsSync(path.join(REPO_ROOT, 'package-lock.json')) ? ['npm', ['ci']] : ['npm', ['install']];

    log('Installing dependencies...');
    await writeReport('Install', 'Starting dependency installation.');
    try {
      const res = await run(installCmd[0], installCmd[1]);
      await writeReport('Install output', `Exit code: ${res.code}\n\n${res.out}\n\n${res.err}`);
      if (res.code !== 0) log('WARN: Dependency install exited with non-zero code');
    } catch (e) {
      log('ERROR during install: ' + e.message);
      await writeReport('Install error', String(e.message));
    }

    // Run npm audit fix --force automatically
    log('Running npm audit fix --force (may change package-lock/package versions)');
    await writeReport('Audit fix', 'Running npm audit fix --force');
    try {
      const auditRes = await run('npm', ['audit', 'fix', '--force']);
      await writeReport('Audit output', `Exit code: ${auditRes.code}\n\n${auditRes.out}\n\n${auditRes.err}`);
    } catch (e) {
      log('WARN: npm audit fix failed: ' + e.message);
      await writeReport('Audit error', String(e.message));
    }

    // Ensure linters are installed (eslint, stylelint, htmlhint) if missing
    const devDeps = pkg.devDependencies || {};
    const toInstall = [];
    if (!devDeps.eslint) toInstall.push('eslint');
    if (!devDeps.stylelint) toInstall.push('stylelint');
    if (!devDeps.htmlhint) toInstall.push('htmlhint');
    if (toInstall.length) {
      log('Installing recommended devDependencies: ' + toInstall.join(', '));
      await writeReport('DevDeps install', toInstall.join(', '));
      try {
        const res2 = await run('npm', ['install', '--save-dev', '--no-audit', ...toInstall]);
        await writeReport('DevDeps output', `Exit code: ${res2.code}\n\n${res2.out}\n\n${res2.err}`);
      } catch (e) { log('WARN devDeps install failed: ' + e.message); await writeReport('DevDeps error', String(e.message)); }
    } else {
      log('Recommended devDependencies already present.');
      await writeReport('DevDeps', 'Already present.');
    }

    // Run linters with --fix where available
    const lints = [];
    if (fs.existsSync(path.join(REPO_ROOT, '.eslintrc')) || devDeps.eslint || pkg.scripts && pkg.scripts.lint) lints.push({ cmd: 'npx', args: ['eslint', '.', '--ext', '.js,.mjs,.cjs,.ts', '--fix'] });
    if (fs.existsSync(path.join(REPO_ROOT, '.stylelintrc')) || devDeps.stylelint) lints.push({ cmd: 'npx', args: ['stylelint', '**/*.{css,scss}', '--fix'] });
    if (fs.existsSync(path.join(REPO_ROOT, '.htmlhintrc')) || devDeps.htmlhint) lints.push({ cmd: 'npx', args: ['htmlhint', '.'] });

    for (const lint of lints) {
      log(`Running ${lint.cmd} ${lint.args.join(' ')}`);
      try {
        const r = await run(lint.cmd, lint.args);
        await writeReport('Lint ' + lint.args[0], `Exit code: ${r.code}\n\n${r.out}\n\n${r.err}`);
      } catch (e) { log('Lint error: ' + e.message); await writeReport('Lint error', String(e.message)); }
    }

    // Detect start commands
    const scripts = pkg.scripts || {};
    const preferred = ['dev', 'start', 'serve', 'preview', 'build'];
    let started = false;
    for (const name of preferred) {
      if (scripts[name]) {
        log(`Found script: ${name} -> $\{scripts[name]} . Running npm run ${name}`);
        await writeReport('Start script', `Running npm run ${name} (was: ${scripts[name]})`);
        const res3 = await run('npm', ['run', name]);
        await writeReport(`Run ${name} output`, `Exit code: ${res3.code}\n\n${res3.out}\n\n${res3.err}`);
        started = true;
        break;
      }
    }

    if (!started) {
      // Try to open index.html if exists in repo
      const candidates = ['index.html', 'public/index.html', 'dist/index.html', 'build/index.html'];
      let opened = false;
      for (const c of candidates) {
        const p = path.join(REPO_ROOT, c);
        if (fs.existsSync(p)) {
          log('Opening static file: ' + p);
          await writeReport('Open static', `Opening ${c}`);
          await run('xdg-open', [p]);
          opened = true;
          break;
        }
      }
      if (!opened) {
        log('No start script or static index.html found. Listing available npm scripts:');
        await writeReport('No start', 'No start script or index.html found.');
        await writeReport('Available scripts', JSON.stringify(scripts, null, 2));
        log(JSON.stringify(scripts, null, 2));
      }
    }

  } else {
    log('No package.json -> attempting to open index.html if present');
    const candidates = ['index.html', 'public/index.html'];
    for (const c of candidates) {
      const p = path.join(REPO_ROOT, c);
      if (fs.existsSync(p)) {
        log('Opening static file: ' + p);
        await writeReport('Open static (no pkg)', `Opening ${c}`);
        await run('xdg-open', [p]);
        break;
      }
    }
  }

  log('ClickStart finished. See ' + LOG_FILE + ' and ' + REPORT_FILE);
  await writeReport('Summary', 'ClickStart finished successfully (see detailed sections above).');
}

main().catch(async (err) => {
  log('Unhandled error: ' + String(err));
  try { await writeReport('Unhandled error', String(err)); } catch (e) {}
  process.exit(1);
});
