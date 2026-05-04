import { NextResponse } from 'next/server';
import { RevenueEngine } from '@/lib/finance/RevenueEngine';
import { withAuthGuard } from '@/lib/security/apiGuard';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(req: Request) {
  return withAuthGuard(req, async (req, user) => {
    try {
      if (!amount || amount <= 0) {
        return NextResponse.json({ error: 'مبلغ غير صالح' }, { status: 400 });
      }

      const { amount, tier } = await req.json();
      const breakdown = RevenueEngine.calculateSplit(amount, tier);

      // استخدام (مفتاح الإله) لتسجيل الحركات المالية في سجل التدقيق الإجباري
      // هذا يتخطى أي RLS Policy قد تمنع المستخدم العادي من الكتابة هنا
      const { error } = await supabaseAdmin.from('audit_logs').insert({
        action: 'revenue_calculated',
        actor_identifier: user.id,
        module: 'finance',
        snapshot: breakdown
      });

      if (error) {
        console.error("Audit Log Error:", error);
        throw new Error('فشل توثيق العملية مالياً');
      }

      return NextResponse.json(breakdown, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
  });
}
