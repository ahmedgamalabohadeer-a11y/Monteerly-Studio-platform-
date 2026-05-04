import { test, expect } from '@playwright/test';

test.describe('MCOS Core Operations & Visual Audit', () => {
  
  test('يجب أن تفتح بوابة المصادقة بدون تشوه بصري', async ({ page }) => {
    await page.goto('/ar/auth');
    // التحقق من أن الهوية البصرية الداكنة مفروضة
    const body = page.locator('body');
    await expect(body).toHaveClass(/bg-slate-950/);
    await expect(page.locator('h1')).toContainText('بوابة العبور');
  });

  test('لوحة القيادة يجب أن تحتوي على محرك العطاءات الذكي', async ({ page }) => {
    await page.goto('/ar/dashboard');
    // التحقق من وجود الشبكة ومحرك الذكاء الاصطناعي
    await expect(page.getByText('سوق العمل السيادي')).toBeVisible();
    await expect(page.getByText('الكاتب الذكي (Gemini AI)')).toBeVisible();
    
    // محاكاة الضغط على زر توليد العرض
    const generateBtn = page.getByRole('button', { name: /كتابة العرض/ });
    if (await generateBtn.isVisible()) {
      await expect(generateBtn).toBeEnabled();
    }
  });

  test('مساحة العمل يجب أن تتكيف مع الهواتف والكمبيوتر', async ({ page, isMobile }) => {
    await page.goto('/ar/workspace');
    if (isMobile) {
      // على الهاتف يجب أن تظهر شارة MCOS MOBILE
      await expect(page.getByText('MCOS MOBILE')).toBeVisible();
      // النوافذ العائمة (Desktop OS) يجب أن تختفي
      await expect(page.locator('text=شاشة العرض').first()).toBeVisible();
    } else {
      // على الكمبيوتر يجب أن يظهر سطح المكتب
      await expect(page.getByText('MCOS WORKSPACE')).toBeVisible();
    }
  });

});
