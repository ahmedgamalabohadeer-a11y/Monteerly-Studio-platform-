import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  
  // التأكد من وجود المفاتيح
  if (!url || !key) {
    return NextResponse.json({ 
      status: 'error', 
      message: '❌ المفاتيح غير موجودة. تأكد من حفظ ملف .env.local بشكل صحيح.' 
    });
  }

  try {
    const supabase = createClient(url, key);
    
    // إرسال طلب وهمي للقاعدة لاختبار الاستجابة
    const { data, error } = await supabase.from('users').select('id').limit(1);

    // الخطأ 42P01 يعني أن الجدول غير موجود بعد، وهو ما يؤكد أن الاتصال بالخادم ناجح 100%!
    if (error && error.code !== '42P01') {
      return NextResponse.json({ status: 'error', message: `❌ فشل الاتصال: ${error.message}` });
    }
    
    return NextResponse.json({ 
      status: 'success', 
      message: '✅ العقل المدبر متصل بنجاح! الخادم مستعد لاستقبال الجداول.' 
    });

  } catch (err: any) {
    return NextResponse.json({ status: 'error', message: err.message });
  }
}
