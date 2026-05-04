import os
import re
import json
from pathlib import Path

BLUEPRINT_PATH = "docs/vision/Monteerly-Platform-Ultimate-Blueprint.md"
SRC_DIR = "src"

# ===============================
# ALIAS MAP (مهم جداً)
# ===============================
ALIASES = {
    "security": ["security", "auth", "shield", "trust"],
    "dashboard": ["dashboard", "home", "overview"],
    "pricing": ["pricing", "plan", "subscription"],
    "ai": ["ai", "ml", "intelligence", "smart"],
    "marketplace": ["market", "talent", "jobs"],
    "workspace": ["workspace", "editor", "project"],
    "academy": ["academy", "learning", "course"],
    "footer": ["footer"],
    "header": ["header", "navbar"],
}

EXCLUDE = ["docx", "txt", "source", "pdf"]

def clean(text):
    return re.sub(r'[^a-zA-Zأ-ي0-9]', '', text).lower()

def is_valid(t):
    t = t.lower()
    return not any(x in t for x in EXCLUDE) and len(t) > 5

def extract_sections(content):
    raw = re.findall(r'###? (.*)', content)
    return [r for r in raw if is_valid(r)]

def match_feature(feature, code):
    f = feature.lower()

    for key, words in ALIASES.items():
        if key in f:
            for w in words:
                if w in code:
                    return True

    return clean(feature) in code

def run():
    print("🚀 MCOS ENGINE v5 (AI MATCHING)\n")

    blueprint = Path(BLUEPRINT_PATH).read_text(encoding="utf-8")
    sections = extract_sections(blueprint)

    files_content = []

    for root, _, files in os.walk(SRC_DIR):
        if "node_modules" in root or ".next" in root:
            continue

        for file in files:
            if file.endswith((".ts", ".tsx")):
                try:
                    text = Path(os.path.join(root, file)).read_text(encoding="utf-8").lower()
                    files_content.append(text)
                except:
                    continue

    full_code = "\n".join(files_content)

    results = {}

    for sec in sections:
        results[sec] = match_feature(sec, full_code)

    implemented = [k for k,v in results.items() if v]
    missing = [k for k,v in results.items() if not v]

    print(f"✅ Implemented: {len(implemented)}")
    print(f"❌ Missing: {len(missing)}\n")

    print("🔴 REAL SMART GAPS:\n")
    for m in missing[:20]:
        print("-", m)

    with open("mcos_report_v5.json","w",encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

    print("\n📁 Saved: mcos_report_v5.json")

if __name__ == "__main__":
    run()
