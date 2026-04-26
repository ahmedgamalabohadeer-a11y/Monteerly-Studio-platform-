'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';

export function EmailPreview() {
  const [template, setTemplate] = useState<'welcome' | 'invoice' | 'invite'>('welcome');

  const renderTemplate = () => {
    switch(template) {
      case 'welcome':
        return (
          <div className="bg-white text-black p-8 max-w-lg mx-auto rounded-lg shadow-xl font-sans">
             <div className="text-center mb-6">
                <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center font-black text-white text-xl mx-auto mb-2">M</div>
                <h2 className="text-2xl font-bold text-slate-900">أهلاً بك في العائلة!</h2>
             </div>
             <p className="text-slate-600 mb-6 leading-relaxed">
                مرحباً محمد،<br/><br/>
                نحن متحمسون جداً لانضمامك إلى Monteerly. لقد أصبحت الآن جزءاً من مجتمع يضم أكثر من 50,000 مبدع محترف.
             </p>
             <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-6 text-center">
                <p className="text-sm text-slate-500 mb-2">خطوتك التالية:</p>
                <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-700 w-full">إكمال ملفك الشخصي</button>
             </div>
          </div>
        );
      case 'invoice':
        return (
          <div className="bg-white text-black p-8 max-w-lg mx-auto rounded-lg shadow-xl font-sans">
             <div className="flex justify-between items-center mb-8 border-b pb-4">
                <div className="font-bold text-xl">Monteerly</div>
                <div className="text-sm text-slate-500">فاتورة #INV-2026-001</div>
             </div>
             <div className="mb-6">
                <h2 className="text-3xl font-bold text-slate-900 mb-1">$49.00</h2>
                <p className="text-slate-500">تم الدفع بنجاح في 15 يناير 2026</p>
             </div>
             <div className="space-y-3 mb-8">
                <div className="flex justify-between text-sm border-b border-dashed pb-2">
                   <span>خطة الوكالة (Agency Plan)</span>
                   <span className="font-bold">$49.00</span>
                </div>
                <div className="flex justify-between text-sm font-bold pt-2">
                   <span>الإجمالي</span>
                   <span>$49.00</span>
                </div>
             </div>
             <button className="bg-slate-900 text-white px-6 py-3 rounded-lg font-bold w-full">تحميل الفاتورة PDF</button>
          </div>
        );
      case 'invite':
        return (
           <div className="bg-white text-black p-8 max-w-lg mx-auto rounded-lg shadow-xl font-sans text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                 <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
              </div>
              <h2 className="text-xl font-bold mb-2">دعوة للانضمام إلى فريق</h2>
              <p className="text-slate-600 mb-6">
                 قام <strong>أحمد كمال</strong> بدعوتك للانضمام إلى مساحة عمل <strong>Vision Studio</strong>.
              </p>
              <div className="flex gap-2">
                 <button className="flex-1 bg-indigo-600 text-white px-4 py-3 rounded-lg font-bold">قبول الدعوة</button>
                 <button className="flex-1 bg-white border border-slate-200 text-slate-600 px-4 py-3 rounded-lg font-bold">رفض</button>
              </div>
           </div>
        );
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
       <div className="space-y-2">
          <Button onClick={() => setTemplate('welcome')} variant={template === 'welcome' ? 'default' : 'outline'} className="w-full justify-start">Welcome Email</Button>
          <Button onClick={() => setTemplate('invoice')} variant={template === 'invoice' ? 'default' : 'outline'} className="w-full justify-start">Invoice Receipt</Button>
          <Button onClick={() => setTemplate('invite')} variant={template === 'invite' ? 'default' : 'outline'} className="w-full justify-start">Team Invite</Button>
       </div>
       <div className="md:col-span-2 bg-slate-200 p-8 rounded-xl border border-slate-300">
          {renderTemplate()}
       </div>
    </div>
  );
}

