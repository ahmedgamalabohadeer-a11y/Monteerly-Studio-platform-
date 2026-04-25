'use client';
import React from 'react';
import { AlertCircle, Check, X, DollarSign, Clock, FileVideo } from 'lucide-react';

export function ActionCenter() {
  const actions = [
    { 
      id: 1, 
      type: 'finance', 
      title: 'دفع معلق', 
      desc: 'العميل "TechCorp" تأخر عن الدفع 5 أيام. هل نرسل تذكيراً صارماً؟', 
      icon: DollarSign,
      color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
    },
    { 
      id: 2, 
      type: 'render', 
      title: 'اكتمال الريندر', 
      desc: 'ملف "Documentary_Final.mp4" جاهز. هل تريد نشره على يوتيوب فوراً؟', 
      icon: FileVideo,
      color: 'text-green-400 bg-green-400/10 border-green-400/20'
    },
    { 
      id: 3, 
      type: 'storage', 
      title: 'المساحة ممتلئة', 
      desc: 'مجلد "Raw Footage 2024" يستهلك 200GB. هل ننقله للأرشيف البارد (أرخص 50%)؟', 
      icon: Clock,
      color: 'text-blue-400 bg-blue-400/10 border-blue-400/20'
    }
  ];

  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl p-6 max-w-2xl mx-auto">
       <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-white flex items-center gap-2">
             <AlertCircle className="text-red-400" /> مركز القرارات (Action Center)
          </h3>
          <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full font-bold">3 Urgent</span>
       </div>

       <div className="space-y-4">
          {actions.map((action) => (
             <div key={action.id} className="bg-black/30 border border-white/5 rounded-xl p-4 flex gap-4 hover:bg-black/50 transition-colors group">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${action.color} border`}>
                   <action.icon size={20} />
                </div>
                
                <div className="flex-1">
                   <h4 className="font-bold text-white text-sm mb-1">{action.title}</h4>
                   <p className="text-xs text-slate-400 mb-3 leading-relaxed">{action.desc}</p>
                   
                   <div className="flex gap-3">
                      <button className="flex items-center gap-1 bg-white text-black px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-indigo-50 transition-colors">
                         <Check size={12} /> موافق
                      </button>
                      <button className="flex items-center gap-1 bg-transparent border border-white/10 text-slate-400 px-3 py-1.5 rounded-lg text-xs font-bold hover:text-white hover:bg-white/5 transition-colors">
                         <X size={12} /> تجاهل
                      </button>
                   </div>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
}

################################################################################