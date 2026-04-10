'use client';
import React from 'react';
import { AlertTriangle, ThumbsUp, MessageSquare, Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';

export function ChurnPredictor() {
  const clients = [
    { id: 1, name: 'شركة المستقبل', risk: 'High', score: 85, lastSeen: '5 days ago', status: 'Pending Payment', suggestion: 'Send Discount Coupon' },
    { id: 2, name: 'سارة أحمد', risk: 'Medium', score: 45, lastSeen: '2 days ago', status: 'In Review', suggestion: 'Ask for Feedback' },
    { id: 3, name: 'Tech Solutions', risk: 'Low', score: 12, lastSeen: '1 hour ago', status: 'Active', suggestion: 'Upsell 4K Package' },
  ];

  return (
    <div className="space-y-6">
       <div className="bg-gradient-to-r from-red-900/20 to-slate-900 border border-red-500/20 rounded-xl p-6 flex items-start gap-4">
          <div className="p-3 bg-red-500/10 rounded-full text-red-500">
             <AlertTriangle size={24} />
          </div>
          <div>
             <h3 className="font-bold text-white text-lg">تنبيه ذكي: لديك 3 عملاء في خطر!</h3>
             <p className="text-sm text-slate-400">خوارزمية الذكاء الاصطناعي اكتشفت أنماطاً تشير إلى احتمال خسارة هؤلاء العملاء. تصرف الآن.</p>
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client) => (
             <div key={client.id} className="bg-slate-900 border border-white/10 rounded-xl p-6 relative overflow-hidden">
                {/* Risk Bar */}
                <div className={`absolute top-0 left-0 w-full h-1 ${
                   client.risk === 'High' ? 'bg-red-500' : client.risk === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`} />
                
                <div className="flex justify-between items-start mb-4">
                   <div className="flex items-center gap-3">
                      <Avatar fallback={client.name[0]} />
                      <div>
                         <h4 className="font-bold text-white text-sm">{client.name}</h4>
                         <p className="text-[10px] text-slate-400">Last seen: {client.lastSeen}</p>
                      </div>
                   </div>
                   <span className={`text-[10px] px-2 py-1 rounded font-bold uppercase ${
                      client.risk === 'High' ? 'bg-red-500/10 text-red-400' : 
                      client.risk === 'Medium' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-green-500/10 text-green-400'
                   }`}>
                      {client.risk} Risk
                   </span>
                </div>

                <div className="mb-6">
                   <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>احتمالية المغادرة (Churn Probability)</span>
                      <span className="text-white font-bold">{client.score}%</span>
                   </div>
                   <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${client.risk === 'High' ? 'bg-red-500' : client.risk === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'}`} 
                        style={{ width: `${client.score}%` }} 
                      />
                   </div>
                </div>

                <div className="bg-black/30 p-3 rounded-lg border border-white/5 mb-4">
                   <div className="text-[10px] text-slate-500 uppercase font-bold mb-1 flex items-center gap-1">
                      <ThumbsUp size={10} /> AI Recommendation
                   </div>
                   <p className="text-xs text-indigo-300 font-bold">{client.suggestion}</p>
                </div>

                <Button className="w-full bg-white text-black hover:bg-slate-200 text-xs font-bold gap-2">
                   <Send size={14} /> تنفيذ الإجراء
                </Button>
             </div>
          ))}
       </div>
    </div>
  );
}
