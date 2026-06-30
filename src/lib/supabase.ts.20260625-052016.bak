import { createClient } from '@supabase/supabase-js';

// جلب المفاتيح من متغيرات البيئة المحمية في Vercel
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("⚠️ تحذير إداري: مفاتيح Supabase غير متوفرة في بيئة التشغيل الحالية.");
}

// إنشاء وتصدير قناة الاتصال
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
