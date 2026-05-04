import { createClient } from '@supabase/supabase-js';

// استخدام مفتاح Service Role لتخطي صلاحيات RLS في العمليات الخلفية (Backend Only)
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);
