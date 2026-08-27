import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    {
      error:
        'Paymob webhook is disabled until provider signature verification and idempotent server-side settlement are implemented.',
    },
    { status: 503 }
  );
}
