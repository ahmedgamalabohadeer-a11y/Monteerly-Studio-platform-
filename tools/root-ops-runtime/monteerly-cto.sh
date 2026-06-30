#!/bin/bash
# ============================================================
#  Monteerly CTO Engine v4.0 — ALL-IN-ONE
#  ملف واحد يفعل كل شيء: إنشاء + تثبيت + تشغيل أول فحص
#  الاستخدام: cd ~/monteerlyStudioPlatform && bash monteerly-cto.sh
# ============================================================

set -e

# ─── ألوان ────────────────────────────────────────────────
GREEN='\033[0;32m'; YELLOW='\033[1;33m'; RED='\033[0;31m'
CYAN='\033[0;96m';  BOLD='\033[1m';      NC='\033[0m'
MAGENTA='\033[0;35m'

log_ok()   { echo -e "${GREEN}✅  $1${NC}"; }
log_warn() { echo -e "${YELLOW}⚠️   $1${NC}"; }
log_err()  { echo -e "${RED}❌  $1${NC}"; }
log_info() { echo -e "${CYAN}ℹ️   $1${NC}"; }
sep()      { echo -e "\n${BOLD}${CYAN}──────────────────────────────────────────────────${NC}"; 
             [ -n "$1" ] && echo -e "${BOLD}  $1${NC}";
             echo -e "${BOLD}${CYAN}──────────────────────────────────────────────────${NC}\n"; }

echo -e "\n${BOLD}${MAGENTA}  🧠 Monteerly CTO Engine v4.0 — ALL-IN-ONE INSTALLER${NC}\n"

# ─── 1. التحقق من المجلد ──────────────────────────────────
sep "1️⃣  التحقق من بيئة المشروع"

if [ ! -f "package.json" ]; then
  log_err "package.json غير موجود — تأكد أنك في مجلد مشروع Monteerly"
  log_info "نفّذ: cd ~/monteerlyStudioPlatform ثم أعد تشغيل السكربت"
  exit 1
fi
log_ok "مجلد المشروع: $(pwd)"

NODE_VER=$(node -v 2>/dev/null || echo "")
if [ -z "$NODE_VER" ]; then
  log_err "Node.js غير مثبت — نفّذ: pkg install nodejs"
  exit 1
fi
log_ok "Node.js: $NODE_VER"

# ─── 2. إنشاء مجلد scripts ───────────────────────────────
sep "2️⃣  إعداد مجلد scripts"
mkdir -p scripts
log_ok "مجلد scripts/ جاهز"

# ─── 3. كتابة cto.mjs الكامل ─────────────────────────────
sep "3️⃣  كتابة محرك CTO (cto.mjs)"

cat > scripts/cto.mjs << 'NODEJS_EOF'
#!/usr/bin/env node
// ============================================================
// Monteerly CTO Engine v4.0 — Core Engine
// Node.js 18+ | Next.js 15 | Supabase | Tailwind v4 | Termux
// ============================================================

import fs from 'fs/promises';
import { existsSync, statSync } from 'fs';
import path from 'path';
import { execSync, exec } from 'child_process';
import { promisify } from 'util';
import os from 'os';

const execAsync = promisify(exec);
const ROOT     = process.cwd();
const ENV_PATH = path.join(ROOT, '.env.local');
const NEXT_DIR = path.join(ROOT, '.next');
const PKG_PATH = path.join(ROOT, 'package.json');
const LOG_DIR  = path.join(ROOT, '.cto-logs');
const LOG_FILE = path.join(LOG_DIR, `cto-${new Date().toISOString().slice(0,10)}.log`);

// ─── Colors ────────────────────────────────────────────────
const C = {
  info:'\x1b[36m', success:'\x1b[32m', warn:'\x1b[33m',
  error:'\x1b[31m', bold:'\x1b[1m', dim:'\x1b[2m',
  reset:'\x1b[0m', cyan:'\x1b[96m', magenta:'\x1b[35m'
};

// ─── Logger ────────────────────────────────────────────────
async function ensureLogDir() {
  if (!existsSync(LOG_DIR)) await fs.mkdir(LOG_DIR, { recursive: true });
}

async function log(level, msg) {
  const time  = new Date().toLocaleTimeString('en-GB', { hour12: false });
  const icons = { info:'ℹ️ ', success:'✅', warn:'⚠️ ', error:'❌', debug:'🔍', system:'🧠' };
  const cols  = { info:C.info, success:C.success, warn:C.warn, error:C.error, debug:C.dim, system:C.magenta };
  const col   = cols[level] || C.reset;
  const icon  = icons[level] || '•';
  const line  = `[${time}] ${icon}  ${msg}`;
  console.log(`${col}${line}${C.reset}`);
  try {
    await ensureLogDir();
    await fs.appendFile(LOG_FILE, `[${level.toUpperCase()}] ${line}\n`);
  } catch { /* ignore log errors */ }
}

function separator(title = '') {
  const ln = '─'.repeat(50);
  console.log(`\n${C.bold}${C.cyan}${ln}${C.reset}`);
  if (title) console.log(`${C.bold}  ${title}${C.reset}`);
  console.log(`${C.bold}${C.cyan}${ln}${C.reset}\n`);
}

// ─── Memory Monitor ────────────────────────────────────────
async function checkMemory() {
  const totalMB = Math.round(os.totalmem() / 1024 / 1024);
  const freeMB  = Math.round(os.freemem()  / 1024 / 1024);
  const usedPct = Math.round((1 - os.freemem() / os.totalmem()) * 100);
  if (usedPct > 85) {
    await log('error', `RAM حرج: ${usedPct}% (متاح: ${freeMB}MB) — خطر OOM Kill`);
    await log('warn',  'أغلق التطبيقات الثقيلة ثم أعد المحاولة');
    return false;
  } else if (usedPct > 70) {
    await log('warn', `RAM: ${usedPct}% مستخدم (${freeMB}MB من ${totalMB}MB متاح)`);
  } else {
    await log('success', `RAM: ${freeMB}MB متاحة من ${totalMB}MB (${usedPct}% مستخدم)`);
  }
  return true;
}

// ─── Port Management ───────────────────────────────────────
async function resolvePort(port = 3000) {
  try {
    const { stdout } = await execAsync(
      `lsof -ti:${port} 2>/dev/null || fuser ${port}/tcp 2>/dev/null || echo ""`
    );
    const pid = stdout.trim();
    if (pid) {
      await log('warn', `المنفذ ${port} محجوز (PID: ${pid}) — جاري التحرير...`);
      await execAsync(`kill -9 ${pid}`);
      await log('success', `المنفذ ${port} تم تحريره`);
    } else {
      await log('success', `المنفذ ${port} متاح`);
    }
  } catch {
    await log('debug', `المنفذ ${port}: متاح`);
  }
}

// ─── Git Auto-Snapshot ─────────────────────────────────────
async function gitSnapshot(msg = 'CTO auto-snapshot') {
  try {
    if (!existsSync(path.join(ROOT, '.git'))) {
      await log('debug', 'Git غير مُهيأ — تخطي snapshot');
      return;
    }
    await execAsync('git add -A');
    await execAsync(`git commit -m "🤖 ${msg} [$(date '+%Y-%m-%d %H:%M')]" --allow-empty`);
    await log('success', `Git snapshot: "${msg}"`);
  } catch (e) {
    await log('warn', `Git snapshot: ${e.message.slice(0, 60)}`);
  }
}

// ─── Env Parser ────────────────────────────────────────────
async function parseEnv() {
  if (!existsSync(ENV_PATH)) return {};
  const raw = await fs.readFile(ENV_PATH, 'utf8');
  const out = {};
  for (const line of raw.split('\n')) {
    if (!line.trim() || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq < 0) continue;
    const key = line.slice(0, eq).trim();
    let   val = line.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
    out[key]  = val;
  }
  return out;
}

async function auditEnv() {
  await log('info', 'فحص ملفات البيئة (.env.local)...');
  if (!existsSync(ENV_PATH)) {
    await log('error', '.env.local غير موجود — Supabase لن يعمل');
    return 0;
  }
  await fs.copyFile(ENV_PATH, `${ENV_PATH}.bak`);
  await log('success', 'نسخة احتياطية: .env.local.bak');
  const env  = await parseEnv();
  let score  = 0;
  const keys = ['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY'];
  for (const k of keys) {
    if (env[k] && env[k].length > 10) {
      await log('success', `${k}: ✓`); score += 50;
    } else {
      await log('error', `${k}: مفقود أو فارغ`);
    }
  }
  return score;
}

// ─── Supabase Health ───────────────────────────────────────
async function checkSupabase(env) {
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const key = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) { await log('warn', 'Supabase: بيانات ناقصة'); return false; }
  const ctrl  = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 5000);
  try {
    const res = await fetch(`${url}/rest/v1/`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      signal: ctrl.signal
    });
    clearTimeout(timer);
    if ([200, 400, 401].includes(res.status)) {
      await log('success', `Supabase: متصل (HTTP ${res.status})`);
      return true;
    }
    await log('warn', `Supabase: HTTP ${res.status}`);
    return false;
  } catch (e) {
    clearTimeout(timer);
    const msg = e.name === 'AbortError' ? 'انتهت مهلة الاتصال (>5s)' : e.message.slice(0,60);
    await log('warn', `Supabase: ${msg}`);
    return false;
  }
}

// ─── Tailwind v4 Check ─────────────────────────────────────
async function checkTailwind() {
  const paths = [
    path.join(ROOT, 'src', 'app', 'globals.css'),
    path.join(ROOT, 'app', 'globals.css'),
    path.join(ROOT, 'styles', 'globals.css')
  ];
  for (const p of paths) {
    if (!existsSync(p)) continue;
    const css = await fs.readFile(p, 'utf8');
    if (css.includes('@import "tailwindcss"') || css.includes("@import 'tailwindcss'")) {
      await log('success', `Tailwind v4: صيغة صحيحة ✓`);
      return true;
    }
    if (css.includes('@tailwind base')) {
      await log('warn', `Tailwind v3 syntax — لـ v4 غيّر إلى: @import "tailwindcss"`);
      return false;
    }
  }
  await log('debug', 'globals.css: غير موجود في المسارات المعتادة');
  return null;
}

// ─── Dependencies Check ────────────────────────────────────
async function checkDeps() {
  let score = 0;
  try {
    const pkg  = JSON.parse(await fs.readFile(PKG_PATH, 'utf8'));
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };
    for (const [name, min] of [['next','15'],['react','18'],['@supabase/supabase-js',null]]) {
      if (deps[name]) {
        await log('success', `${name}: ${deps[name]}`);
        score += 25;
      } else {
        await log('warn', `${name}: غير موجود في package.json`);
      }
    }
    if (!existsSync(path.join(ROOT, 'node_modules'))) {
      await log('error', 'node_modules مفقود — نفّذ: npm install');
      return 0;
    }
    await log('success', 'node_modules: ✓');
  } catch (e) {
    await log('error', `قراءة package.json: ${e.message}`);
    return 0;
  }
  return score;
}

// ─── Structure Conflict ────────────────────────────────────
async function checkStructure() {
  const appDir    = path.join(ROOT, 'app');
  const srcAppDir = path.join(ROOT, 'src', 'app');

  const appExists    = existsSync(appDir);
  const srcAppExists = existsSync(srcAppDir);

  if (appExists && srcAppExists) {
    await log('warn', 'تعارض: app/ و src/app/ موجودان معاً — يسبب أخطاء Next.js 15');
    return { conflict: true, appExists, srcAppExists };
  }

  if (srcAppExists) await log('success', 'هيكل src/app/ صحيح');
  else if (appExists) await log('success', 'هيكل app/ صحيح');

  return { conflict: false, appExists, srcAppExists };
}

// ─── Dir Size ──────────────────────────────────────────────
async function getDirSize(dir) {
  let total = 0;
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      total += e.isDirectory() ? await getDirSize(full) : statSync(full).size;
    }
  } catch { /* ignore */ }
  return total;
}

// ─── Auto-Heal ─────────────────────────────────────────────
async function autoHeal() {
  separator('🚑 بروتوكول العلاج الذاتي');
  await gitSnapshot('pre-heal state');

  // Clean .next
  if (existsSync(NEXT_DIR)) {
    const sizeMB = Math.round(await getDirSize(NEXT_DIR) / 1024 / 1024);
    await log('info', `حجم .next: ${sizeMB}MB`);
    try {
      if (sizeMB < 100) {
        execSync('tar -czf .next.snapshot.tar.gz .next 2>/dev/null || true', { stdio: 'pipe' });
        await log('success', `.next.snapshot.tar.gz (${sizeMB}MB) محفوظ`);
      } else {
        await log('warn', `.next كبير (${sizeMB}MB) — تخطي الضغط لحماية الذاكرة`);
      }
      await fs.rm(NEXT_DIR, { recursive: true, force: true });
      await log('success', '.next cache: تم التنظيف');
    } catch (e) {
      await log('error', `.next: ${e.message}`);
    }
  } else {
    await log('debug', 'لا يوجد .next للتنظيف');
  }

  // Fix structure conflict
  const { conflict } = await checkStructure();
  if (conflict) {
    try {
      await fs.rm(path.join(ROOT, 'app'), { recursive: true, force: true });
      await log('success', 'تم حذف app/ المتعارض — أُبقي على src/app/');
    } catch (e) {
      await log('error', `إزالة app/ المتعارض: ${e.message}`);
    }
  }
  await log('success', 'اكتمل العلاج الذاتي ✓');
}

// ─── Full Audit ────────────────────────────────────────────
async function systemAudit() {
  separator('📊 فحص شامل للمنصة');
  let healthScore = 100;

  const memOk = await checkMemory();
  if (!memOk) healthScore -= 25;

  const depScore = await checkDeps();
  if (depScore < 75) healthScore -= 20;

  const envScore = await auditEnv();
  if (envScore < 100) healthScore -= 15;

  const env = await parseEnv();
  const supaOk = await checkSupabase(env);
  if (!supaOk) healthScore -= 10;

  const twOk = await checkTailwind();
  if (twOk === false) healthScore -= 10;

  const { conflict } = await checkStructure();
  if (conflict) healthScore -= 20;

  healthScore = Math.max(0, healthScore);
  const filled  = Math.round(healthScore / 10);
  const bar     = '█'.repeat(filled) + '░'.repeat(10 - filled);
  const color   = healthScore >= 80 ? C.success : healthScore >= 60 ? C.warn : C.error;
  console.log(`\n${color}${C.bold}  صحة المنصة: [${bar}] ${healthScore}%${C.reset}\n`);

  if (healthScore < 60)       await log('error', 'المنصة تحتاج إصلاح عاجل — نفّذ: npm run cto:heal');
  else if (healthScore < 80)  await log('warn',  'يُنصح بـ: npm run cto:heal قبل الإقلاع');
  else                        await log('success', 'المنصة جاهزة للإقلاع 🚀');

  return healthScore;
}

// ─── Status Dashboard ──────────────────────────────────────
async function showStatus() {
  separator('📈 لوحة حالة Monteerly');
  const env     = await parseEnv();
  const memUsed = Math.round((1 - os.freemem() / os.totalmem()) * 100);
  const rows    = [
    ['المعالج',       os.cpus()[0]?.model?.slice(0, 30) || 'غير معروف'],
    ['الذاكرة',      `${memUsed}% مستخدم — ${Math.round(os.freemem()/1024/1024)}MB متاح`],
    ['وقت التشغيل',  `${Math.round(os.uptime()/60)} دقيقة`],
    ['Node.js',       process.version],
    ['المنصة',        process.platform],
    ['مجلد العمل',   process.cwd()],
    ['Supabase URL', env.NEXT_PUBLIC_SUPABASE_URL ? '✓ موجود' : '✗ مفقود'],
    ['.env.local',   existsSync(ENV_PATH) ? '✓ موجود' : '✗ مفقود'],
    ['.next cache',  existsSync(NEXT_DIR) ? '✓ موجود' : '✓ نظيف'],
    ['سجل اليوم',    LOG_FILE],
  ];
  for (const [k, v] of rows) {
    console.log(`  ${C.cyan}${k.padEnd(18)}${C.reset} ${v}`);
  }
  console.log('');
}

// ─── Boot ──────────────────────────────────────────────────
async function boot() {
  separator('🚀 إقلاع Monteerly OS');
  const memOk = await checkMemory();
  if (!memOk) {
    await log('error', 'الذاكرة حرجة — أغلق التطبيقات الثقيلة وأعد المحاولة');
    process.exit(1);
  }
  await autoHeal();
  const score = await systemAudit();
  await resolvePort(3000);
  separator('▶️  تسليم القيادة لـ Next.js 15');
  await log('system', `تشغيل الخادم (جاهزية: ${score}%)...`);
  try {
    execSync('npx next dev', { stdio: 'inherit' });
  } catch (e) {
    await log('error', `توقف الخادم: ${e.message.slice(0,80)}`);
    await log('info',  'للاستعادة: npm run cto:rollback');
  }
}

// ─── Rollback ──────────────────────────────────────────────
async function rollback() {
  separator('⏪ استعادة آخر حالة مستقرة');
  const snap = path.join(ROOT, '.next.snapshot.tar.gz');
  if (existsSync(snap)) {
    execSync(`tar -xzf ${snap}`, { stdio: 'inherit' });
    await log('success', 'تمت استعادة .next من snapshot');
  } else {
    await log('warn', 'لا يوجد snapshot متاح');
  }
  const bak = `${ENV_PATH}.bak`;
  if (existsSync(bak)) {
    await fs.copyFile(bak, ENV_PATH);
    await log('success', 'تمت استعادة .env.local');
  }
  await log('info', 'اكتملت الاستعادة — نفّذ: npm run cto:boot');
}

// ─── Help ──────────────────────────────────────────────────
function showHelp() {
  separator('🧠 Monteerly CTO Engine v4.0 — الأوامر');
  const cmds = [
    ['npm run cto:boot',     '🚀 إقلاع آمن كامل (فحص + علاج + تشغيل)'],
    ['npm run cto:audit',    '📊 فحص شامل مع تقرير النسبة'],
    ['npm run cto:heal',     '🚑 علاج ذاتي (كاش + تعارضات هيكلية)'],
    ['npm run cto:status',   '📈 لوحة الحالة الفورية'],
    ['npm run cto:rollback', '⏪ استعادة آخر حالة مستقرة'],
    ['npm run cto',          '📖 عرض هذه المساعدة'],
  ];
  for (const [cmd, desc] of cmds) {
    console.log(`  ${C.success}${cmd.padEnd(28)}${C.reset} ${desc}`);
  }
  console.log('');
}

// ─── Router ────────────────────────────────────────────────
const CMD = process.argv[2] || 'help';
console.log(`\n${C.bold}${C.magenta}  🧠 Monteerly CTO Engine v4.0${C.reset}  ${C.dim}[${new Date().toLocaleString('en-GB')}]${C.reset}\n`);
switch (CMD) {
  case 'boot':     await boot();        break;
  case 'audit':    await systemAudit(); break;
  case 'heal':     await autoHeal();    break;
  case 'status':   await showStatus();  break;
  case 'rollback': await rollback();    break;
  default:         showHelp();
}
NODEJS_EOF

log_ok "cto.mjs تم كتابته بنجاح ($(wc -l < scripts/cto.mjs) سطر)"

# ─── 4. تحديث package.json ───────────────────────────────
sep "4️⃣  تحديث package.json"

node -e "
const fs  = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.scripts = pkg.scripts || {};
pkg.scripts['cto']          = 'node scripts/cto.mjs';
pkg.scripts['cto:boot']     = 'node scripts/cto.mjs boot';
pkg.scripts['cto:audit']    = 'node scripts/cto.mjs audit';
pkg.scripts['cto:heal']     = 'node scripts/cto.mjs heal';
pkg.scripts['cto:status']   = 'node scripts/cto.mjs status';
pkg.scripts['cto:rollback'] = 'node scripts/cto.mjs rollback';
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
console.log('package.json: تم التحديث');
"
log_ok "6 أوامر جديدة أُضيفت لـ package.json"

# ─── 5. فحص مباشر ────────────────────────────────────────
sep "5️⃣  تشغيل أول فحص للمنصة"
node scripts/cto.mjs audit

# ─── 6. ملخص نهائي ───────────────────────────────────────
sep "✅ التثبيت اكتمل بنجاح"

echo -e "  ${BOLD}الأوامر المتاحة الآن:${NC}\n"
echo -e "  ${CYAN}npm run cto${NC}           📖 مساعدة"
echo -e "  ${CYAN}npm run cto:status${NC}    📈 لوحة الحالة الفورية"
echo -e "  ${CYAN}npm run cto:audit${NC}     📊 فحص شامل للمنصة"
echo -e "  ${CYAN}npm run cto:heal${NC}      🚑 علاج ذاتي تلقائي"
echo -e "  ${CYAN}npm run cto:boot${NC}      🚀 إقلاع آمن كامل"
echo -e "  ${CYAN}npm run cto:rollback${NC}  ⏪ استعادة آخر حالة\n"
echo -e "  ${YELLOW}⚠️  لا تستخدم 'npm run dev' — استخدم 'npm run cto:boot'${NC}\n"
echo -e "  ${BOLD}${GREEN}🎉 Monteerly CTO Engine v4.0 يعمل الآن!${NC}\n"
