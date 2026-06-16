import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import DeliveryNotification from '@/emails/DeliveryNotification';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { to_email, clientName, projectId, projectTitle } = await req.json();

    const data = await resend.emails.send({
      from: 'Monteerly Studio <notifications@monteerly.com>',
      to: [to_email],
      subject: `تسليم مشروع: ${projectTitle} 🚀`,
      react: DeliveryNotification({ clientName, projectId, projectTitle }),
    });

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
