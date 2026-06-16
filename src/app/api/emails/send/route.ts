import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import EscrowNotification from '@/emails/EscrowNotification';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { to_email, clientName, projectId, amount } = await req.json();

    if (!to_email) throw new Error("البريد الإلكتروني للعميل مفقود.");

    const data = await resend.emails.send({
      from: 'Monteerly Studio <notifications@monteerly.com>', // سيتم تغييره لاحقاً لبريدك الموثق
      to: [to_email],
      subject: `تأكيد إيداع الضمان لمشروع ${projectId} 🛡️`,
      react: EscrowNotification({ clientName, projectId, amount }),
    });

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Email API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
