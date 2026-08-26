import { NextResponse } from 'next/server';
import { withAuthGuard } from '@/lib/security/apiGuard';

type LegalDraftRequest = {
  type: 'nda' | 'service';
  clientName: string;
  value: number;
  date: string;
};

type GeminiResponse = {
  error?: { message?: string };
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
};

function parseLegalDraftRequest(value: unknown): LegalDraftRequest | null {
  if (!value || typeof value !== 'object') return null;

  const input = value as Record<string, unknown>;
  const contractValue = Number(input.value);

  if (
    (input.type !== 'nda' && input.type !== 'service') ||
    typeof input.clientName !== 'string' ||
    !input.clientName.trim() ||
    input.clientName.length > 160 ||
    !Number.isFinite(contractValue) ||
    contractValue <= 0 ||
    contractValue > 1_000_000_000 ||
    typeof input.date !== 'string' ||
    !Number.isFinite(Date.parse(input.date))
  ) {
    return null;
  }

  return {
    type: input.type,
    clientName: input.clientName.trim(),
    value: contractValue,
    date: input.date,
  };
}

export async function POST(req: Request) {
  return withAuthGuard(req, async (guardedRequest) => {
    try {
      const input = parseLegalDraftRequest(await guardedRequest.json());
      if (!input) {
        return NextResponse.json({ error: 'بيانات العقد غير صالحة.' }, { status: 400 });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return NextResponse.json({ error: 'خدمة الصياغة غير مهيأة.' }, { status: 503 });
      }

      const typeAr =
        input.type === 'nda'
          ? 'اتفاقية عدم إفشاء أسرار (NDA)'
          : 'اتفاقية تقديم خدمات إنتاج فني';
      const prompt = `أنت وكيل قانوني محترف لشركة "مونتيرلي" (Monteerly Studio).
قم بصياغة عقد قانوني باللغة العربية من نوع: ${typeAr}.
الطرف الأول (مقدم الخدمة): شركة مونتيرلي.
الطرف الثاني (العميل): ${input.clientName}.
قيمة العقد: ${input.value} دولار.
تاريخ التسليم المتوقع: ${input.date}.
شروط الصياغة:
1. استخدم لغة قانونية صارمة ودقيقة.
2. قسم العقد إلى بنود مرقمة.
3. لا تكتب مقدمات ترحيبية، أعد نص العقد فقط ليكون جاهزاً للطباعة والتوقيع.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.2 },
          }),
        }
      );

      const data = (await response.json()) as GeminiResponse;
      if (!response.ok) {
        console.error('Gemini legal draft failed:', data.error?.message ?? response.statusText);
        return NextResponse.json({ error: 'تعذر توليد مسودة العقد.' }, { status: 502 });
      }

      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      return NextResponse.json({
        draft: text || '⚠️ استجاب المحرك بنجاح ولكنه لم يُعد أي نص.',
      });
    } catch (error) {
      console.error('Legal draft route failed:', error);
      return NextResponse.json({ error: 'حدث خطأ داخلي في خادم المنصة.' }, { status: 500 });
    }
  });
}
