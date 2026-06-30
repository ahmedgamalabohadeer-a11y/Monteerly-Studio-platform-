import { NextResponse } from 'next/server';
import { RevenueEngine } from '@/lib/finance/RevenueEngine';
import { withAuthGuard } from '@/lib/security/apiGuard';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(req: Request) {
  // تمرير المتغيرات بشكل صريح مع السماح بتجاوز النوع المجهول
  return withAuthGuard(req, async (req: Request, user: any) => {
    try {
      const { amount, tier } = await req.json();

      if (!amount || amount <= 0) {
        return NextResponse.json({ error: 'مبلغ غير صالح' }, { status: 400 });
      }
      
      const breakdown = RevenueEngine.calculateSplit(amount, tier);

      // تحديد نوع المتغير بوضوح (Type Casting) لاستخراج المُعرّف بأمان
      const currentUser = user as { id: string };

      // استخدام (مفتاح الإله) لتسجيل الحركات المالية في سجل التدقيق الإجباري
      // هذا يتخطى أي RLS Policy قد تمنع المستخدم العادي من الكتابة هنا
      const { error } = await supabaseAdmin.from('audit_logs').insert({
        action: 'revenue_calculated',
        actor_identifier: currentUser.id,
        module: 'finance',
        snapshot: breakdown
      });

      if (error) {
        console.error("Audit Log Error:", error);
        throw new Error('فشل توثيق العملية مالياً');
      }

      return NextResponse.json(breakdown, { status: 200 });
    } catch (error: unknown) {
      console.error(error);
      return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
  });
}
