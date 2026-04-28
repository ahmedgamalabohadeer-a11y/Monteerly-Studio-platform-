# Feature: Authentication & User Profiles (F-010)

<metadata>
- Feature ID: F-010
- Status: Completed
- Owner: Core OS Engine
- Depends on: F-008 (Enterprise Design)
</metadata>

## 1. Objective
تأمين المنصة وتحويلها لـ Open SaaS من خلال دمج نظام المصادقة الخاص بـ Supabase، إنشاء ملفات تعريف المستخدمين (Profiles)، وتأمينها بقواعد (RLS).

## 2. Implementation Details
- **Database**:
  - `profiles` table linked to `auth.users`.
  - Database trigger `handle_new_user` for auto-profile creation.
  - Row Level Security (RLS) enabled.
- **Backend (actions.ts)**:
  - `signUpUser`: يسجل المستخدم، يضيف الدور (Role)، ويوثق ذلك في `audit_logs`.
  - `signInUser`: يتحقق من الهوية، يوجه لغرفة العمليات، ويسجل الدخول في `audit_logs`.
- **Frontend (page.tsx)**:
  - واجهة حديثة (Bento-inspired) تتيح التبديل السلس بين التسجيل والدخول، واختيار نوع الحساب (Client, Editor, Videographer, Studio).
