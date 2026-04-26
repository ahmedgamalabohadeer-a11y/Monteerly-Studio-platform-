'use client';
import React from 'react';
import { AlertTriangle, PlusCircle, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function ScopeGuard() {
  const comments = [
    { id: 1, user: 'العميل', text: 'هل يمكننا تغيير الموسيقى في الدقيقة 02:00؟ أعتقد أنها حزينة جداً.', risk: 'High', type: 'Major Change', cost: '$50' },
    { id: 2, user: 'العميل', text: 'أعجبني الخط، لكن هل يمكن تكبيره قليلاً؟', risk: 'Low', type: 'Minor Tweak', cost: '$0' },
  ];

  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
       <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-orange-500/10 text-orange-400 rounded-lg">
             <AlertTriangle size={24} />
          </div>
          <div>
             <h3 className="font-bold text-white">حارس النطاق (Scope Guard)</h3>
             <p className="text-xs text-slate-400">تحليل طلبات العميل واكتشاف التكاليف الإضافية.</p>
          </div>
       </div>

       <div className="space-y-4">
          {comments.map((comment) => (
             <div key={comment.id} className={`p-4 rounded-xl border ${
                comment.risk === 'High' ? 'bg-red-900/10 border-red-500/30' : 'bg-black/20 border-white/5'
             }`}>
                <div className="flex justify-between items-start mb-2">
                   <span className="font-bold text-white text-sm">{comment.user}</span>
                   {comment.risk === 'High' && (
                      <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase">
                         Out of Scope
                      </span>
                   )}
                </div>
                
                <p className="text-slate-300 text-sm mb-4">"{comment.text}"</p>

                {comment.risk === 'High' ? (
                   <div className="bg-black/40 p-3 rounded-lg border border-red-500/20">
                      <div className="flex items-center gap-2 text-xs text-red-400 font-bold mb-2">
                         <AlertTriangle size={12} /> تنبيه الذكاء الاصطناعي:
                      </div>
                      <p className="text-xs text-slate-400 mb-3">
                         هذا التعديل يتطلب إعادة المونتاج الصوتي (Audio Re-mix). هذا عادة لا يشمل السعر الأصلي بعد التسليم.
                      </p>
                      <div className="flex justify-between items-center">
                         <span className="text-white font-bold">التكلفة المقترحة: {comment.cost}</span>
                         <Button size="sm" className="bg-white text-black hover:bg-slate-200 text-xs font-bold gap-1">
                            <PlusCircle size={12} /> إضافة للفاتورة
                         </Button>
                      </div>
                   </div>
                ) : (
                   <div className="text-[10px] text-green-500 flex items-center gap-1">
                      <Check size={10} /> ضمن النطاق المجاني
                   </div>
                )}
             </div>
          ))}
       </div>
    </div>
  );
}

