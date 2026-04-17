import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    if (body.obj && body.obj.success === true) {
      const orderId = body.obj.order?.merchant_order_id || `MOCK_${Date.now()}`;
      const amount = (body.obj.amount_cents || 500000) / 100;
      
      const platformFee = amount * 0.02;
      const amountNet = amount - platformFee;

      console.log(`[Escrow Engine] ✅ Payment SUCCESS for Order ${orderId}.`);
      console.log(`[Escrow Engine] 🔍 جاري البحث عن المشروع المركزي لربط الأموال...`);
      
      // البحث التلقائي عن المشروع الذي أنشأناه في قاعدة البيانات
      const activeProject = await prisma.projects.findFirst();

      if (!activeProject) {
          console.error(`[Escrow Error] ❌ محرك البيانات يرفض المعاملة لعدم وجود مشاريع مسجلة.`);
          return NextResponse.json({ message: 'Project required to link funds' }, { status: 400 });
      }

      console.log(`[Escrow Engine] 🔗 تم العثور على المشروع. جاري حفظ المعاملة...`);

      // حفظ المعاملة وربطها بالمشروع لتخطي القيود الأمنية
      const transaction = await prisma.financial_transactions.create({
        data: {
          gateway_type: 'PAYMOB_SIMULATOR',
          gateway_transaction_id: orderId,
          payment_method: 'TEST_CARD',
          amount_gross: amount,
          platform_fee: platformFee,
          amount_net: amountNet,
          status: 'COMPLETED',
          projects: {
            connect: { id: activeProject.id }
          }
        }
      });

      console.log(`[Database Write] 💾 تم حفظ المعاملة المالية بنجاح تام!`);
      return NextResponse.json({ message: 'Transaction Saved', status: 'success', id: transaction.id });
    }

    return NextResponse.json({ message: 'Invalid payload' }, { status: 400 });
  } catch (error) {
    console.error('[Webhook Error]', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
