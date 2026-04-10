'use client';
import React, { useState } from 'react';
import { PieChart, Plus, Trash2, DollarSign, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';

export function RevenueSplitter() {
  const [totalRevenue, setTotalRevenue] = useState(10000);
  const [members, setMembers] = useState([
    { id: 1, name: 'سارة (Producer)', percent: 50, avatar: '/avatars/sara.jpg' },
    { id: 2, name: 'أحمد (Editor)', percent: 30, avatar: '/avatars/ahmed.jpg' },
    { id: 3, name: 'خالد (Investor)', percent: 20, avatar: '/avatars/khaled.jpg' },
  ]);

  const totalPercent = members.reduce((acc, curr) => acc + curr.percent, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
       {/* Configuration */}
       <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
             <h3 className="font-bold text-white flex items-center gap-2">
                <Users className="text-green-400" /> الشركاء (Stakeholders)
             </h3>
             <Button size="sm" className="bg-white/10 text-white hover:bg-white/20 gap-1">
                <Plus size={14}/> إضافة شريك
             </Button>
          </div>

          <div className="mb-6">
             <label className="text-xs text-slate-400 block mb-1">إجمالي إيرادات المشروع المتوقعة</label>
             <div className="relative">
                <DollarSign size={16} className="absolute right-3 top-3 text-slate-500" />
                <input 
                  type="number" 
                  value={totalRevenue} 
                  onChange={(e) => setTotalRevenue(Number(e.target.value))}
                  className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 pr-9 text-white font-bold" 
                />
             </div>
          </div>

          <div className="space-y-4">
             {members.map(member => (
                <div key={member.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                   <Avatar src={member.avatar} fallback={member.name[0]} size="sm" />
                   <div className="flex-1">
                      <div className="text-sm font-bold text-white">{member.name}</div>
                      <div className="text-xs text-green-400 font-mono">${(totalRevenue * member.percent / 100).toLocaleString()}</div>
                   </div>
                   <div className="flex items-center gap-2">
                      <input 
                        type="number" 
                        value={member.percent} 
                        className="w-16 bg-black border border-white/10 rounded p-1 text-center text-white text-sm"
                      />
                      <span className="text-slate-500">%</span>
                   </div>
                   <button className="text-slate-500 hover:text-red-400"><Trash2 size={16}/></button>
                </div>
             ))}
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
             <span className={`text-sm font-bold ${totalPercent === 100 ? 'text-green-400' : 'text-red-400'}`}>
                الإجمالي: {totalPercent}%
             </span>
             <Button disabled={totalPercent !== 100} className="bg-green-600 text-white font-bold">تفعيل العقد الذكي</Button>
          </div>
       </div>

       {/* Visualization */}
       <div className="bg-slate-900 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center">
          <div className="w-48 h-48 rounded-full border-8 border-slate-800 relative flex items-center justify-center mb-6">
             <PieChart size={64} className="text-slate-600" />
             <div className="absolute inset-0 rounded-full border-8 border-indigo-500 border-l-transparent border-b-transparent rotate-45 opacity-50"></div>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">توزيع الأرباح الآلي</h3>
          <p className="text-slate-400 text-sm max-w-xs">
             عند استلام أي دفعة من العميل، سيقوم النظام بتقسيمها فوراً وإيداعها في محفظة كل شريك تلقائياً.
          </p>
       </div>
    </div>
  );
}
