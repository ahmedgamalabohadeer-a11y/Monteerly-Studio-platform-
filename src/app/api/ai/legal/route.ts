import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    // 1. جدار الحماية (Auth Guard)
    const { data: auth } = await supabase.auth.getUser();
    if (!auth?.user) {
      return NextResponse.json({ draft: '❌ خطأ: غير مصرح بالوصول. يرجى تسجيل الدخول.' });
    }

    const { type, clientName, value, date } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ draft: '❌ خطأ: مفتاح GEMINI_API_KEY مفقود من ملف .env.local' });
    }

    const typeAr = type === 'nda' ? 'اتفاقية عدم إفشاء أسرار (NDA)' : 'اتفاقية تقديم خدمات إنتاج فني';
    const prompt = `أنت وكيل قانوني محترف لشركة "مونتيرلي" (Monteerly Studio).
قم بصياغة عقد قانوني باللغة العربية من نوع: ${typeAr}.
الطرف الأول (مقدم الخدمة): شركة مونتيرلي.
الطرف الثاني (العميل): ${clientName}.
قيمة العقد: ${value} دولار.
تاريخ التسليم المتوقع: ${date}.
شروط الصياغة:
1. استخدم لغة قانونية صارمة ودقيقة.
2. قسم العقد إلى بنود مرقمة.
3. لا تكتب مقدمات ترحيبية، أعد نص العقد فقط ليكون جاهزاً للطباعة والتوقيع.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.2 }
      })
    });

    const data = await response.json();
    if (!response.ok) {
       return NextResponse.json({ draft: `⚠️ رفض محرك جوجل (Gemini) تنفيذ الطلب.\n\nالسبب:\n${data.error?.message || JSON.stringify(data)}` });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return NextResponse.json({ draft: text || '⚠️ استجاب المحرك بنجاح ولكنه لم يُعد أي نص.' });
  } catch (error: any) {
    return NextResponse.json({ draft: `⚠️ حدث خطأ داخلي في خادم المنصة:\n${error.message}` });
  }
}
