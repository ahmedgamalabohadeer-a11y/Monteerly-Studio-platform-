import React from 'react';
import { Printer, Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function InvoiceView() {
  return (
    <div className="max-w-3xl mx-auto bg-white text-black p-8 rounded-none md:rounded-xl shadow-none md:shadow-lg border border-gray-200">
       {/* Actions */}
       <div className="flex justify-end gap-2 mb-8 print:hidden">
          <Button size="sm" variant="outline" icon={<Printer size={16} />} onClick={() => window.print()}>طباعة</Button>
          <Button size="sm" variant="outline" icon={<Download size={16} />}>PDF</Button>
       </div>

       {/* Header */}
       <div className="flex justify-between items-start mb-12">
          <div>
             <div className="flex items-center gap-2 font-bold text-2xl mb-4">
                <div className="w-8 h-8 bg-black text-white rounded flex items-center justify-center">M</div>
                <span>Monteerly</span>
             </div>
             <p className="text-gray-500 text-sm">Cairo, Egypt<br/>Tax ID: 123-456-789</p>
          </div>
          <div className="text-right">
             <h2 className="text-4xl font-bold text-gray-200 uppercase mb-2">Invoice</h2>
             <p className="font-bold text-lg">#INV-2026-001</p>
             <p className="text-gray-500 text-sm">Date: Jan 12, 2026</p>
          </div>
       </div>

       {/* Bill To */}
       <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500 uppercase font-bold mb-1">Bill To:</p>
          <h3 className="font-bold">Pepsi Co. Egypt</h3>
          <p className="text-sm text-gray-600">Attn: Marketing Dept.</p>
       </div>

       {/* Items */}
       <table className="w-full mb-8">
          <thead>
             <tr className="border-b-2 border-black text-left">
                <th className="py-2">Description</th>
                <th className="py-2 text-right">Qty</th>
                <th className="py-2 text-right">Unit Price</th>
                <th className="py-2 text-right">Amount</th>
             </tr>
          </thead>
          <tbody>
             <tr className="border-b border-gray-100">
                <td className="py-4">Video Editing Service - Ramadan Campaign</td>
                <td className="py-4 text-right">1</td>
                <td className="py-4 text-right">$1,500.00</td>
                <td className="py-4 text-right font-bold">$1,500.00</td>
             </tr>
             <tr className="border-b border-gray-100">
                <td className="py-4">Stock Footage License (Premium)</td>
                <td className="py-4 text-right">2</td>
                <td className="py-4 text-right">$50.00</td>
                <td className="py-4 text-right font-bold">$100.00</td>
             </tr>
          </tbody>
       </table>

       {/* Totals */}
       <div className="flex justify-end">
          <div className="w-64 space-y-2">
             <div className="flex justify-between text-sm"><span>Subtotal</span><span>$1,600.00</span></div>
             <div className="flex justify-between text-sm"><span>Tax (14%)</span><span>$224.00</span></div>
             <div className="flex justify-between text-xl font-bold border-t-2 border-black pt-2 mt-2">
                <span>Total</span>
                <span>$1,824.00</span>
             </div>
          </div>
       </div>
    </div>
  );
}

