import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // محاولة جلب أول سجل لاختبار الاتصال
    const { data, error } = await supabase.from('employees').select('*').limit(1);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      status: '✅ Connected Successfully',
      database: 'Supabase PostgreSQL',
      environment: process.env.NODE_ENV,
      testData: data
    }, { status: 200 });

  } catch (error: unknown) {
    // معالجة الخطأ بشكل آمن
    const errorMessage = error instanceof Error ? error.message : 'حدث خطأ غير معروف في قاعدة البيانات';
    
    return NextResponse.json({
      status: '❌ Connection Failed',
      message: errorMessage
    }, { status: 500 });
  }
}
