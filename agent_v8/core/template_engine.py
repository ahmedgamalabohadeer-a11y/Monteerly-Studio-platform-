from pathlib import Path
import json

class TemplateEngine:
    def __init__(self, vision_path="agent_v8/config/vision.json"):
        self.base_dir = Path("agent_v8/templates")
        self.vision = json.loads(Path(vision_path).read_text())
        self._init_api_templates()

    def _init_api_templates(self):
        # إنشاء مسار API خاص لتصدير المخطط (Schema)
        api_dir = Path("src/app/api/agent/schema")
        api_dir.mkdir(parents=True, exist_ok=True)
        api_route = api_dir / "route.ts"
        
        if not api_route.exists():
            api_route.write_text("""import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const schemaPath = path.join(process.cwd(), 'agent_v8/db/master_schema.sql');
    if (!fs.existsSync(schemaPath)) return NextResponse.json({ error: "Schema not found" }, { status: 404 });
    const schemaContent = fs.readFileSync(schemaPath, 'utf8');
    return NextResponse.json({ schema: schemaContent });
  } catch (error) {
    return NextResponse.json({ error: "Failed to read Schema" }, { status: 500 });
  }
}
""", encoding="utf-8")

    def get_template(self, page_type):
        # (باقي كود القوالب موجود ولن نمسحه، اختصاراً للشاشة)
        return "export default function Page() { return <div dir='rtl' className='p-10'><h1>صفحة نظام</h1></div>; }"
