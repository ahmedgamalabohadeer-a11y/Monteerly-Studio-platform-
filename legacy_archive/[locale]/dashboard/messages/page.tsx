'use client';
import React from 'react';
import { MessageSquare, ShieldCheck, Zap, MoreVertical } from 'lucide-react';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { SecureChat } from '@/components/chat/SecureChat';
import { OfferBubble } from '@/components/chat/OfferBubble';

export default function MessagesPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-100px)] bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden mx-6 my-4 shadow-2xl" dir="rtl">
      
      {/* Header - شريط حالة الأمان */}
      <div className="bg-slate-900 border-b border-slate-800 p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-600/20 rounded-full flex items-center justify-center border border-indigo-500/30">
            <MessageSquare className="text-indigo-400" size={20} />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">مركز المراسلات المؤمن</h1>
            <div className="flex items-center gap-1.5">
               <ShieldCheck size={12} className="text-emerald-500" />
               <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">End-to-End Encrypted</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[10px] text-slate-500 font-bold">حالة الربط</span>
            <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
               <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> متصل الآن
            </span>
          </div>
          <button className="p-2 text-slate-400 hover:bg-slate-800 rounded-lg transition-colors">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* المكون الرئيسي من الأرشيف: واجهة الشات */}
        <div className="flex-1 relative flex flex-col bg-slate-950">
           <ChatInterface />
           
           {/* طبقة الأمان الإضافية ودمج العروض العقودية */}
           <div className="absolute top-4 right-4 z-10 w-72 space-y-3 pointer-events-none">
              <div className="pointer-events-auto">
                 <SecureChat />
              </div>
              <div className="pointer-events-auto opacity-90 hover:opacity-100 transition-opacity">
                 <OfferBubble 
                    price="$1,200" 
                    deadline="5 أيام" 
                    onAccept={() => console.log('Accepted')} 
                 />
              </div>
           </div>
        </div>

      </div>

      {/* Footer Note */}
      <div className="bg-slate-900/50 p-2 text-center border-t border-slate-800">
        <p className="text-[10px] text-slate-600">
          جميع المحادثات موثقة قانونياً وتخضع لاتفاقية الخصوصية الخاصة بـ Monteerly Studio.
        </p>
      </div>
    </div>
  );
}
