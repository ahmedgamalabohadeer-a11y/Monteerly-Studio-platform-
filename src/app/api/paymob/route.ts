import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // محاكاة استجابة Paymob
  return NextResponse.json({ 
    token: "paymob_token_" + Math.random().toString(36).substring(7),
    merchant_order_id: Math.floor(Math.random() * 1000000)
  });
}
