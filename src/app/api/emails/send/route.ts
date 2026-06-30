import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import EscrowNotification from '@/emails/EscrowNotification';

const resend = new Resend(process.env.RESEND_API_KEY);

type SendEscrowEmailBody = {
  to_email?: string;
  clientName?: string;
  projectId?: string;
  amount?: number | string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as SendEscrowEmailBody;
    const { to_email, clientName, projectId, amount } = body;

    if (!to_email || typeof to_email !== 'string') {
      throw new Error('البريد الإلكتروني للعميل مفقود أو غير صالح.');
    }

    if (!clientName || typeof clientName !== 'string') {
      throw new Error('اسم العميل مفقود أو غير صالح.');
    }

    if (!projectId || typeof projectId !== 'string') {
      throw new Error('معرّف المشروع مفقود أو غير صالح.');
    }

    if (amount === undefined || amount === null || amount === '') {
      throw new Error('قيمة مبلغ الضمان مفقودة.');
    }

    // التحويل الصارم لنوع البيانات إلى رقم
    const numericAmount = Number(amount);
    if (isNaN(numericAmount)) {
      throw new Error('قيمة مبلغ الضمان يجب أن تكون رقماً صحيحاً.');
    }

    const data = await resend.emails.send({
      from: 'Monteerly Studio <notifications@monteerly.com>',
      to: [to_email],
      subject: `تأكيد إيداع الضمان لمشروع ${projectId} 🛡️`,
      react: EscrowNotification({ clientName, projectId, amount: numericAmount }),
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    console.error('Email API Error:', error);
    const message = error instanceof Error ? error.message : 'حدث خطأ غير متوقع أثناء إرسال البريد الإلكتروني';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
