import os
import json
from pathlib import Path

def audit_and_enhance():
    print("🔍 [2/3] جاري فحص المشروع الحالي بجميع مشتملاته (أكواد، صفحات، مكونات)...")
    
    state_file = Path("tools/system_state.json")
    if not state_file.exists():
        print("🚨 يجب تشغيل mcos_constitution_compiler.py أولاً.")
        return

    state = json.loads(state_file.read_text(encoding="utf-8"))
    
    print("\n⚠️ النواقص المكتشفة في النظام:")
    for feature in state["missing_features"]:
        print(f" - [ناقص] {feature['name']} (المسار: {feature['path']})")

    # إضافة الأتمتة: تجهيز الهياكل الفارغة للصفحات الناقصة دون المساس بالموجود
    print("\n⚙️ جاري بناء الهياكل للمسارات المفقودة (التطوير التراكمي)...")
    for feature in state["missing_features"]:
        if feature["type"] == "page":
            file_path = Path(feature["path"])
            file_path.parent.mkdir(parents=True, exist_ok=True)
            if not file_path.exists():
                # إنشاء صفحة تراكمية تلتزم بالهوية البصرية
                stub = f"""'use client';
import React from 'react';
import {{ AlertCircle }} from 'lucide-react';

export default function {feature['name'].split()[0].replace('-', '')}Page() {{
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 flex flex-col items-center justify-center font-sans">
      <div className="bg-slate-900 border border-indigo-500/30 p-8 rounded-3xl max-w-xl text-center shadow-2xl shadow-indigo-900/20">
        <AlertCircle className="w-16 h-16 text-indigo-500 mx-auto mb-6 animate-pulse" />
        <h1 className="text-3xl font-black mb-4">{feature['name']}</h1>
        <p className="text-slate-400 leading-relaxed">
          هذه الوحدة قيد التطوير والتكامل ضمن معمارية Monteerly Corporate OS v5.0. 
          سيتم ربطها بمحركات الذكاء الاصطناعي قريباً.
        </p>
      </div>
    </div>
  );
}}
"""
                file_path.write_text(stub, encoding="utf-8")
                print(f"   ✅ تم إنشاء الهيكل الآمن لـ: {feature['name']}")

if __name__ == "__main__":
    audit_and_enhance()
