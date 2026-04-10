import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { collection, addDoc } from 'firebase/firestore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, planId, userId } = body;

    // محاكاة إنشاء جلسة Stripe (لأننا لا نملك مفتاح سري حقيقي هنا)
    const session = {
      id: "cs_test_" + Math.random().toString(36).substring(7),
      url: "https://checkout.stripe.com/pay/cs_test_..."
    };

    // حفظ العملية في Firestore بالطريقة الصحيحة (ليس SQL)
    await addDoc(collection(db, "transactions"), {
      userId,
      amount,
      planId,
      stripeSessionId: session.id,
      status: 'pending',
      createdAt: new Date().toISOString()
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Stripe Checkout Failed' }, { status: 500 });
  }
}
