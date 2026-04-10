'use client';
import React, { useState } from 'react';
import { Plus, Trash, Save } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function InvoiceBuilder() {
  const [items, setItems] = useState([{ desc: '', qty: 1, price: 0 }]);

  const addItem = () => setItems([...items, { desc: '', qty: 1, price: 0 }]);
  const removeItem = (idx: number) => setItems(items.filter((_, i) => i !== idx));

  const total = items.reduce((acc, item) => acc + (item.qty * item.price), 0);

  return (
    <div className="space-y-6 max-w-2xl">
       <div className="grid grid-cols-2 gap-4">
          <Input label="اسم العميل / الشركة" placeholder="Pepsi Co." />
          <Input label="تاريخ الاستحقاق" type="date" />
       </div>

       <div className="border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
             <thead className="bg-muted text-muted-foreground">
                <tr>
                   <th className="p-3 text-right">البند</th>
                   <th className="p-3 w-20">الكمية</th>
                   <th className="p-3 w-24">السعر</th>
                   <th className="p-3 w-10"></th>
                </tr>
             </thead>
             <tbody className="divide-y divide-border">
                {items.map((item, i) => (
                   <tr key={i}>
                      <td className="p-2"><input className="w-full bg-transparent outline-none" placeholder="وصف الخدمة..." /></td>
                      <td className="p-2"><input className="w-full bg-transparent outline-none text-center" type="number" defaultValue={1} /></td>
                      <td className="p-2"><input className="w-full bg-transparent outline-none text-center" type="number" placeholder="0.00" /></td>
                      <td className="p-2 text-center"><button onClick={() => removeItem(i)} className="text-red-500"><Trash size={16} /></button></td>
                   </tr>
                ))}
             </tbody>
          </table>
          <div className="p-2 bg-muted/30">
             <Button size="sm" variant="ghost" className="w-full text-primary" onClick={addItem} icon={<Plus size={16} />}>إضافة بند</Button>
          </div>
       </div>

       <div className="flex justify-end items-center gap-4">
          <div className="text-right">
             <p className="text-sm text-muted-foreground">الإجمالي</p>
             <p className="text-2xl font-bold">${total.toFixed(2)}</p>
          </div>
          <Button variant="primary" icon={<Save size={18} />}>إصدار وإرسال الفاتورة</Button>
       </div>
    </div>
  );
}
