import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, amount, method } = body;

    // 1. التحقق من الرصيد (Firestore Syntax)
    const walletRef = doc(db, "wallets", userId);
    const walletSnap = await getDoc(walletRef);
    
    // إذا لم تكن المحفظة موجودة نفترض الرصيد 0
    const currentBalance = walletSnap.exists() ? walletSnap.data().balance : 0;

    if (currentBalance < amount) {
      return NextResponse.json({ error: 'Insufficient funds' }, { status: 400 });
    }

    // 2. تسجيل طلب السحب
    await addDoc(collection(db, "withdrawals"), {
      userId,
      amount,
      method,
      status: 'pending',
      createdAt: new Date().toISOString()
    });

    // 3. خصم المبلغ (تحديث الوثيقة)
    if (walletSnap.exists()) {
        await updateDoc(walletRef, {
            balance: currentBalance - amount,
            pending: (walletSnap.data().pending || 0) + amount
        });
    }

    return NextResponse.json({ success: true, message: 'Withdrawal requested' });
  } catch (error) {
    return NextResponse.json({ error: 'Withdrawal Failed' }, { status: 500 });
  }
}
