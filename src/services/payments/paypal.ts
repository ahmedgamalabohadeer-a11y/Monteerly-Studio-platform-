import { prisma } from '@/lib/prisma';

// تحديد بيئة العمل (إنتاج أم اختبار)
const PAYPAL_API_BASE = process.env.PAYPAL_MODE === 'live' 
  ? 'https://api-m.paypal.com' 
  : 'https://api-m.sandbox.paypal.com';

export const PayPalService = {
  /**
   * 1. المصادقة وتوليد مفتاح الوصول (OAuth 2.0)
   */
  async authenticate() {
    // تشفير الـ Client ID و Secret كما يطلب بروتوكول PayPal
    const auth = Buffer.from(
