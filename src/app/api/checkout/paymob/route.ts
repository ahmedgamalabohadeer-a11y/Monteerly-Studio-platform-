import { NextResponse } from 'next/server';
import { withAuthGuard } from '@/lib/security/apiGuard';

export async function POST(req: Request) {
  return withAuthGuard(req, async () =>
    NextResponse.json(
      {
        error:
          'بوابة الدفع موقوفة أمنيًا حتى يصبح المبلغ مشتقًا من سجل خادمي موثوق وتُفعّل مصادقة webhook.',
      },
      { status: 503 }
    )
  );
}
