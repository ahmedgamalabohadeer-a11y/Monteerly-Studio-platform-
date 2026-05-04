import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { RevenueEngine } from '@/lib/finance/RevenueEngine';
import { withAuthGuard } from '@/lib/security/apiGuard';

export async function POST(req: Request) {
  return withAuthGuard(req, async (req, user) => {
    try {
      const { amount, tier } = await req.json();
      const breakdown = RevenueEngine.calculateSplit(amount, tier);

      await supabase.from('audit_logs').insert({
        action: 'revenue_calculated',
        actor_identifier: user.id, // تم استخدام هوية المستخدم الموثقة بدلاً من النظام
        module: 'finance',
        snapshot: breakdown
      });

      return NextResponse.json(breakdown, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
  });
}
