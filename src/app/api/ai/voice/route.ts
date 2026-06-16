import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { data: auth } = await supabase.auth.getUser();
    if (!auth?.user) {
      console.warn('محاولة وصول غير مصرح بها لمسار Voice');
      return NextResponse.json({ error: 'غير مصرح: الوصول لترسانة الذكاء الاصطناعي يتطلب تسجيلاً سيادياً' }, { status: 401 });
    }

    const { text, voiceId } = await req.json();
    const apiKey = process.env.ELEVENLABS_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'مفتاح ElevenLabs مفقود. يرجى إضافته في الخزنة السرية (.env)' }, { status: 500 });
    }

    const targetVoice = voiceId || '21m00Tcm4TlvDq8ikWAM';

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${targetVoice}`, {
      method: 'POST',
      headers: {
        Accept: 'audio/mpeg',
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: { stability: 0.5, similarity_boost: 0.75 }
      })
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.detail?.message || 'فشل الاتصال بخوادم توليد الصوت');
    }

    const audioBuffer = await response.arrayBuffer();
    const base64Audio = Buffer.from(audioBuffer).toString('base64');
    const audioDataUrl = `data:audio/mpeg;base64,${base64Audio}`;

    return NextResponse.json({ audioUrl: audioDataUrl }, { status: 200 });
  } catch (error: unknown) {
    console.error('Voice Generation Error:', error);
    const message = error instanceof Error ? error.message : 'حدث خطأ أثناء معالجة التوأم الرقمي';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
