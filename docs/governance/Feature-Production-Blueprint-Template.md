# 📑 Feature / Agent Production Blueprint Template
<metadata>
- **Feature_ID**: [F-XXX]
- **Status**: [Draft / In-Review / Approved / Shipped]
- **Created_at**: [DATE]
- **Owner**: Ahmed Gamal
- **Sprint**: Sprint-XX
</metadata>

---

## 🎯 Section 0 – Feature Brief
- **Business Goal**: ما المشكلة الحقيقية التي تحلها هذه الميزة؟
- **Scope**: (MVP / Full Feature / Experiment)
- **Dependencies**: (Supabase, API, Components)

---

## 🔍 Section 1 – Read-Only Audit (Safety First)
### 1.1 Termux Reconnaissance Script
> فحص الملفات المتأثرة قبل كتابة أي كود.
```bash
cd ~/Monteerly-Studio-platform-
grep -R "KEYWORD" -n .

⚙️ Section 2 – Surgical Execution (Code & UI)
​2.1 Code Changes Plan
​New Files:
​Modified Files:
​2.2 UI/UX Constraints
​Bento Grid alignment.
​Responsive (Mobile -> Desktop).
​⚖️ Section 3 – Governance, Finance, Legal
​Compliance: هل تلمس الميزة بيانات حساسة؟
​Financial Impact: تقدير تكلفة الـ API أو الـ Serverless.
​Executive Decision: [Option A / B / C]
​🚀 Section 4 – Go-Live & Rollback
​Git Push Protocol: أوامر الرفع.
​Rollback Plan: سكربت التراجع الفوري في حال حدوث خطأ.
