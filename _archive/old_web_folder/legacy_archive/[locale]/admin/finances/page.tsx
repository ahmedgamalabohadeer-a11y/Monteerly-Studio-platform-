import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// تعطيل التخزين المؤقت لضمان عرض الأموال لحظة بلحظة
export const dynamic = 'force-dynamic';

export default async function AdminFinances() {
  // جلب المعاملات المالية وترتيبها من الأحدث للأقدم
  const transactions = await prisma.financial_transactions.findMany({
    orderBy: { created_at: 'desc' },
  });

  // حساب إجمالي الإيرادات الصافية
  const totalNet = transactions.reduce((sum, tx) => sum + (Number(tx.amount_net) || 0), 0);

  return (
    <div className="p-8 max-w-6xl mx-auto" dir="rtl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">لوحة الإدارة المالية</h1>
        <div className="bg-green-100 text-green-800 px-6 py-3 rounded-lg shadow border border-green-200">
          <span className="block text-sm">إجمالي الإيرادات الصافية</span>
          <span className="text-2xl font-bold">{totalNet.toFixed(2)} EGP</span>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
        <table className="min-w-full leading-normal text-right">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-5 py-3 border-b-2 text-sm font-semibold uppercase tracking-wider">رقم العملية</th>
              <th className="px-5 py-3 border-b-2 text-sm font-semibold uppercase tracking-wider">البوابة</th>
              <th className="px-5 py-3 border-b-2 text-sm font-semibold uppercase tracking-wider">المبلغ الإجمالي</th>
              <th className="px-5 py-3 border-b-2 text-sm font-semibold uppercase tracking-wider">الرسوم</th>
              <th className="px-5 py-3 border-b-2 text-sm font-semibold uppercase tracking-wider">الصافي</th>
              <th className="px-5 py-3 border-b-2 text-sm font-semibold uppercase tracking-wider">الحالة</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-gray-50 transition duration-150">
                <td className="px-5 py-4 border-b border-gray-200 text-sm font-mono text-gray-600">
                  {tx.gateway_transaction_id?.substring(0, 15)}...
                </td>
                <td className="px-5 py-4 border-b border-gray-200 text-sm">
                  <span className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-xs">{tx.gateway_type}</span>
                </td>
                <td className="px-5 py-4 border-b border-gray-200 text-sm font-bold text-gray-800">{Number(tx.amount_gross)} ج.م</td>
                <td className="px-5 py-4 border-b border-gray-200 text-sm text-red-600">-{Number(tx.platform_fee)} ج.م</td>
                <td className="px-5 py-4 border-b border-gray-200 text-sm font-bold text-green-600">{Number(tx.amount_net)} ج.م</td>
                <td className="px-5 py-4 border-b border-gray-200 text-sm">
                  <span className={`py-1 px-3 rounded-full text-xs ${tx.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {transactions.length === 0 && (
          <div className="p-10 text-center text-gray-500">لا توجد معاملات مالية مسجلة حتى الآن.</div>
        )}
      </div>
    </div>
  );
}
