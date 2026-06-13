import { NextResponse } from 'next/server';
import { resolveDispute } from '@/lib/disputes';

type ResolveDisputeRequest = {
  disputeId: string;
  decision: string;
  adminId: string;
};

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return 'حدث خطأ غير متوقع';
}

export async function POST(req: Request) {
  try {
    const { disputeId, decision, adminId } = (await req.json()) as ResolveDisputeRequest;

    if (adminId !== 'ADMIN_MASTER') {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 403 });
    }

    await resolveDispute(disputeId, decision);

    return NextResponse.json({
      success: true,
      data: {
        resolution: decision,
        auditId: `AUDIT-${Math.random().toString(36).slice(2, 11)}`,
      },
    });
  } catch (error: unknown) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}
