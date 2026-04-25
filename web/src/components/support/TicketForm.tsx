'use client';
import React from 'react';
import { Send, Paperclip, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function TicketForm() {
  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl p-8 max-w-2xl mx-auto shadow-2xl">
       <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
          <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-full"><AlertCircle size={24} /></div>
          <div>
             <h3 className="font-bold text-white text-lg">فتح تذكرة دعم</h3>
             <p className="text-slate-400 text-sm">فريقنا متاح 24/7 لمساعدتك. متوسط وقت الرد: 15 دقيقة.</p>
          </div>
       </div>

       <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-xs text-slate-300 mb-1.5">الاسم الكامل</label>
                <input type="text" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-indigo-500 outline-none transition-all" defaultValue="محمد كمال" />
             </div>
             <div>
                <label className="block text-xs text-slate-300 mb-1.5">البريد الإلكتروني</label>
                <input type="email" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-indigo-500 outline-none transition-all" defaultValue="mohamed@example.com" />
             </div>
          </div>

          <div>
             <label className="block text-xs text-slate-300 mb-1.5">نوع المشكلة</label>
             <select className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-indigo-500 outline-none appearance-none">
                <option>مشكلة تقنية في المشغل</option>
                <option>استفسار عن الفواتير والمدفوعات</option>
                <option>الإبلاغ عن محتوى مسيء</option>
                <option>طلب ميزة جديدة</option>
                <option>أخرى</option>
             </select>
          </div>

          <div>
             <label className="block text-xs text-slate-300 mb-1.5">التفاصيل</label>
             <textarea className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-indigo-500 outline-none h-32 resize-none" placeholder="اشرح مشكلتك بالتفصيل..." />
          </div>

          <div>
             <label className="flex items-center gap-2 w-fit px-4 py-2 bg-white/5 border border-white/10 rounded-lg cursor-pointer hover:bg-white/10 transition-colors text-sm text-slate-300">
                <Paperclip size={16} /> إرفاق لقطة شاشة أو ملف سجل (Logs)
                <input type="file" className="hidden" />
             </label>
          </div>

          <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 mt-4 shadow-lg shadow-indigo-500/20">
             <Send size={16} className="ml-2" /> إرسال التذكرة
          </Button>
       </div>
    </div>
  );
}

