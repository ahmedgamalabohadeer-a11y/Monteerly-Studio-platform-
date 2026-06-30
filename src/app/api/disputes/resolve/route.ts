import { NextResponse } from 'next/server';
import { resolveDispute } from '@/lib/disputes';

type DecisionType = 'client' | 'freelancer';

type ResolveDisputeRequest = {
  disputeId: string;
  decision: string; // نستقبلها كنص عام أولاً من الواجهة
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

    // 1. التحقق من الصلاحيات
    if (adminId !== 'ADMIN_MASTER') {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 403 });
    }

    // 2. التحقق من صحة قيمة القرار (Runtime Validation)
    if (decision !== 'client' && decision !== 'freelancer') {
      return NextResponse.json({ error: 'قيمة القرار غير صالحة. يجب أن تكون client أو freelancer' }, { status: 400 });
    }

    // 3. التنفيذ بعد التأكد من نوع البيانات
    await resolveDispute(disputeId, decision as DecisionType);

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
