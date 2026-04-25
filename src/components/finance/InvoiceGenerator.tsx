'use client';
import React, { useState } from 'react';
import { Download, Plus, Trash2, Printer } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function InvoiceGenerator() {
  const [items, setItems] = useState([{ id: 1, desc: 'تصميم موشن جرافيك (دقيقة)', qty: 1, price: 500 }]);
  
  const addItem = () => setItems([...items, { id: Date.now(), desc: '', qty: 1, price: 0 }]);
  const removeItem = (id: number) => setItems(items.filter(i => i.id !== id));
  
  const subtotal = items.reduce((acc, item) => acc + (item.qty * item.price), 0);
  const vat = subtotal * 0.15; // 15% KSA/Egypt
  const total = subtotal + vat;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
       {/* Edit Form */}
       <div className="bg-slate-900 border border-white/10 rounded-xl p-6 space-y-6">
          <h3 className="font-bold text-white mb-4">بيانات الفاتورة</h3>
          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="text-xs text-slate-400 block mb-1">رقم الفاتورة</label>
                <input type="text" defaultValue="INV-2026-001" className="w-full bg-black/30 border border-white/10 rounded p-2 text-white text-sm" />
             </div>
             <div>
                <label className="text-xs text-slate-400 block mb-1">تاريخ الاستحقاق</label>
                <input type="date" className="w-full bg-black/30 border border-white/10 rounded p-2 text-white text-sm" />
             </div>
          </div>
          <div>
             <label className="text-xs text-slate-400 block mb-1">اسم العميل / الشركة</label>
             <input type="text" placeholder="شركة المستقبل المحدودة" className="w-full bg-black/30 border border-white/10 rounded p-2 text-white text-sm" />
          </div>

          <div className="border-t border-white/10 pt-4">
             <label className="text-xs text-slate-400 block mb-3">الخدمات</label>
             <div className="space-y-2">
                {items.map((item, index) => (
                   <div key={item.id} className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="وصف الخدمة"
                        defaultValue={item.desc}
                        className="flex-1 bg-black/30 border border-white/10 rounded p-2 text-white text-xs"
                      />
                      <input 
                        type="number" 
                        placeholder="الكمية"
                        defaultValue={item.qty}
                        className="w-16 bg-black/30 border border-white/10 rounded p-2 text-white text-xs text-center"
                      />
                      <input 
                        type="number" 
                        placeholder="السعر"
                        defaultValue={item.price}
                        className="w-20 bg-black/30 border border-white/10 rounded p-2 text-white text-xs text-center"
                      />
                      <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-300"><Trash2 size={16}/></button>
                   </div>
                ))}
             </div>
             <button onClick={addItem} className="mt-3 text-xs text-indigo-400 hover:text-white flex items-center gap-1">
                <Plus size={14}/> إضافة بند
             </button>
          </div>
       </div>

       {/* Preview */}
       <div className="bg-white text-black rounded-xl p-8 shadow-2xl relative">
          <div className="absolute top-4 left-4 flex gap-2">
             <button className="p-2 bg-slate-100 hover:bg-slate-200 rounded text-slate-600" title="Print"><Printer size={16}/></button>
             <button className="p-2 bg-indigo-600 hover:bg-indigo-700 rounded text-white" title="Download PDF"><Download size={16}/></button>
          </div>

          <div className="mb-8">
             <h2 className="text-2xl font-bold text-slate-900">فاتورة ضريبية</h2>
             <p className="text-sm text-slate-500">من: محمد كمال (Monteerly Studio)</p>
             <p className="text-sm text-slate-500">إلى: شركة المستقبل</p>
          </div>

          <table className="w-full text-sm mb-8">
             <thead>
                <tr className="border-b-2 border-slate-100 text-slate-500 text-right">
                   <th className="pb-2">الوصف</th>
                   <th className="pb-2 text-center">الكمية</th>
                   <th className="pb-2 text-left">السعر</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-slate-50">
                {items.map(item => (
                   <tr key={item.id}>
                      <td className="py-3">{item.desc || 'وصف الخدمة'}</td>
                      <td className="py-3 text-center">{item.qty}</td>
                      <td className="py-3 text-left font-bold">${item.price * item.qty}</td>
                   </tr>
                ))}
             </tbody>
          </table>

          <div className="flex justify-end">
             <div className="w-48 space-y-2">
                <div className="flex justify-between text-sm text-slate-500">
                   <span>المجموع</span>
                   <span>${subtotal}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-500">
                   <span>الضريبة (15%)</span>
                   <span>${vat}</span>
                </div>
                <div className="flex justify-between text-lg font-black text-slate-900 border-t border-slate-200 pt-2">
                   <span>الإجمالي</span>
                   <span>${total}</span>
                </div>
             </div>
          </div>
          
          <div className="mt-8 text-[10px] text-slate-400 text-center border-t border-slate-100 pt-4">
             تم إنشاء هذه الفاتورة تلقائياً عبر منصة Monteerly. الرقم الضريبي: 3000123456789
          </div>
       </div>
    </div>
  );
}

################################################################################