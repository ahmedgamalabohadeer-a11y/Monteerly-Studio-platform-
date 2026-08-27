import { NextResponse } from 'next/server';
import { withAuthGuard } from '@/lib/security/apiGuard';

export async function POST(req: Request) {
  return withAuthGuard(req, async () =>
    NextResponse.json(
      {
        safe: false,
        message:
          'فحص الصور غير متاح حتى يتم ربط محرك تحليل حقيقي؛ لا تُصدر المنصة نتيجة أمان عشوائية.',
      },
      { status: 503 }
    )
  );
}
