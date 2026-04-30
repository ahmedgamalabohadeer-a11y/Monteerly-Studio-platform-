import os
import sys
import json
import requests
import subprocess
from dotenv import load_dotenv

# تحميل المفاتيح
load_dotenv('.env.local')
load_dotenv('.env')

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
# تم التحديث: استخدام نموذج gemini-2.5-flash للأتمتة اللحظية
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={GEMINI_API_KEY}"

class AIOrchestrator:
    def __init__(self):
        if not GEMINI_API_KEY:
            print("🚨 [CRITICAL] مفتاح GEMINI_API_KEY مفقود في ملف .env")
            sys.exit(1)
        self.system_prompt = """
        أنت عقل Monteerly AI OS v4.0. مهمتك هي تحويل طلبات المدير التنفيذي إلى أوامر Bash أو Termux:API صالحة للتنفيذ.
        ردك يجب أن يكون حصرياً بصيغة JSON بالتنسيق التالي:
        {
            "thought": "تفكيرك المنطقي حول المهمة",
            "command": "أمر الـ bash أو termux-api المراد تنفيذه"
        }
        لا تكتب أي نص خارج الـ JSON ولا تستخدم علامات markdown (مثل ```json).
        """

    def plan_and_execute(self, task_description):
        print(f"🧠 [Orchestrator] جاري تحليل المهمة: {task_description}")
        
        payload = {
            "contents": [{
                "parts": [{"text": f"{self.system_prompt}\n\nTask: {task_description}"}]
            }]
        }
        
        try:
            # 1. التفكير الاستدلالي عبر Gemini 2.5 Flash
            response = requests.post(GEMINI_URL, json=payload, headers={'Content-Type': 'application/json'})
            response.raise_for_status()
            result = response.json()
            
            raw_text = result['candidates'][0]['content']['parts'][0]['text']
            
            # تنظيف إضافي لضمان عمل JSON.loads
            raw_text = raw_text.replace('```json', '').replace('```', '').strip()
            
            try:
                action_plan = json.loads(raw_text)
            except json.JSONDecodeError as e:
                print(f"🚨 خطأ في تحليل JSON: {e}\nالنص المُستلم: {raw_text}")
                return

            print(f"💡 [Planner Agent]: {action_plan['thought']}")
            command = action_plan['command']
            print(f"⚙️ [Agent Ultra] جاري التنفيذ: {command}")
            
            # 2. التنفيذ الميكانيكي عبر Agent Ultra
            exec_result = subprocess.run(command, shell=True, capture_output=True, text=True)
            
            if exec_result.returncode == 0:
                print(f"✅ [Success]:\n{exec_result.stdout.strip()}")
            else:
                print(f"❌ [Error]:\n{exec_result.stderr.strip()}")
                
        except requests.exceptions.HTTPError as http_err:
            print(f"🚨 [API Error] خطأ في الاتصال بالنموذج: {http_err.response.text}")
        except Exception as e:
            print(f"🚨 [System Failure] فشل غير متوقع: {str(e)}")

if __name__ == "__main__":
    orchestrator = AIOrchestrator()
    if len(sys.argv) > 1:
        task = " ".join(sys.argv[1:])
        orchestrator.plan_and_execute(task)
    else:
        print("⚠️ يرجى إدخال مهمة. مثال: python tools/ai_orchestrator.py 'أوجد مساحة الذاكرة المتاحة في السيرفر'")
