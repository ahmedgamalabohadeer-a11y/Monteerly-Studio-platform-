import { test, expect } from '@playwright/test';

test.describe('MCOS Sovereign Operations & Security Audit', () => {
  test.beforeEach(async ({ context }) => {
    await context.route('**/*', async (route) => {
      const requestUrl = new URL(route.request().url());

      if (requestUrl.hostname === 'localhost' || requestUrl.hostname === '127.0.0.1') {
        await route.continue();
        return;
      }

      await route.abort();
    });
  });

  test('صفحة المصادقة العامة تعمل دون 404', async ({ page }) => {
    await page.goto('/ar/auth');

    await expect(page).toHaveURL(/\/ar\/auth/);
    expect(await page.title()).not.toContain('404');
  });

  test('الزائر يُعاد إلى تسجيل الدخول عند طلب صفحة مالية محمية', async ({ page }) => {
    await page.goto('/ar/finance');

    await expect(page).toHaveURL(/\/ar\/auth/);
  });

  test('cookie مزورة لا تمنح وصولًا إلى صفحة النزاعات السيادية', async ({
    page,
    context,
  }) => {
    await context.addCookies([
      {
        name: 'mcos_role',
        value: 'EXECUTIVE',
        domain: 'localhost',
        path: '/',
      },
    ]);

    await page.goto('/ar/disputes');

    await expect(page).toHaveURL(/\/ar\/auth/);
    await expect(page.getByText('إدارة النزاعات السيادية')).toHaveCount(0);
  });

  test('واجهات الإدارة والمالية الحساسة ترفض الطلبات دون جلسة', async ({
    request,
  }) => {
    const financeResponse = await request.post('/api/finance/split', {
      data: { jobId: '00000000-0000-0000-0000-000000000000' },
    });
    const disputeResponse = await request.post('/api/disputes/resolve', {
      data: {
        disputeId: '00000000-0000-0000-0000-000000000000',
        decision: 'client',
      },
    });

    expect(financeResponse.status()).toBe(401);
    expect(disputeResponse.status()).toBe(401);
  });
  test('نقاط API الحساسة ترفض الزائر ولا تنفذ عمليات خارجية', async ({
    request,
  }) => {
    const responses = await Promise.all([
      request.post('/api/ai/gemini', { data: { prompt: 'test' } }),
      request.post('/api/ai/voice', { data: { text: 'test' } }),
      request.post('/api/analyze-image'),
      request.post('/api/emails/send', { data: {} }),
      request.post('/api/emails/delivery', { data: {} }),
      request.get('/api/brain-runtime'),
      request.post('/api/checkout/paymob', { data: {} }),
      request.post('/api/storage/r2', { data: {} }),
    ]);

    for (const response of responses) {
      expect(response.status()).toBe(401);
    }

    const webhookResponse = await request.post('/api/webhooks/paymob', {
      data: { obj: { success: true } },
    });
    expect(webhookResponse.status()).toBe(503);
  });
});
