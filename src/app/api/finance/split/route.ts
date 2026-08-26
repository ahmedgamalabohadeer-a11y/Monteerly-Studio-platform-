import { NextResponse } from 'next/server';
import { RevenueEngine, type SubscriptionTier } from '@/lib/finance/RevenueEngine';
import { withAuthGuard } from '@/lib/security/apiGuard';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

type SplitRequestBody = {
  jobId: string;
};

function isSubscriptionTier(value: unknown): value is SubscriptionTier {
  return value === 'rookie' || value === 'pro' || value === 'studio';
}

export async function POST(req: Request) {
  return withAuthGuard(req, async (request, user) => {
    try {
      const body = (await request.json()) as Partial<SplitRequestBody>;
      const jobId = body.jobId;

      if (typeof jobId !== 'string' || jobId.trim().length === 0) {
        return NextResponse.json({ error: 'معرّف المشروع غير صالح' }, { status: 400 });
      }

      const { data: job, error: jobError } = await supabaseAdmin
        .from('jobs')
        .select('budget, client_id, freelancer_id')
        .eq('id', jobId)
        .single();

      if (jobError || !job) {
        return NextResponse.json({ error: 'المشروع غير موجود' }, { status: 400 });
      }

      if (user.id !== job.client_id && user.id !== job.freelancer_id) {
        return NextResponse.json({ error: 'لا تملك صلاحية الوصول إلى المشروع' }, { status: 403 });
      }

      const amount = Number(job.budget);
      if (!Number.isFinite(amount) || amount <= 0) {
        throw new Error('قيمة المشروع المخزنة غير صالحة');
      }

      let tier: SubscriptionTier = 'rookie';
      if (job.freelancer_id) {
        const { data: profile, error: profileError } = await supabaseAdmin
          .from('profiles')
          .select('tier')
          .eq('id', job.freelancer_id)
          .maybeSingle();

        if (profileError) {
          throw new Error('تعذر قراءة باقة المستقل');
        }

        if (isSubscriptionTier(profile?.tier)) {
          tier = profile.tier;
        }
      }

      const breakdown = RevenueEngine.calculateSplit(amount, tier);

      const { error: auditError } = await supabaseAdmin
        .from('audit_logs')
        .insert({
          action: 'revenue_calculated',
          actor_identifier: user.id,
          module: 'finance',
          snapshot: { jobId, tier, ...breakdown },
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
