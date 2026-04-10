'use client';
import React from 'react';
import { Printer, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function InvoiceViewer() {
  return (
    <div className="max-w-3xl mx-auto my-8">
       {/* Actions Bar */}
       <div className="flex justify-between items-center mb-6 print:hidden">
          <h2 className="text-xl font-bold">فاتورة #INV-2026-001</h2>
          <div className="flex gap-2">
             <Button size="sm" variant="outline" icon={<Share2 size={16} />}>مشاركة</Button>
             <Button size="sm" variant="outline" icon={<Download size={16} />}>PDF</Button>
             <Button size="sm" variant="primary" icon={<Printer size={16} />} onClick={() => window.print()}>طباعة</Button>
          </div>
       </div>

       {/* Invoice Paper */}
       <div className="bg-white text-slate-900 p-10 rounded-none shadow-lg border border-slate-200 print:shadow-none print:border-0 print:p-0">
          {/* Header */}
          <div className="flex justify-between items-start mb-12">
             <div>
                <div className="text-2xl font-black mb-1 text-primary">MONTEERLY</div>
                <div className="text-sm text-slate-500">منصة المبدعين العرب</div>
             </div>
             <div className="text-right">
                <h1 className="text-3xl font-bold text-slate-300 uppercase">Invoice</h1>
                <p className="font-mono mt-1">#INV-2026-001</p>
                <p className="text-sm text-slate-500 mt-1">التاريخ: 15 يناير 2026</p>
             </div>
          </div>

          {/* Addresses */}
          <div className="flex justify-between mb-12 text-sm">
             <div>
                <h4 className="font-bold text-slate-400 uppercase text-xs mb-2">من (المستقل)</h4>
                <p className="font-bold">أحمد كمال</p>
                <p className="text-slate-500">القاهرة، مصر</p>
                <p className="text-slate-500">ahmed@example.com</p>
             </div>
             <div className="text-right">
                <h4 className="font-bold text-slate-400 uppercase text-xs mb-2">إلى (العميل)</h4>
                <p className="font-bold">شركة بيبسي العالمية</p>
                <p className="text-slate-500">دبي، الإمارات</p>
                <p className="text-slate-500">finance@pepsi.com</p>
             </div>
          </div>

          {/* Table */}
          <table className="w-full text-right mb-12">
             <thead className="bg-slate-50 border-y border-slate-200">
                <tr>
                   <th className="py-3 px-4 text-xs uppercase text-slate-500">الوصف</th>
                   <th className="py-3 px-4 text-xs uppercase text-slate-500 w-24">الكمية</th>
                   <th className="py-3 px-4 text-xs uppercase text-slate-500 w-32">السعر</th>
                   <th className="py-3 px-4 text-xs uppercase text-slate-500 w-32">المجموع</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-slate-100">
                <tr>
                   <td className="py-4 px-4 font-bold">مونتاج إعلان رمضان (30 ثانية)</td>
                   <td className="py-4 px-4">1</td>
                   <td className="py-4 px-4">$500.00</td>
                   <td className="py-4 px-4">$500.00</td>
                </tr>
                <tr>
                   <td className="py-4 px-4 font-bold">تصحيح ألوان إضافي</td>
                   <td className="py-4 px-4">2</td>
                   <td className="py-4 px-4">$100.00</td>
                   <td className="py-4 px-4">$200.00</td>
                </tr>
             </tbody>
          </table>

          {/* Total */}
          <div className="flex justify-end">
             <div className="w-64 space-y-2">
                <div className="flex justify-between text-sm">
                   <span className="text-slate-500">المجموع الفرعي</span>
                   <span>$700.00</span>
                </div>
                <div className="flex justify-between text-sm">
                   <span className="text-slate-500">ضريبة (0%)</span>
                   <span>$0.00</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-4 border-t border-slate-200">
                   <span>الإجمالي</span>
                   <span className="text-primary">$700.00</span>
                </div>
             </div>
          </div>
          
          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-slate-100 text-center text-xs text-slate-400">
             شكراً لتعاملكم معنا. تم إنشاء هذه الفاتورة إلكترونياً عبر Monteerly.
          </div>
       </div>
    </div>
  );
}
