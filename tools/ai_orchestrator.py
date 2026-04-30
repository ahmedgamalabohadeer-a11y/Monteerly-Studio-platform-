import os
import sys
import json
import requests
import subprocess
import time
from dotenv import load_dotenv

# تحميل المفاتيح
load_dotenv('.env.local')
load_dotenv('.env')

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

class AIOrchestrator:
    def __init__(self):
        if not GEMINI_API_KEY:
            print("🚨 [CRITICAL] مفتاح GEMINI_API_KEY مفقود في ملف .env")
            sys.exit(1)
            
        # مصفوفة التعافي الذاتي: قائمة النماذج حسب الأولوية
        self.fallback_models = [
            "gemini-2.5-flash",
            "gemini-2.0-flash",
            "gemini-flash-latest",
            "gemini-pro-latest"
        ]
        
        self.system_prompt = """
        أنت عقل Monteerly AI OS v4.0. مهمتك هي تحويل طلبات المدير التنفيذي إلى أوامر Bash أو Termux:API صالحة للتنفيذ.
        ردك يجب أن يكون حصرياً بصيغة JSON بالتنسيق التالي:
        {
            "thought": "تفكيرك المنطقي حول المهمة",
            "command": "أمر الـ bash أو termux-api المراد تنفيذه مدمجاً بـ &&"
        }
        لا تكتب أي نص خارج الـ JSON ولا تستخدم علامات markdown.
        مثال للاستجابة: {"thought": "سأقوم بقراءة البطارية وعرض محتوى الملف", "command": "termux-battery-status && cat package.json | grep name"}
        """

    def plan_and_execute(self, task_description):
        print(f"🧠 [Orchestrator] جاري تحليل المهمة: {task_description}")
        
        payload = {
            "contents": [{
                "parts": [{"text": f"{self.system_prompt}\n\nTask: {task_description}"}]
            }]
        }
        
        # محرك التعافي الذاتي (MREE Loop)
        for model in self.fallback_models:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={GEMINI_API_KEY}"
            try:
                print(f"🔄 [MREE] محاولة الاتصال بالنموذج: {model}...")
                response = requests.post(url, json=payload, headers={'Content-Type': 'application/json'}, timeout=15)
                response.raise_for_status()
                
                # نجاح الاتصال
                result = response.json()
                raw_text = result['candidates'][0]['content']['parts'][0]['text']
                raw_text = raw_text.replace('```json', '').replace('```', '').strip()
                
                try:
                    action_plan = json.loads(raw_text)
                except json.JSONDecodeError:
                    print(f"🚨 خطأ في تحليل JSON من النموذج {model}.")
                    continue # تجربة النموذج التالي

                print(f"💡 [Planner Agent]: {action_plan['thought']}")
                command = action_plan['command']
                print(f"⚙️ [Agent Ultra] جاري التنفيذ: {command}")
                
                # التنفيذ الميكانيكي عبر Agent Ultra
                exec_result = subprocess.run(command, shell=True, capture_output=True, text=True)
                
                if exec_result.returncode == 0:
                    print(f"✅ [Success]:\n{exec_result.stdout.strip()}")
                else:
                    print(f"❌ [Error]:\n{exec_result.stderr.strip()}")
                
                return # إنهاء الدورة بنجاح

            except requests.exceptions.HTTPError as http_err:
                if http_err.response.status_code in [503, 429]:
                    print(f"⚠️ [MREE] النموذج {model} مزدحم (Status: {http_err.response.status_code}). تفعيل السقوط الآمن...")
                    time.sleep(1)
                    continue # الانتقال للنموذج التالي
                else:
                    print(f"🚨 [API Error] خطأ حرج: {http_err.response.text}")
                    return
            except Exception as e:
                print(f"🚨 [System Failure] فشل في الاتصال: {str(e)}")
                continue
                
        print("❌ [CRITICAL] جميع النماذج الاحتياطية غير متاحة حالياً. يرجى المحاولة لاحقاً.")

if __name__ == "__main__":
    orchestrator = AIOrchestrator()
    if len(sys.argv) > 1:
        task = " ".join(sys.argv[1:])
        orchestrator.plan_and_execute(task)
    else:
        print("⚠️ يرجى إدخال مهمة. مثال: python tools/ai_orchestrator.py 'افحص البطارية'")
