import { randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import { resolveDispute } from '@/lib/disputes';
import { withAuthGuard } from '@/lib/security/apiGuard';

type DecisionType = 'client' | 'freelancer';

type ResolveDisputeRequest = {
  disputeId: string;
  decision: string;
};

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'حدث خطأ غير متوقع';
}

export async function POST(req: Request) {
  return withAuthGuard(
    req,
    async (request) => {
      try {
        const { disputeId, decision } =
          (await request.json()) as Partial<ResolveDisputeRequest>;

        if (typeof disputeId !== 'string' || disputeId.trim().length === 0) {
          return NextResponse.json({ error: 'معرّف النزاع غير صالح' }, { status: 400 });
        }

        if (decision !== 'client' && decision !== 'freelancer') {
          return NextResponse.json(
            { error: 'قيمة القرار غير صالحة. يجب أن تكون client أو freelancer' },
            { status: 400 }
          );
        }

        await resolveDispute(disputeId, decision as DecisionType);

        return NextResponse.json({
          success: true,
          data: { resolution: decision, auditId: randomUUID() },
        });
      } catch (error: unknown) {
        return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
      }
    },
    ['admin', 'executive']
  );
}
