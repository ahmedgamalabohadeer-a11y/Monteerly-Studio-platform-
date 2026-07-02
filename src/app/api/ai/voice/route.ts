import { NextResponse } from 'next/server';

type VoiceRequestBody = {
  text: string;
  voiceId?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<VoiceRequestBody>;
    const text = body.text;
    const voiceId = body.voiceId;

    if (typeof text !== 'string' || !text.trim()) {
      return NextResponse.json(
        { error: 'النص المطلوب لتحويله إلى صوت غير صالح.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.ELEVENLABS_API_KEY;
    let useFallback = false;

    if (apiKey) {
      const targetVoice =
        typeof voiceId === 'string' && voiceId.trim()
          ? voiceId
          : '21m00Tcm4TlvDq8ikWAM';

      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${targetVoice}`,
        {
          method: 'POST',
          headers: {
            Accept: 'audio/mpeg',
            'xi-api-key': apiKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text,
            model_id: 'eleven_multilingual_v2',
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75,
            },
          }),
        }
      );

      if (response.ok) {
        const audioBuffer = await response.arrayBuffer();
        const base64Audio = Buffer.from(audioBuffer).toString('base64');

        return NextResponse.json(
          { audioUrl: `data:audio/mpeg;base64,${base64Audio}` },
          { status: 200 }
        );
      }

      console.warn('ElevenLabs Failed/Blocked. Switching to Free Cloud TTS.');
      useFallback = true;
    } else {
      useFallback = true;
    }

    if (useFallback) {
      const chunks = text.match(/[\s\S]{1,200}(?!\S)/g) || [text];
      const audioBuffers: Buffer[] = [];

      for (const chunk of chunks) {
        const normalizedChunk = chunk.trim();

        if (!normalizedChunk) {
          continue;
        }

        const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=ar&q=${encodeURIComponent(
          normalizedChunk
        )}`;

        const res = await fetch(url);

        if (res.ok) {
          const arrayBuffer = await res.arrayBuffer();
          audioBuffers.push(Buffer.from(arrayBuffer));
        }
      }

      if (audioBuffers.length === 0) {
        throw new Error('فشل المولد السحابي المجاني في جلب الصوت.');
      }

      const finalBuffer = Buffer.concat(audioBuffers);
      const base64Audio = finalBuffer.toString('base64');

      return NextResponse.json(
        {
          audioUrl: `data:audio/mpeg;base64,${base64Audio}`,
          message: 'تم استخدام المولد السحابي المجاني (عربي) بنجاح.',
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: 'تعذر توليد الصوت من جميع الخوادم المتاحة.' },
      { status: 500 }
    );
  } catch (error: unknown) {
    console.error('Voice Generation Network Error:', error);

    const message =
      error instanceof Error
        ? error.message
        : 'تعذر توليد الصوت من جميع الخوادم المتاحة.';

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
