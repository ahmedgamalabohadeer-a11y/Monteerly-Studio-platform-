import { NextResponse } from 'next/server';
import { RevenueEngine } from '@/lib/finance/RevenueEngine';
import { withAuthGuard } from '@/lib/security/apiGuard';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

type AuthenticatedUser = {
  id: string;
};

type SplitRequestBody = {
  amount: number;
  tier: string;
};

export async function POST(req: Request) {
  return withAuthGuard(req, async (request: Request, user: unknown) => {
    try {
      const body = (await request.json()) as Partial<SplitRequestBody>;
      const amount = Number(body.amount);
      const tier = body.tier;

      if (!Number.isFinite(amount) || amount <= 0) {
        return NextResponse.json({ error: 'مبلغ غير صالح' }, { status: 400 });
      }

      if (typeof tier !== 'string' || tier.trim().length === 0) {
        return NextResponse.json(
          { error: 'فئة التسعير غير صالحة' },
          { status: 400 }
        );
      }

      const breakdown = RevenueEngine.calculateSplit(amount, tier);

      const currentUser = user as AuthenticatedUser;

      if (!currentUser?.id) {
        return NextResponse.json(
          { error: 'بيانات المستخدم غير صالحة' },
          { status: 401 }
        );
      }

      const { error: auditError } = await supabaseAdmin
        .from('audit_logs')
        .insert({
          action: 'revenue_calculated',
          actor_identifier: currentUser.id,
          module: 'finance',
          snapshot: breakdown,
        });

      if (auditError) {
        console.error('Audit Log Error:', auditError);
        throw new Error('فشل توثيق العملية مالياً');
      }

      return NextResponse.json(breakdown, { status: 200 });
    } catch (error: unknown) {
      console.error('Finance Split Route Error:', error);

      return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
  });
}
