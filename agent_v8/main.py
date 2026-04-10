import json, sys
from pathlib import Path
from core.registry import DigitalAssetRegistry
from core.gitops import GitOpsEngine
from core.template_engine import TemplateEngine

ROOT = Path(".")

def run():
    print("🚀 تشغيل Agent Ultra V8.0 (The Ultimate SOV-OS Architect)...")
    vision = json.loads((ROOT / "agent_v8/config/vision.json").read_text())
    
    dar = DigitalAssetRegistry()
    gitops = GitOpsEngine()
    tpl = TemplateEngine()

    locale = vision["default_locale"]
    changes_made = False

    print("🏢 جاري هندسة البنية التحتية والمؤسسية لتشمل مجتمعات المونتاج والذكاء الاصطناعي...")
    
    for key, info in vision["required_pages"].items():
        route = info["route"].strip("/")
        target_dir = ROOT / "src/app" / (f"[{locale}]" if route else "") / route
        target = target_dir / "page.tsx"
        
        if not target.exists():
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_text(tpl.get_template(info["type"]), encoding="utf-8")
            dar.register(target, info["type"], "create")
            print(f"✅ تم بناء قطاع: {key.upper()} -> {info['desc']}")
            changes_made = True

    if changes_made:
        print("🐙 جاري أرشفة التعديلات عبر GitOps...")
        gitops.auto_commit("SOV-OS Master Structure Created with AI & Workspace integration")
        print("🎉 اكتمل بناء الهيكل السيادي للمنصة بالكامل.")
    else:
        print("⚡ الهيكل السيادي مبني مسبقاً ومستقر.")

if __name__ == "__main__":
    run()
