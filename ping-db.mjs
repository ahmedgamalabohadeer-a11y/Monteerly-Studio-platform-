import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

// قراءة المفاتيح يدوياً من الجذور
const envFile = fs.readFileSync('.env.local', 'utf8');
let url = '', key = '';

envFile.split('\n').forEach(line => {
  if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) url = line.substring(line.indexOf('=') + 1).trim();
  if (line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) key = line.substring(line.indexOf('=') + 1).trim();
});

console.log('=======================================');
console.log('🛡️ فحص السيادة: بوابة الاتصال المركزية');
console.log('=======================================');

if (!url || !key || key.includes('ضع_المفتاح')) {
  console.error('❌ خطأ تنفيذي: المفاتيح غير صحيحة أو لم يتم إدخالها في .env.local!');
  process.exit(1);
}

const supabase = createClient(url, key);

async function ping() {
  console.log('⏳ جاري إرسال حزم البيانات إلى خوادم Supabase...');
  try {
    const { data, error } = await supabase.from('users').select('id').limit(1);
    
    // الخطأ 42P01 يعني أن الجدول غير موجود، لكن الخادم رد علينا!
    if (error && error.code !== '42P01') {
      console.error('\n❌ فشل الاتصال بقاعدة البيانات. السبب:');
      console.error(error.message);
    } else {
      console.log('\n✅ نجاح مبهر! العقل المدبر (Supabase) متصل ويستجيب بنجاح 100%.');
      console.log('🚀 المنصة الآن جاهزة لاستقبال الدستور المعماري (Master Schema).');
    }
  } catch (err) {
    console.error('\n❌ حدث خطأ غير متوقع:', err.message);
  }
}

ping();
