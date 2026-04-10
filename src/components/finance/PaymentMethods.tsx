'use client';
import React, { useState } from 'react';
import { CreditCard, Plus, Trash2, Star, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function PaymentMethods() {
  const [cards, setCards] = useState([
    { id: 1, type: 'Visa', last4: '4242', exp: '12/28', isDefault: true },
    { id: 2, type: 'Mastercard', last4: '8833', exp: '09/26', isDefault: false },
  ]);

  const setDefault = (id: number) => {
    setCards(cards.map(c => ({ ...c, isDefault: c.id === id })));
  };

  const removeCard = (id: number) => {
    setCards(cards.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center border-b border-border pb-4">
          <div>
             <h3 className="font-bold text-lg flex items-center gap-2">
                <CreditCard className="text-primary" size={20} /> المحفظة وطرق الدفع
             </h3>
             <p className="text-sm text-muted-foreground">إدارة البطاقات المستخدمة في الفوترة التلقائية.</p>
          </div>
          <Button variant="outline" icon={<Plus size={16} />}>إضافة بطاقة</Button>
       </div>

       <div className="grid gap-4">
          {cards.map((card) => (
             <div 
                key={card.id} 
                className={`flex items-center justify-between p-4 rounded-xl border transition-all ${card.isDefault ? 'bg-primary/5 border-primary shadow-sm' : 'bg-card border-border'}`}
             >
                <div className="flex items-center gap-4">
                   <div className="w-12 h-8 bg-slate-800 rounded flex items-center justify-center text-white font-bold italic text-xs">
                      {card.type}
                   </div>
                   <div>
                      <div className="font-mono font-bold text-sm">•••• •••• •••• {card.last4}</div>
                      <div className="text-xs text-muted-foreground">Expires: {card.exp}</div>
                   </div>
                </div>

                <div className="flex items-center gap-3">
                   {card.isDefault ? (
                      <span className="text-xs font-bold text-primary flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full">
                         <Star size={10} fill="currentColor" /> الافتراضية
                      </span>
                   ) : (
                      <Button size="sm" variant="ghost" onClick={() => setDefault(card.id)}>تعيين كافتراضي</Button>
                   )}
                   
                   <button 
                      onClick={() => removeCard(card.id)}
                      className="text-muted-foreground hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors"
                   >
                      <Trash2 size={16} />
                   </button>
                </div>
             </div>
          ))}
       </div>

       <div className="bg-muted/30 p-4 rounded-xl flex items-center gap-3 text-xs text-muted-foreground">
          <ShieldCheck size={16} className="text-emerald-500" />
          <span>مدفوعاتك آمنة ومشفرة باستخدام معايير PCI DSS العالمية. لا نقوم بتخزين رقم البطاقة الكامل.</span>
       </div>
    </div>
  );
}
