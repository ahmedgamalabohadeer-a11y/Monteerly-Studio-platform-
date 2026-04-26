import { createClient } from '@supabase/supabase-js';

// جلب المتغيرات البيئية (السرية)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// إنشاء وتصدير الجسر السيادي للتواصل مع قاعدة البيانات
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  global: {
    headers: { 'x-application-name': 'monteerly-corporate-os' },
  },
});
