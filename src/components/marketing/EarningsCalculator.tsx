'use client';
import React, { useState } from 'react';
import { DollarSign, Clock } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export function EarningsCalculator() {
  const [rate, setRate] = useState(50); // Hourly rate
  const [hours, setHours] = useState(20); // Weekly hours

  const weekly = rate * hours;
  const monthly = weekly * 4;
  const platformFee = monthly * 0.10; // 10% fee
  const netIncome = monthly - platformFee;

  return (
    <Card className="max-w-xl mx-auto p-8 border-2 border-primary/20 shadow-2xl bg-gradient-to-br from-card to-muted/20">
       <h2 className="text-2xl font-bold text-center mb-8">احسب أرباحك المتوقعة</h2>
       
       <div className="space-y-8 mb-8">
          <div>
             <div className="flex justify-between mb-2">
                <label className="font-bold flex items-center gap-2"><DollarSign size={16} /> سعرك بالساعة</label>
                <span className="text-primary font-mono text-lg">${rate}</span>
             </div>
             <input 
                type="range" min="10" max="200" value={rate} 
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full accent-primary h-2 bg-muted rounded-lg appearance-none cursor-pointer"
             />
          </div>

          <div>
             <div className="flex justify-between mb-2">
                <label className="font-bold flex items-center gap-2"><Clock size={16} /> ساعات العمل أسبوعياً</label>
                <span className="text-primary font-mono text-lg">{hours} ساعة</span>
             </div>
             <input 
                type="range" min="5" max="60" value={hours} 
                onChange={(e) => setHours(Number(e.target.value))}
                className="w-full accent-primary h-2 bg-muted rounded-lg appearance-none cursor-pointer"
             />
          </div>
       </div>

       <div className="bg-slate-900 text-white rounded-xl p-6 text-center space-y-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
          <p className="text-slate-400 text-sm uppercase tracking-wider">صافي الدخل الشهري</p>
          <h3 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-primary/80">
             ${netIncome.toLocaleString()}
          </h3>
          <p className="text-xs text-slate-500 mt-2">* بعد خصم عمولة المنصة (10%)</p>
       </div>
    </Card>
  );
}
