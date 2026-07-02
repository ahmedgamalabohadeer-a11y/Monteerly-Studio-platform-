import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import DeliveryNotification from '@/emails/DeliveryNotification';

const resend = new Resend(process.env.RESEND_API_KEY);

type DeliveryEmailRequest = {
  to_email: string;
  clientName: string;
  projectId: string;
  projectTitle: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<DeliveryEmailRequest>;

    const toEmail = body.to_email;
    const clientName = body.clientName;
    const projectId = body.projectId;
    const projectTitle = body.projectTitle;

    if (
      typeof toEmail !== 'string' ||
      typeof clientName !== 'string' ||
      typeof projectId !== 'string' ||
      typeof projectTitle !== 'string' ||
      !toEmail.trim() ||
      !clientName.trim() ||
      !projectId.trim() ||
      !projectTitle.trim()
    ) {
      return NextResponse.json(
        { error: 'بيانات البريد غير صالحة' },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: 'Monteerly Studio <notifications@monteerly.com>',
      to: [toEmail],
      subject: `تسليم مشروع: ${projectTitle} 🚀`,
      react: DeliveryNotification({
        clientName,
        projectId,
        projectTitle,
      }),
    });

    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'حدث خطأ غير متوقع';

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
