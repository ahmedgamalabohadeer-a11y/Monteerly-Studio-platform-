'use client'
import React from 'react';
import { MessageSquare, ShieldCheck, Send, Lock, Search } from 'lucide-react';

export default function EncryptedInbox() {
  return (
    <div className="min-h-screen bg-[#05050A] text-slate-50 flex flex-col md:flex-row font-sans pt-16 md:pt-20" dir="rtl">
      
      {/* القائمة الجانبية للمحادثات */}
      <div className="w-full md:w-1/3 lg:w-1/4 bg-[#0A0A0F] border-l border-white/5 flex flex-col h-[calc(100vh-5rem)]">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-2xl font-black mb-4 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-indigo-500" /> صندوق التفاوض
          </h2>
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input type="text" placeholder="بحث في المحادثات..." className="w-full bg-[#12121A] border border-white/10 rounded-xl py-2.5 pr-10 pl-4 text-sm focus:border-indigo-500 outline-none text-white" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {/* محادثة نشطة */}
          <div className="bg-[#12121A] border border-indigo-500/30 p-4 rounded-2xl cursor-pointer">
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-bold text-sm text-white">وكالة نون الإبداعية</h4>
              <span className="text-[10px] text-indigo-400 font-bold">الآن</span>
            </div>
            <p className="text-xs text-slate-400 truncate">هل يمكنك تسليم المشروع بصيغة ProRes؟</p>
          </div>
          {/* محادثة مقروءة */}
          <div className="hover:bg-[#12121A] p-4 rounded-2xl cursor-pointer transition-colors border border-transparent">
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-bold text-sm text-slate-300">أحمد (مستقل)</h4>
              <span className="text-[10px] text-slate-600">أمس</span>
            </div>
            <p className="text-xs text-slate-500 truncate">تم استلام الدفعة عبر نظام الضمان، شكراً لك.</p>
          </div>
        </div>
      </div>

      {/* مساحة الشات (Chat Area) */}
      <div className="flex-1 flex flex-col h-[calc(100vh-5rem)] bg-[#05050A] relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070')] opacity-[0.02] mix-blend-screen pointer-events-none"></div>
        
        <header className="p-6 border-b border-white/5 bg-[#0A0A0F]/80 backdrop-blur-md flex justify-between items-center z-10">
          <div>
            <h3 className="font-black text-lg text-white">وكالة نون الإبداعية</h3>
            <p className="text-xs text-emerald-400 flex items-center gap-1 mt-1"><ShieldCheck className="w-3 h-3" /> تم توثيق الهوية (KYC)</p>
          </div>
          <div className="flex items-center gap-2 bg-[#12121A] border border-white/5 px-3 py-1.5 rounded-lg text-xs text-slate-400 font-mono">
            <Lock className="w-3 h-3 text-emerald-500" /> E2E Encrypted
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 z-10">
          <div className="flex flex-col items-center justify-center text-center my-8">
            <ShieldCheck className="w-12 h-12 text-slate-700 mb-3" />
            <p className="text-xs text-slate-500 max-w-sm">لضمان حقوقك المالية عبر نظام (Escrow)، يرجى إبقاء جميع التفاوضات داخل هذه الغرفة المشفرة وعدم مشاركة وسائل تواصل خارجية.</p>
          </div>
          
          <div className="flex justify-start">
            <div className="bg-[#12121A] border border-white/10 p-4 rounded-2xl rounded-tr-none max-w-md">
              <p className="text-sm text-slate-300">مرحباً، لقد أعجبنا معرض أعمالك. لدينا مشروع إعلان تجاري بمدة 30 ثانية. ما هو تسعيرك المبدئي؟</p>
              <span className="text-[10px] text-slate-600 block mt-2">10:42 ص</span>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-indigo-600 border border-indigo-500/50 p-4 rounded-2xl rounded-tl-none max-w-md">
              <p className="text-sm text-white">أهلاً بك. الميزانية المبدئية هي 800$ وتتضمن التلوين السينمائي (Color Grading). يمكننا فتح مساحة عمل وبدء إيداع الضمان.</p>
              <span className="text-[10px] text-indigo-200 block mt-2">10:45 ص</span>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-white/5 bg-[#0A0A0F] z-10">
          <div className="flex items-center gap-2 bg-[#12121A] border border-white/10 p-2 rounded-2xl focus-within:border-indigo-500 transition-colors">
            <input type="text" placeholder="اكتب رسالتك المشفرة هنا..." className="flex-1 bg-transparent text-sm px-4 outline-none text-white" />
            <button className="bg-indigo-600 hover:bg-indigo-500 p-3 rounded-xl transition-all shadow-lg"><Send className="w-4 h-4 text-white" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
