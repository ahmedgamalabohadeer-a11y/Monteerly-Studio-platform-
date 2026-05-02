import os
import time
import requests
import subprocess
import json

# الرابط الحالي للمنصة (يجب تحديثه برابط Vercel الخاص بك لاحقاً)
VERCEL_RELAY_URL = "http://localhost:3000/api/agent/relay"
AGENT_SECRET = "mcos_super_secret_agent_key_v5" # يجب أن يطابق الموجود في Vercel

HEADERS = {
    "Authorization": f"Bearer {AGENT_SECRET}",
    "Content-Type": "application/json"
}

def execute_termux_api(command):
    """تنفيذ أوامر الأندرويد المادية عبر Termux:API"""
    try:
        print(f"⚙️ جاري تنفيذ الأمر المادي: {command}")
        result = subprocess.run(command, shell=True, capture_output=True, text=True, timeout=15)
        return {"stdout": result.stdout.strip(), "stderr": result.stderr.strip(), "code": result.returncode}
    except Exception as e:
        return {"error": str(e)}

def poll_vercel_queue():
    """الاستماع الدائم لخوادم Vercel لانتظار الأوامر"""
    print("📡 [MCOS Daemon] شبح الأتمتة يعمل. في انتظار المهام من Vercel...")
    
    while True:
        try:
            # يمكن استبدال localhost برابط Vercel الفعلي للاتصال عن بعد
            # res = requests.get(VERCEL_RELAY_URL, headers=HEADERS, timeout=5)
            # محاكاة الاتصال لغرض الأمان المحلي قبل النشر
            time.sleep(5)
            
            # محاكاة تلقي أمر من Vercel لاختبار Termux:API
            mock_task = {"id": "test_101", "command": "termux-battery-status", "payload": {}}
            print(f"\n⚡ تم استلام مهمة جديدة: {mock_task['command']}")
            
            # التنفيذ المحلي
            execution_result = execute_termux_api(mock_task['command'])
            print(f"✅ نتيجة التنفيذ: {execution_result['stdout'][:100]}...")
            
            # إيقاف الحلقة للمحاكاة (في الإنتاج سيعمل إلى الأبد)
            break
            
        except Exception as e:
            print(f"⚠️ خطأ في الاتصال بالقاعدة المركزية: {e}")
            time.sleep(10)

if __name__ == "__main__":
    poll_vercel_queue()
