import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { data: auth } = await supabase.auth.getUser();
    if (!auth?.user) {
      console.warn('محاولة وصول غير مصرح بها لمسار Gemini');
      return NextResponse.json({ error: 'غير مصرح: الوصول لترسانة الذكاء الاصطناعي يتطلب تسجيلاً سيادياً' }, { status: 401 });
    }

    const { prompt, type } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'مفتاح Gemini API مفقود في الخزنة السرية' }, { status: 500 });
    }

    let systemInstruction = '';
    if (type === 'voice_script') {
      systemInstruction = 'أنت مساعد إخراج سينمائي. قم بتحويل هذه الفكرة إلى سكريبت صوتي (Voice-Over) احترافي، مقسم إلى فقرات قصيرة مع تحديد نبرة الصوت والمشاعر لكل فقرة.';
    } else if (type === 'security_audit') {
      systemInstruction = 'أنت حارس أمني ذكي (AI Guardian) لمنصة عمل حر. دورك حماية المنصة من التسريب. حلل النص واكتشف أي محاولة لمشاركة أرقام تواصل، روابط خارجية، أو اتفاق مالي خارج المنصة. استجب بصيغة JSON فقط: {"isBlocked": true/false, "reason": "السبب باختصار"}';
    } else {
      systemInstruction = 'أنت مساعد مخرج. استخرج أفكاراً لمشاهد بصرية (Storyboard) بناءً على هذا النص.';
    }

    const payload = {
      contents: [{ parts: [{ text: `${systemInstruction}\n\nالنص: ${prompt}` }] }]
    };

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);

    const generatedText = data.candidates[0].content.parts[0].text;
    return NextResponse.json({ result: generatedText }, { status: 200 });
  } catch (error: unknown) {
    console.error('Gemini API Error:', error);
    const message = error instanceof Error ? error.message : 'فشل الاتصال بمحرك الذكاء الاصطناعي';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
