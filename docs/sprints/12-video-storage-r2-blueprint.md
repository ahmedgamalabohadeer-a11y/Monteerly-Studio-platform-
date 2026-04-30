# Feature: R2 Media Storage & Guardian AI Encryption (F-012)

## 1. Storage Bottleneck Solution
- **Provider**: الاعتماد على **Cloudflare R2** لتخزين مسودات ومشاريع الفيديو (Zero Egress Fees).
- **Upload Strategy**: توليد `Pre-signed URLs` في الخادم، ويقوم العميل بالرفع مباشرة من المتصفح إلى R2 لتخفيف الحمل عن Vercel/Next.js.
- **Client-Side Proxy**: استخدام `FFmpeg.wasm` لإنتاج نسخة 720p سريعة للمراجعة.

## 2. Encryption vs AI Solution
- تطبيق تشفير **AES-256 At-Rest** في قاعدة البيانات.
- يتم فك التشفير برمجياً (In-Memory) داخل Edge Functions لكي يتمكن `Guardian AI` من تحليل النصوص أو بيانات الفيديو بحثاً عن مخالفات، ثم تُمسح البيانات من الذاكرة الحية فوراً للحفاظ على الخصوصية.
