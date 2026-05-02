import { Redis } from '@upstash/redis'

// الاتصال بقاعدة بيانات Redis السحابية المجانية
// ملاحظة: يجب إضافة هذه المفاتيح في Vercel لاحقاً من موقع upstash.com
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || 'https://ideal-endpoint.upstash.io',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || 'secure-token',
})

// دالة لإضافة مهمة رندر أو ذكاء اصطناعي للطابور
export async function enqueueJob(jobType: string, payload: any) {
  const jobId = `job_${Date.now()}`;
  await redis.lpush('mcos_job_queue', JSON.stringify({ id: jobId, type: jobType, payload, status: 'pending' }));
  return jobId;
}
