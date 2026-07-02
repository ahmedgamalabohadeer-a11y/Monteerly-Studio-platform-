import { NextResponse } from 'next/server';

type GeminiRequestBody = {
  prompt: string;
  type?: 'voice_script' | 'security_audit' | 'storyboard' | string;
};

type GeminiErrorResponse = {
  error?: {
    message?: string;
  };
};

type GeminiSuccessResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<GeminiRequestBody>;
    const prompt = body.prompt;
    const type = body.type;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'مفتاح Gemini API مفقود في الخزنة السرية' },
        { status: 500 }
      );
    }

    if (typeof prompt !== 'string' || !prompt.trim()) {
      return NextResponse.json(
        { error: 'النص المرسل إلى Gemini غير صالح' },
        { status: 400 }
      );
    }

    let systemInstruction = '';

    if (type === 'voice_script') {
      systemInstruction =
        'أنت مساعد إخراج سينمائي. قم بتحويل هذه الفكرة إلى سكريبت صوتي (Voice-Over) احترافي، مقسم إلى فقرات قصيرة مع تحديد نبرة الصوت والمشاعر لكل فقرة.';
    } else if (type === 'security_audit') {
      systemInstruction =
        'أنت حارس أمني ذكي (AI Guardian) لمنصة عمل حر. دورك حماية المنصة من التسريب. حلل النص واكتشف أي محاولة لمشاركة أرقام تواصل، روابط خارجية، أو اتفاق مالي خارج المنصة. استجب بصيغة JSON فقط: {"isBlocked": true/false, "reason": "السبب باختصار"}';
    } else {
      systemInstruction =
        'أنت مساعد مخرج. استخرج أفكاراً لمشاهد بصرية (Storyboard) بناءً على هذا النص.';
    }

    const payload = {
      contents: [
        {
          parts: [{ text: `${systemInstruction}\n\nالنص: ${prompt}` }],
        },
      ],
    };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

    const data = (await response.json()) as
      | GeminiErrorResponse
      | GeminiSuccessResponse;

    if ('error' in data && data.error?.message) {
      throw new Error(data.error.message);
    }

    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      throw new Error('لم يتم إرجاع نص صالح من Gemini');
    }

    return NextResponse.json({ result: generatedText }, { status: 200 });
  } catch (error: unknown) {
    console.error('Gemini API Error:', error);

    const message =
      error instanceof Error
        ? error.message
        : 'فشل الاتصال بمحرك الذكاء الاصطناعي';

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
