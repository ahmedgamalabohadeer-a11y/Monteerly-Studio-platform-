'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';

export function EmailPreview() {
  const [template, setTemplate] = useState('welcome');

  return (
    <div className="bg-card border border-border rounded-xl h-[800px] flex">
       {/* Sidebar */}
       <div className="w-64 border-r border-border p-4 bg-muted/10">
          <h3 className="font-bold mb-4">القوالب</h3>
          <div className="space-y-2">
             <TemplateBtn active={template === 'welcome'} onClick={() => setTemplate('welcome')} label="ترحيب (Welcome)" />
             <TemplateBtn active={template === 'reset'} onClick={() => setTemplate('reset')} label="استعادة كلمة المرور" />
             <TemplateBtn active={template === 'invoice'} onClick={() => setTemplate('invoice')} label="إشعار فاتورة" />
             <TemplateBtn active={template === 'message'} onClick={() => setTemplate('message')} label="رسالة جديدة" />
          </div>
       </div>

       {/* Preview Area (Simulating HTML Email) */}
       <div className="flex-1 bg-slate-100 p-8 overflow-y-auto flex justify-center">
          <div className="w-full max-w-[600px] bg-white shadow-xl min-h-[500px] rounded-lg overflow-hidden">
             {/* Email Header */}
             <div className="bg-slate-900 p-6 text-center">
                <div className="text-white font-bold text-xl">Monteerly</div>
             </div>
             
             {/* Email Body */}
             <div className="p-8 text-slate-800 space-y-6">
                {template === 'welcome' && (
                   <>
                      <h1 className="text-2xl font-bold">مرحباً بك يا أحمد! 👋</h1>
                      <p>شكراً لانضمامك إلى مجتمع Monteerly. نحن متحمسون لرؤية إبداعاتك.</p>
                      <Button className="bg-primary text-white w-full py-3 rounded">ابدأ استكشاف المشاريع</Button>
                   </>
                )}
                {template === 'reset' && (
                   <>
                      <h1 className="text-xl font-bold">إعادة تعيين كلمة المرور</h1>
                      <p>تلقينا طلباً لتغيير كلمة المرور الخاصة بك. اضغط على الزر أدناه للمتابعة.</p>
                      <Button className="bg-slate-900 text-white w-full py-3 rounded">تغيير كلمة المرور</Button>
                      <p className="text-xs text-slate-500 mt-4">هذا الرابط صالح لمدة 30 دقيقة فقط.</p>
                   </>
                )}
             </div>

             {/* Email Footer */}
             <div className="bg-slate-50 p-6 text-center text-xs text-slate-500 border-t border-slate-200">
                © 2026 Monteerly Inc. Cairo, Egypt.<br/>
                <a href="#" className="underline">Unsubscribe</a>
             </div>
          </div>
       </div>
    </div>
  );
}

function TemplateBtn({ label, active, onClick }: any) {
    return (
        <button 
           onClick={onClick}
           className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${active ? 'bg-primary text-white' : 'hover:bg-muted text-muted-foreground'}`}
        >
           {label}
        </button>
    )
}

