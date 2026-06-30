#!/usr/bin/env python3
from pathlib import Path
import shutil
import subprocess
import re
import sys

ROOT = Path(".").resolve()

TARGETS = [
    Path("src/components/ui/SocialShare.tsx"),
    Path("src/components/layout/NotificationDropdown.tsx"),
    Path("src/components/workspace/ReviewPlayer.tsx"),
    Path("src/components/distribution/PublishManager.tsx"),
    Path("src/components/studio/mobile/TouchControls.tsx"),
]

modified = []
backups = []

def backup(path: Path):
    bak = path.with_suffix(path.suffix + ".round2.bak")
    if not bak.exists():
        shutil.copy2(path, bak)
        backups.append(str(bak))

def save(path: Path, old: str, new: str, reason: str):
    if new != old:
        backup(path)
        path.write_text(new, encoding="utf-8")
        modified.append((str(path), reason))

def run_eslint(path: Path):
    print(f"\n--- {path} ---")
    result = subprocess.run(["pnpm", "eslint", str(path)], text=True, capture_output=True)
    if result.stdout.strip():
        print(result.stdout)
    if result.stderr.strip():
        print(result.stderr)
    print(f"exit_code={result.returncode}")

def fix_unescaped_quotes(text: str) -> str:
    text = re.sub(r'>([^<]*?)"([^<]*?)<', lambda m: ">" + m.group(1) + "&quot;" + m.group(2) + "<", text)
    text = re.sub(r'>([^<]*?)"([^<]*?)"([^<]*?)<', lambda m: ">" + m.group(1) + "&quot;" + m.group(2) + "&quot;" + m.group(3) + "<", text)
    return text

def fix_ts_ignore_any(text: str) -> str:
    text = re.sub(r'//\s*@ts-ignore\b', '// @ts-expect-error: legacy compatibility', text)
    text = re.sub(r'\bany\b', 'unknown', text)
    return text

def fix_touch_controls(text: str) -> str:
    original = text

    if "useMemo" not in text:
        text = re.sub(
            r'import\s+\{([^}]*)\}\s+from\s+[\'"]react[\'"];',
            lambda m: f"import {{{m.group(1).rstrip()}, useMemo}} from 'react';" if "useMemo" not in m.group(1) else m.group(0),
            text,
            count=1
        )

    if "const waveformBars = useMemo(" not in text:
        text = re.sub(
            r'(\n\s*const\s+\[[^\n]+?\]\s*=\s*useState[^\n]*\n)',
            r'\1  const waveformBars = useMemo(() => Array.from({ length: 40 }, () => Math.floor(Math.random() * 100)), []);\n',
            text,
            count=1
        )

    text = re.sub(
        r'Array\.from\(\{length:\s*40\}\)\.map\(\(_, i\)\s*=>\s*\(\s*<div key=\{i\} className="flex-1 bg-indigo-500 rounded-t-sm" style=\{\{ height: `\$\{Math\.random\(\) \* 100\}%` \}\} />\s*\)\)',
        r'waveformBars.map((barHeight, i) => (<div key={i} className="flex-1 bg-indigo-500 rounded-t-sm" style={{ height: `${barHeight}%` }} />))',
        text,
        flags=re.S
    )

    return text if text != original else original

def fix_notification_dropdown(path: Path, text: str) -> str:
    bak = path.with_suffix(path.suffix + ".bak")
    if bak.exists():
        text = bak.read_text(encoding="utf-8")

    original = text

    if "from 'next/link'" not in text and 'from "next/link"' not in text:
        imports = list(re.finditer(r"^import .+?;$", text, flags=re.M))
        if imports:
            last_import = imports[-1]
            insert_at = last_import.end()
            text = text[:insert_at] + "\nimport Link from 'next/link';" + text[insert_at:]
        else:
            text = "import Link from 'next/link';\n" + text

    text = re.sub(
        r'<a([^>]*?)href=(["\'])/notifications\2([^>]*)>',
        r'<Link\1href="/notifications"\3>',
        text
    )

    text = re.sub(r'</a>', '</Link>', text)

    text = text.replace("…", "...")
    text = text.replace("“", '"').replace("”", '"').replace("’", "'").replace("‘", "'")

    return text if text != original else original

for rel in TARGETS:
    path = ROOT / rel
    if not path.exists():
        print(f"SKIP: {rel} not found")
        continue

    old = path.read_text(encoding="utf-8")
    new = old

    if rel.as_posix().endswith("NotificationDropdown.tsx"):
        new = fix_notification_dropdown(path, new)
    elif rel.as_posix().endswith("TouchControls.tsx"):
        new = fix_touch_controls(new)
    elif rel.as_posix().endswith("ReviewPlayer.tsx"):
        new = fix_ts_ignore_any(new)
    elif rel.as_posix().endswith("SocialShare.tsx") or rel.as_posix().endswith("PublishManager.tsx"):
        new = fix_unescaped_quotes(new)
        if rel.as_posix().endswith("PublishManager.tsx"):
            new = re.sub(r'<img([^>]*?)>', lambda m: '<img' + m.group(1) + (' alt=""' if 'alt=' not in m.group(1) else '') + '>', new)

    save(path, old, new, "round2 targeted fixes")

print("=== ROUND 2 REPORT ===")
if modified:
    for f, reason in modified:
        print(f"[UPDATED] {f} :: {reason}")
else:
    print("No files changed.")

print("\n=== RUN ESLINT ON ROUND 2 FILES ===")
for rel in TARGETS:
    path = ROOT / rel
    if path.exists():
        run_eslint(path)

print("\n=== SUMMARY ===")
print(f"Modified files: {len(modified)}")
print(f"Backups created: {len(backups)}")
for b in backups:
    print(b)
