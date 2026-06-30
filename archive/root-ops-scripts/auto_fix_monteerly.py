#!/usr/bin/env python3
from pathlib import Path
import shutil
import subprocess
import re
import sys

ROOT = Path(".").resolve()
SRC = ROOT / "src"

if not SRC.exists():
    print("ERROR: src directory not found")
    sys.exit(1)

TARGET_EXTS = {".ts", ".tsx"}

modified_files = []
backups = []
report = []

def backup_file(path: Path):
    bak = path.with_suffix(path.suffix + ".bak")
    if not bak.exists():
        shutil.copy2(path, bak)
        backups.append(str(bak))

def write_if_changed(path: Path, old: str, new: str, reason: str):
    if new != old:
        backup_file(path)
        path.write_text(new, encoding="utf-8")
        modified_files.append(str(path))
        report.append(f"[UPDATED] {path} :: {reason}")
        return True
    return False

def normalize_blank_lines(text: str) -> str:
    return re.sub(r"\n{3,}", "\n\n", text)

def fix_ts_comments(text: str) -> str:
    text = re.sub(
        r"//\s*@ts-ignore\b",
        "// @ts-expect-error: legacy compatibility",
        text
    )
    text = re.sub(
        r"//\s*@ts-expect-error\s*$",
        "// @ts-expect-error: legacy compatibility",
        text,
        flags=re.M
    )
    return text

def remove_symbol_from_imports(text: str, symbol: str) -> str:
    text = re.sub(
        rf'(\{{[^}}]*?)\b{re.escape(symbol)}\b\s*,\s*',
        r'\1',
        text,
        flags=re.S
    )
    text = re.sub(
        rf',\s*\b{re.escape(symbol)}\b(?=[^}}]*\}})',
        '',
        text,
        flags=re.S
    )
    text = re.sub(r',\s*,', ',', text)
    text = re.sub(r'\{\s*,', '{', text)
    text = re.sub(r',\s*\}', ' }', text)
    return text

def fix_mounted_pattern(text: str) -> str:
    original = text

    text = re.sub(
        r'\n\s*const\s*\[\s*mounted\s*,\s*setMounted\s*\]\s*=\s*useState\s*\(\s*false\s*\)\s*;?',
        '',
        text
    )

    text = re.sub(
        r'useEffect\s*\(\s*\(\)\s*=>\s*\{\s*setMounted\s*\(\s*true\s*\)\s*;\s*document\.documentElement\.classList\.toggle\(\s*[\'"]dark[\'"]\s*,\s*isDarkMode\s*\)\s*;\s*\}\s*,\s*\[\s*isDarkMode\s*\]\s*\)\s*;',
        "useEffect(() => {\n    document.documentElement.classList.toggle('dark', isDarkMode);\n  }, [isDarkMode]);",
        text,
        flags=re.S
    )

    text = re.sub(
        r'\n\s*setMounted\s*\(\s*true\s*\)\s*;?',
        '',
        text
    )

    text = re.sub(
        r'\n\s*if\s*\(\s*!mounted\s*\)\s*return\s*<div[^;]*;\s*',
        '\n',
        text,
        flags=re.S
    )

    return text if text != original else original

def fix_local_storage_visibility_pattern(text: str) -> str:
    original = text

    pairs = [
        ("show", "setShow"),
        ("isVisible", "setIsVisible"),
        ("visible", "setVisible"),
        ("showCookie", "setShowCookie"),
        ("isOffline", "setIsOffline"),
        ("theme", "setTheme"),
    ]

    for state_name, setter_name in pairs:
        pattern = re.compile(
            rf'useEffect\s*\(\s*\(\)\s*=>\s*\{{(?P<body>.*?)\b{setter_name}\s*\(',
            re.S
        )
        if pattern.search(text):
            text = re.sub(
                rf'useEffect\s*\(\s*\(\)\s*=>\s*\{{\s*if\s*\(\s*!localStorage\.getItem\((?P<q>[\'"][^\'"]+[\'"])\)\s*\)\s*{setter_name}\s*\(\s*true\s*\)\s*;?\s*\}}\s*,\s*\[\s*\]\s*\)\s*;',
                f"const [{state_name}] = useState(() => typeof window !== 'undefined' ? !localStorage.getItem('cookieconsent') : false);",
                text,
                flags=re.S
            )

    text = re.sub(
        r"useEffect\s*\(\s*\(\)\s*=>\s*\{\s*if\s*\(\s*!localStorage\.getItem\(\s*['\"]cookieconsent['\"]\s*\)\s*\)\s*setShow\s*\(\s*true\s*\)\s*;?\s*\}\s*,\s*\[\s*\]\s*\)\s*;",
        "const [show] = useState(() => typeof window !== 'undefined' ? !localStorage.getItem('cookieconsent') : false);",
        text,
        flags=re.S
    )

    text = re.sub(
        r"useEffect\s*\(\s*\(\)\s*=>\s*\{\s*if\s*\(\s*!localStorage\.getItem\(\s*['\"]monteerly-tour-seen['\"]\s*\)\s*\)\s*setShow\s*\(\s*true\s*\)\s*;?\s*\}\s*,\s*\[\s*\]\s*\)\s*;",
        "const [show] = useState(() => typeof window !== 'undefined' ? !localStorage.getItem('monteerly-tour-seen') : false);",
        text,
        flags=re.S
    )

    text = re.sub(
        r"useEffect\s*\(\s*\(\)\s*=>\s*\{\s*if\s*\(\s*!localStorage\.getItem\(\s*['\"]tourcompleted['\"]\s*\)\s*\)\s*setIsVisible\s*\(\s*true\s*\)\s*;?\s*\}\s*,\s*\[\s*\]\s*\)\s*;",
        "const [isVisible] = useState(() => typeof window !== 'undefined' ? !localStorage.getItem('tourcompleted') : false);",
        text,
        flags=re.S
    )

    text = re.sub(
        r"useEffect\s*\(\s*\(\)\s*=>\s*\{\s*if\s*\(\s*typeof window !== ['\"]undefined['\"]\s*&&\s*!navigator\.onLine\s*\)\s*setIsOffline\s*\(\s*true\s*\)\s*;?\s*(?P<rest>.*?)\}\s*,\s*\[\s*\]\s*\)\s*;",
        lambda m: "const [isOffline, setIsOffline] = useState(() => typeof window !== 'undefined' ? !navigator.onLine : false);\n\nuseEffect(() => {" + m.group("rest") + "\n}, []);",
        text,
        flags=re.S
    )

    return text if text != original else original

def fix_notification_dropdown(text: str) -> str:
    original = text

    if "href=\"/notifications\"" in text or "href='/notifications'" in text:
        if "from 'next/link'" not in text and 'from "next/link"' not in text:
            if re.search(r"import\s+.*\s+from\s+['\"]react['\"]", text):
                text = re.sub(
                    r"(import\s+.*\s+from\s+['\"]react['\"]\s*;)",
                    r"\1\nimport Link from 'next/link';",
                    text,
                    count=1
                )
            else:
                text = "import Link from 'next/link';\n" + text

        text = re.sub(r"<a(\s+[^>]*?)href=(['\"])\/notifications\2([^>]*)>", r"<Link\1href=\"/notifications\"\3>", text)
        text = re.sub(r"</a>", "</Link>", text)

    return text if text != original else original

def fix_live_social_proof(text: str) -> str:
    original = text

    trigger_decl = re.search(
        r"const\s+triggerNotification\s*=\s*(?:\([^)]*\)\s*=>|\w+\s*=>|\(\)\s*=>)\s*\{.*?\n\s*\};",
        text,
        flags=re.S
    )
    first_effect = re.search(
        r"useEffect\s*\(\s*\(\)\s*=>\s*\{.*?triggerNotification\s*\(\s*\).*?\}\s*,\s*\[\s*\]\s*\)\s*;",
        text,
        flags=re.S
    )

    if trigger_decl and first_effect and trigger_decl.start() > first_effect.start():
        block = trigger_decl.group(0)
        text = text[:trigger_decl.start()] + text[trigger_decl.end():]
        insert_at = first_effect.start()
        text = text[:insert_at] + block + "\n\n" + text[insert_at:]

    return text if text != original else original

def fix_specific_file(path: Path, text: str) -> str:
    original = text

    rel = path.as_posix()

    text = fix_ts_comments(text)

    if rel.endswith("src/app/[locale]/page.tsx"):
        text = remove_symbol_from_imports(text, "PlayCircle")
        text = fix_mounted_pattern(text)

    if rel.endswith("src/components/ThemeToggle.tsx") or rel.endswith("src/components/layout/ThemeToggle.tsx"):
        text = fix_mounted_pattern(text)

    if rel.endswith("src/components/layout/NotificationDropdown.tsx"):
        text = fix_notification_dropdown(text)

    if rel.endswith("src/components/marketing/LiveSocialProof.tsx"):
        text = fix_live_social_proof(text)

    text = fix_local_storage_visibility_pattern(text)
    text = normalize_blank_lines(text)

    return text if text != original else original

for path in SRC.rglob("*"):
    if path.is_file() and path.suffix in TARGET_EXTS:
        try:
            old = path.read_text(encoding="utf-8")
        except Exception:
            continue
        new = fix_specific_file(path, old)
        write_if_changed(path, old, new, "automatic safe-pattern fixes")

print("=== AUTO FIX REPORT ===")
if report:
    for line in report:
        print(line)
else:
    print("No files were changed.")

print("\n=== RUN ESLINT ON MODIFIED FILES ===")
if modified_files:
    for f in modified_files:
        print(f"\n--- {f} ---")
        result = subprocess.run(["pnpm", "eslint", f], text=True, capture_output=True)
        if result.stdout.strip():
            print(result.stdout)
        if result.stderr.strip():
            print(result.stderr)
        print(f"exit_code={result.returncode}")
else:
    print("No modified files to lint.")

print("\n=== SUMMARY ===")
print(f"Modified files: {len(modified_files)}")
print(f"Backups created: {len(backups)}")
if backups:
    print("Backups:")
    for b in backups:
        print(b)
