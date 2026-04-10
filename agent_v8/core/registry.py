import json, time
from pathlib import Path
class DigitalAssetRegistry:
    def __init__(self):
        self.dar_file = Path("agent_v8/docs/DAR.json")
        self.dar_file.parent.mkdir(parents=True, exist_ok=True)
        if not self.dar_file.exists(): self.dar_file.write_text("[]", encoding="utf-8")
    def register(self, path, atype, action="create"):
        assets = json.loads(self.dar_file.read_text())
        stamp = time.strftime('%Y-%m-%dT%H:%M:%SZ')
        existing = next((a for a in assets if a["path"] == str(path)), None)
        if existing: existing.update({"action": action, "last_modified": stamp})
        else: assets.append({"path": str(path), "type": atype, "action": action, "created": stamp, "last_modified": stamp, "deleted": False})
        self.dar_file.write_text(json.dumps(assets, indent=2))
