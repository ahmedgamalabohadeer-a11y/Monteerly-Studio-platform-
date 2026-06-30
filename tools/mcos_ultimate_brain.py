import json
import re
import hashlib
from datetime import datetime, timezone
from pathlib import Path

GENERATOR_VERSION = "mcos_ultimate_brain_v6.4"


ULTIMATE_ARCHITECTURE = {
    "Financial_and_Escrow_Layer": {
        "name": "محرك التكنولوجيا المالية والضمان (FinTech)",
        "expected_routes": [
            "src/app/[locale]/wallet/page.tsx",
            "src/app/api/payments/paymob/webhook/route.ts",
        ],
        "expected_components": [
            "src/components/finance/BalanceCard.tsx",
            "src/components/finance/InvoiceBuilder.tsx",
            "src/components/fintech/RevenueSplitter.tsx",
        ],
    },
    "Sovereign_Workspace_Layer": {
        "name": "غرفة العمليات والمونتاج السحابي (Workspace)",
        "expected_routes": [
            "src/app/[locale]/workspace/page.tsx",
            "src/app/[locale]/studio/[projectId]/page.tsx",
        ],
        "expected_components": [
            "src/components/workspace/ReviewPlayer.tsx",
            "src/components/workspace/LiveCursors.tsx",
            "src/components/workspace/AudioMixer.tsx",
            "src/components/workspace/CloudUploadZone.tsx",
        ],
    },
    "Security_and_Compliance_Layer": {
        "name": "القبة الحديدية والامتثال (Security & Legal)",
        "expected_routes": [
            "src/app/[locale]/disputes/page.tsx",
            "src/app/[locale]/legal/page.tsx",
        ],
        "expected_components": [
            "src/components/security/ForensicWatermark.tsx",
            "src/components/security/sovereignty/ZeroTrustBuilder.tsx",
            "src/components/legal/ContractWizard.tsx",
            "src/components/admin/ArbitrationConsole.tsx",
        ],
    },
    "AI_and_Automation_Layer": {
        "name": "ترسانة الذكاء الاصطناعي (Agents & AI)",
        "expected_routes": [
            "src/app/[locale]/ai-studio/page.tsx",
        ],
        "expected_components": [
            "src/components/ai/ScriptGenerator.tsx",
            "src/components/ai/StoryboardGenerator.tsx",
            "src/components/ai/digital-twin/DigitalTwinSetup.tsx",
            "src/components/ai/vision/FaceVault.tsx",
        ],
    },
    "Marketplace_and_Community": {
        "name": "سوق النخب والمجتمع (Market & Community)",
        "expected_routes": [
            "src/app/[locale]/marketplace/page.tsx",
            "src/app/[locale]/community/page.tsx",
        ],
        "expected_components": [
            "src/components/market/AiMatcher.tsx",
            "src/components/market/TalentMap.tsx",
            "src/components/community/CommunityFeed.tsx",
        ],
    },
    "Executive_God_Mode": {
        "name": "لوحة القيادة السيادية (God Mode Dashboard)",
        "expected_routes": [
            "src/app/[locale]/dashboard/page.tsx",
            "src/app/[locale]/executive/page.tsx",
        ],
        "expected_components": [
            "src/components/admin/god-mode/LiveOpsMap.tsx",
            "src/components/admin/god-mode/TrafficControl.tsx",
            "src/components/analytics/CreatorAnalytics.tsx",
        ],
    },
}


def resolve_master_brain(root_dir: Path):
    candidates = [
        root_dir / ".docs" / "monteerly_unified_executive_document.md",
        root_dir / ".docs" / "vision" / "Monteerly-Master-Brain.md",
        root_dir / ".docs" / "vision" / "Monteerly-Platform-Ultimate-Blueprint.md",
        root_dir / ".docs" / "MASTER_BRAIN.md",
        root_dir / "docs" / "vision" / "Monteerly-Platform-Ultimate-Blueprint.md",
    ]
    for path in candidates:
        if path.exists():
            return path.resolve()
    return None


def strip_citations(text: str) -> str:
    text = re.sub(r"\[(file|web|page|cite|code_file|chart|memory|generated_image|generated_video):\d+\]", "", text)
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r" *\n", "\n", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def sha256_text(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def sha256_file(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def sha256_json(data) -> str:
    payload = json.dumps(data, sort_keys=True, ensure_ascii=False)
    return hashlib.sha256(payload.encode("utf-8")).hexdigest()


def load_existing_manifest(path: Path):
    if not path.exists():
        return None
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        return None


def analyze_system():
    print("🔍 [1/3] جاري مسح المشروع وربطه بجينوم الدستور المرجعي...")

    root_dir = Path(".")
    docs_dir = root_dir / "docs"
    tools_dir = root_dir / "tools"
    runtime_dir = root_dir / ".docs" / "runtime"
    manifest_path = runtime_dir / "brain.manifest.json"
    script_path = root_dir / "tools" / "mcos_ultimate_brain.py"

    docs_dir.mkdir(exist_ok=True)
    tools_dir.mkdir(exist_ok=True)
    runtime_dir.mkdir(parents=True, exist_ok=True)

    master_brain_path = resolve_master_brain(root_dir)
    master_brain_text = ""
    master_brain_excerpt = ""
    master_brain_sha256 = None

    if master_brain_path:
        master_brain_text = master_brain_path.read_text(encoding="utf-8")
        master_brain_sha256 = sha256_text(master_brain_text)
        master_brain_excerpt = strip_citations(master_brain_text[:12000])
        print(f"🧠 المرجع الرئيسي المعتمد: {master_brain_path}")
    else:
        print("⚠️ لم يتم العثور على المرجع الرئيسي الموحد، سيتم استخدام الدستور المولد فقط.")

    system_state = {"status": "scanning", "modules": {}}
    missing_count = 0
    found_count = 0

    current_script_sha = sha256_file(script_path)
    now_iso = datetime.now(timezone.utc).isoformat()

    master_markdown = f"""# 🏛️ ULTIMATE MCOS CONSTITUTION (الدستور التنفيذي المطلق v6.4)

## 🧠 المرجع الرئيسي الموحد
"""

    if master_brain_path:
        master_markdown += f"- المصدر الرسمي: `{master_brain_path}`\n"
        master_markdown += f"- SHA256: `{master_brain_sha256}`\n"
        master_markdown += f"- Generator Version: `{GENERATOR_VERSION}`\n"
        master_markdown += f"- Script SHA256: `{current_script_sha}`\n\n"
        master_markdown += "## 📜 مقتطف المرجع التنفيذي الموحد\n\n"
        master_markdown += master_brain_excerpt
        master_markdown += "\n\n---\n\n"
    else:
        master_markdown += "- لم يتم العثور على المرجع الرئيسي الموحد.\n\n"

    master_markdown += "## 📊 حالة التشريح الجراحي للنظام (System Audit)\n\n"

    for module_key, module_data in ULTIMATE_ARCHITECTURE.items():
        master_markdown += f"### 🧩 {module_data['name']}\n"
        module_state = {"routes": {}, "components": {}}

        master_markdown += "**المسارات (Routes):**\n"
        for route in module_data["expected_routes"]:
            path = root_dir / route
            if path.exists():
                master_markdown += f"- ✅ `{route}` (متصل وجاهز)\n"
                module_state["routes"][route] = "ready"
                found_count += 1
            else:
                master_markdown += f"- ❌ `{route}` (مفقود - قيد الجدولة)\n"
                module_state["routes"][route] = "missing"
                missing_count += 1

        master_markdown += "**المكونات (Components):**\n"
        for comp in module_data["expected_components"]:
            path = root_dir / comp
            if path.exists():
                master_markdown += f"- ✅ `{comp}` (تم البناء)\n"
                module_state["components"][comp] = "ready"
                found_count += 1
            else:
                master_markdown += f"- ❌ `{comp}` (يتطلب الأتمتة)\n"
                module_state["components"][comp] = "missing"
                missing_count += 1

        master_markdown += "\n"
        system_state["modules"][module_key] = module_state

    master_markdown += """## 💰 الهيكل الاقتصادي والتسعير (Monetization Engine)
- **الباقة المجانية (Rookie):** أدوات أساسية، تخزين 5GB، عمولة 15%.
- **باقة المحترفين (Pro):** استوديو متقدم، أدوات AI، تخزين 50GB، عمولة 10%.
- **باقة المؤسسات (Studio/Agency):** White-label، إدارة فريق، God-Mode، عمولة 5%.

## 🚀 خطة التنفيذ المؤتمتة القادمة (Execution Queue)
1. **Sprint A:** بناء وتوليد جميع مكونات `Sovereign_Workspace_Layer` لضمان تشغيل الاستوديو.
2. **Sprint B:** ربط `Financial_and_Escrow_Layer` مع بوابات الدفع والمنطق المالي.
3. **Sprint C:** تفعيل خوارزمية `Marketplace_DNA_Match` في سوق العمل.
"""

    system_state_sha256 = sha256_json(system_state)
    existing_manifest = load_existing_manifest(manifest_path)

    previous_source_sha = existing_manifest.get("canonical_source_sha256") if existing_manifest else None
    previous_state_sha = existing_manifest.get("system_state_sha256") if existing_manifest else None
    previous_script_sha = existing_manifest.get("script_sha256") if existing_manifest else None
    previous_last_rebuilt_at = existing_manifest.get("last_rebuilt_at") if existing_manifest else None

    needs_rebuild = (
        previous_source_sha != master_brain_sha256
        or previous_state_sha != system_state_sha256
        or previous_script_sha != current_script_sha
        or not (docs_dir / "ULTIMATE_MCOS_CONSTITUTION.md").exists()
        or not (tools_dir / "mcos_execution_state.json").exists()
    )

    current_status = "stale" if needs_rebuild else "fresh"

    manifest = {
        "generated_at": now_iso,
        "last_checked_at": now_iso,
        "last_rebuilt_at": previous_last_rebuilt_at,
        "generator_version": GENERATOR_VERSION,
        "script_path": str(script_path),
        "script_sha256": current_script_sha,
        "canonical_source": str(master_brain_path) if master_brain_path else None,
        "canonical_source_sha256": master_brain_sha256,
        "system_state_sha256": system_state_sha256,
        "excerpt_chars": len(master_brain_excerpt),
        "source_chars": len(master_brain_text),
        "source_lines": len(master_brain_text.splitlines()) if master_brain_text else 0,
        "constitution_path": str(docs_dir / "ULTIMATE_MCOS_CONSTITUTION.md"),
        "execution_state_path": str(tools_dir / "mcos_execution_state.json"),
        "found_count": found_count,
        "missing_count": missing_count,
        "status": current_status,
        "needs_rebuild": needs_rebuild,
    }

    if needs_rebuild:
        print("📝 [2/3] تم اكتشاف تغييرات، جاري إعادة توليد الدستور التنفيذي وخريطة الأتمتة...")
        (docs_dir / "ULTIMATE_MCOS_CONSTITUTION.md").write_text(master_markdown, encoding="utf-8")
        (tools_dir / "mcos_execution_state.json").write_text(
            json.dumps(system_state, indent=2, ensure_ascii=False),
            encoding="utf-8",
        )
        manifest["status"] = "fresh"
        manifest["needs_rebuild"] = False
        manifest["last_rebuilt_at"] = now_iso
    else:
        print("🟢 [2/3] لا توجد تغييرات، المخرجات الحالية ما زالت fresh.")

    manifest_path.write_text(
        json.dumps(manifest, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )

    print("✅ [3/3] تمت العملية بنجاح!")
    print(f"📊 إحصائيات النظام: تم العثور على {found_count} عناصر، ومفقود {missing_count} عناصر استراتيجية.")
    print(f"🧾 status: {manifest['status']}")
    print(f"♻️ needs_rebuild: {manifest['needs_rebuild']}")
    print(f"🕒 last_checked_at: {manifest['last_checked_at']}")
    print(f"🏗️ last_rebuilt_at: {manifest['last_rebuilt_at']}")
    print("📁 الدستور متاح الآن في: docs/ULTIMATE_MCOS_CONSTITUTION.md")
    print("📁 manifest متاح الآن في: .docs/runtime/brain.manifest.json")


if __name__ == "__main__":
    analyze_system()
