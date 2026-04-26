import { NextResponse } from 'next/server';

// قائمة كلمات محظورة أولية (يمكن توسيعها أو ربطها بـ AI لاحقاً)
const BLOCK_PATTERNS = [
  /badword/i,
  /spam/i,
  /احتيال/i,
  /كازينو/i,
  // أضف المزيد من أنماط Regex المعقدة هنا
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text } = body;

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    // التحقق من النص
    const hasViolation = BLOCK_PATTERNS.some((pattern) => pattern.test(text));

    if (hasViolation) {
      return NextResponse.json({ 
        safe: false, 
        message: 'تم اكتشاف محتوى غير ملائم.' 
      });
    }

    // هنا يمكن إضافة استدعاء لخدمة AI خارجية (OpenAI/Gemini) للتحليل العميق
    
    return NextResponse.json({ safe: true });
    
  } catch (error) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
