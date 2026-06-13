import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // محاولة جلب أول سجل من جدول الموظفين لاختبار الاتصال
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
    return NextResponse.json({ 
      status: '❌ Connection Failed', 
      message: error.message 
    }, { status: 500 });
  }
}
