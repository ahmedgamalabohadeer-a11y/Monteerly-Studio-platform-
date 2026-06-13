import { test, expect } from '@playwright/test';

test.describe('MCOS Sovereign Operations & Security Audit', () => {

  test('مركز القيادة يجب أن يعمل ويحمل الهوية البصرية الداكنة', async ({ page }) => {
    await page.goto('/ar/dashboard');
    // التحقق من الهوية البصرية الصارمة
    await expect(page.locator('body')).toHaveClass(/bg-slate-950/);
    // التحقق من عدم وجود خطأ 404
    expect(await page.title()).not.toContain('404');
  });

  test('نظام الصلاحيات (RBAC) يجب أن يمنع الزوار من دخول لوحة التدقيق المالي', async ({ page }) => {
    await page.goto('/ar/finance');
    // النظام يجب أن يعترض الدخول ويوجه المستخدم لصفحة 403 (وصول مرفوض)
    await expect(page).toHaveURL(/.*\/unauthorized/);
    await expect(page.getByText('وصول مرفوض (403)')).toBeVisible();
  });

  test('الإدارة العليا يمكنها الدخول لصفحة النزاعات السيادية', async ({ page, context }) => {
    // حقن تصريح الإدارة العليا في المتصفح الوهمي
    await context.addCookies([{ name: 'mcos_role', value: 'EXECUTIVE', domain: 'localhost', path: '/' }]);
    await page.goto('/ar/disputes');
    // يجب أن تفتح الصفحة بنجاح لوجود التصريح
    await expect(page.getByText('إدارة النزاعات السيادية')).toBeVisible();
  });

});
