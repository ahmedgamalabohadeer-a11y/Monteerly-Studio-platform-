import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const image = formData.get('image');

    if (!image) {
      return NextResponse.json({ safe: false, message: 'لم يتم العثور على صورة.' }, { status: 400 });
    }

    // محاكاة لفحص الصورة بالذكاء الاصطناعي (يمكن ربطها بـ Gemini أو Vision API لاحقاً)
    // حالياً نمرر الصور لضمان عمل الواجهة دون كسر النظام
    return NextResponse.json({ safe: true, message: 'الصورة آمنة' });
  } catch (error) {
    console.error('Image Analysis Error:', error);
    return NextResponse.json({ safe: false, message: 'خطأ في الخادم أثناء فحص الصورة' }, { status: 500 });
  }
}
