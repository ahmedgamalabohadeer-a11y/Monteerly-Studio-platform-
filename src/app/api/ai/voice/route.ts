import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { text, voiceId } = await req.json();
    const apiKey = process.env.ELEVENLABS_API_KEY;
    let useFallback = false;

    // 1. محاولة استخدام ElevenLabs إذا كان المفتاح موجوداً
    if (apiKey) {
      const targetVoice = voiceId || '21m00Tcm4TlvDq8ikWAM';
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${targetVoice}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: { stability: 0.5, similarity_boost: 0.75 }
        })
      });

      if (response.ok) {
        const audioBuffer = await response.arrayBuffer();
        const base64Audio = Buffer.from(audioBuffer).toString('base64');
        return NextResponse.json({ audioUrl: `data:audio/mpeg;base64,${base64Audio}` }, { status: 200 });
      } else {
        console.warn('ElevenLabs Failed/Blocked. Switching to Free Cloud TTS.');
        useFallback = true;
      }
    } else {
      useFallback = true;
    }

    // 2. محرك الطوارئ السحابي المجاني (يدعم العربية 100% ولا يعتمد على كمبيوتر المستخدم)
    if (useFallback) {
      // تقسيم النص إلى مقاطع قصيرة (200 حرف) لتجاوز قيود الـ API المجاني
      const chunks = text.match(/[\s\S]{1,200}(?!\S)/g) || [text];
      const audioBuffers = [];

      for (const chunk of chunks) {
        const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=ar&q=${encodeURIComponent(chunk.trim())}`;
        const res = await fetch(url);
        
        if (res.ok) {
          const arrayBuffer = await res.arrayBuffer();
          audioBuffers.push(Buffer.from(arrayBuffer));
        }
      }

      if (audioBuffers.length === 0) {
         throw new Error('فشل المولد السحابي المجاني في جلب الصوت.');
      }

      // دمج جميع المقاطع الصوتية في ملف واحد متصل
      const finalBuffer = Buffer.concat(audioBuffers);
      const base64Audio = finalBuffer.toString('base64');

      return NextResponse.json({ 
          audioUrl: `data:audio/mpeg;base64,${base64Audio}`,
          message: 'تم استخدام المولد السحابي المجاني (عربي) بنجاح.'
      }, { status: 200 });
    }

  } catch (error: any) {
    console.error('Voice Generation Network Error:', error);
    return NextResponse.json({ error: error.message || 'تعذر توليد الصوت من جميع الخوادم المتاحة.' }, { status: 500 });
  }
}
