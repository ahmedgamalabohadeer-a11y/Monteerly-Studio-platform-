import json
from pathlib import Path

state_file = Path("tools/mcos_execution_state.json")
if state_file.exists():
    state = json.loads(state_file.read_text(encoding="utf-8"))
    # تحديث حالة مسار المحفظة من missing إلى ready
    if "Financial_and_Escrow_Layer" in state["modules"]:
        state["modules"]["Financial_and_Escrow_Layer"]["routes"]["src/app/[locale]/wallet/page.tsx"] = "ready"
    state_file.write_text(json.dumps(state, indent=2, ensure_ascii=False), encoding="utf-8")
    print("✅ تم تحديث mcos_execution_state.json بنجاح.")
