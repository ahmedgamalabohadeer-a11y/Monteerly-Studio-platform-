'use client';
import React, { useState } from 'react';
import { Plus, Trash, Save } from 'lucide-react';

export function InvoiceBuilder() {
  const [items, setItems] = useState([{ desc: '', qty: 1, price: 0 }]);

  const addItem = () => setItems([...items, { desc: '', qty: 1, price: 0 }]);
  const removeItem = (idx: number) => setItems(items.filter((_, i) => i !== idx));

  // حساب المجموع بشكل آمن
  const total = items.reduce((acc, item) => acc + (Number(item.qty) * Number(item.price)), 0);

  return (
    <div className="space-y-6 max-w-2xl bg-slate-900 p-6 rounded-2xl border border-slate-800">
       <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm text-slate-400 mb-1">اسم العميل / الشركة</label>
            <input className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white outline-none focus:border-indigo-500" placeholder="مثال: شركة بيبسي" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">تاريخ الاستحقاق</label>
            <input type="date" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white outline-none focus:border-indigo-500" />
          </div>
       </div>

       <div className="border border-slate-700 rounded-xl overflow-hidden">
          <table className="w-full text-sm text-white">
             <thead className="bg-slate-800 text-slate-400">
                <tr>
                   <th className="p-3 text-right">البند / وصف الخدمة</th>
                   <th className="p-3 w-20 text-center">الكمية</th>
                   <th className="p-3 w-24 text-center">السعر ($)</th>
                   <th className="p-3 w-10"></th>
                </tr>
             </thead>
             <tbody className="divide-y divide-slate-700">
                {items.map((item, i) => (
                   <tr key={i} className="hover:bg-slate-800/50 transition-colors">
                      <td className="p-2">
                        <input 
                          className="w-full bg-transparent outline-none px-2" 
                          placeholder="مونتاج فيديو إعلاني..."
                          value={item.desc}
                          onChange={(e) => {
                            const newItems = [...items];
                            newItems[i].desc = e.target.value;
                            setItems(newItems);
                          }}
                        />
                      </td>
                      <td className="p-2">
                        <input 
                          className="w-full bg-transparent outline-none text-center" 
                          type="number" min="1"
                          value={item.qty}
                          onChange={(e) => {
                            const newItems = [...items];
                            newItems[i].qty = Number(e.target.value);
                            setItems(newItems);
                          }}
                        />
                      </td>
                      <td className="p-2">
                        <input 
                          className="w-full bg-transparent outline-none text-center" 
                          type="number" min="0" placeholder="0.00"
                          value={item.price}
                          onChange={(e) => {
                            const newItems = [...items];
                            newItems[i].price = Number(e.target.value);
                            setItems(newItems);
                          }}
                        />
                      </td>
                      <td className="p-2 text-center">
                        <button onClick={() => removeItem(i)} className="text-red-400 hover:text-red-300 p-1"><Trash size={16} /></button>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
          <div className="p-2 bg-slate-800/50 border-t border-slate-700">
             <button onClick={addItem} className="w-full flex items-center justify-center gap-2 text-indigo-400 hover:text-indigo-300 p-2 text-sm font-bold">
               <Plus size={16} /> إضافة بند جديد
             </button>
          </div>
       </div>

       <div className="flex justify-between items-center pt-4 border-t border-slate-800">
          <div className="text-right">
             <p className="text-sm text-slate-400">الإجمالي المستحق</p>
             <p className="text-3xl font-bold text-white">${total.toFixed(2)}</p>
          </div>
          <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-colors">
            <Save size={18} /> إصدار وإرسال الفاتورة
          </button>
       </div>
    </div>
  );
}
