# 🤖 Monteerly Agent Architecture (Cloud-Orchestrated)

## 1. The Termux Paradox Solution
يُمنع منعاً باتاً تشغيل نماذج لغوية ضخمة (LLMs) أو أدوات OCR محلياً على هاتف (Termux) لتجنب الانهيار الحراري.

## 2. The MCP Protocol Architecture
- **Termux (The CLI Control Room)**: يعمل كواجهة توجيه أوامر فقط.
- **Cloudflare Workers AI / Supabase Edge**: العضلات الحقيقية. عند كتابة أمر في Termux (مثال: `agent analyze-contract X`)، يرسل Termux طلب API خفيف للسحابة. السحابة تقوم بالتحليل وتُرجع النص في ثوانٍ.
- **Orchestrator Agent**: وكيل خلفي يراقب `audit_logs` ويرسل تنبيهات لـ Termux عند حدوث عمليات مالية عالية المخاطر.
