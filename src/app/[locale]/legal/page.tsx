'use client';
import React, { useState } from 'react';
import { Shield, FileCheck, PenTool, BookOpen, Download, AlertTriangle } from 'lucide-react';
import { ContractWizard } from '@/components/legal/ContractWizard';
import { SignaturePad } from '@/components/legal/SignaturePad';

const tabs = [
  { id: 'wizard', label: 'إنشاء عقد', icon: FileCheck },
  { id: 'tos', label: 'شروط الخدمة', icon: BookOpen },
  { id: 'privacy', label: 'الخصوصية', icon: Shield },
  { id: 'signature', label: 'اختبار التوقيع', icon: PenTool },
  { id: 'escrow', label: 'ميثاق الضمان', icon: AlertTriangle }
];

export default function LegalPage() {
  const [activeTab, setActiveTab] = useState('wizard');
  const [savedSignature, setSavedSignature] = useState<string | null>(null);

  const handleSign = (signatureData: string) => {
    setSavedSignature(signatureData);
    alert('تم التقاط التوقيع بنجاح (راجع وحدة التحكم)');
    console.log("صورة التوقيع:", signatureData);
  };

  return (
    <div className="min-h-screen bg-[#05050A] text-white p-4 md:p-8 animate-in fade-in duration-700" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 text-center">
            <h1 className="text-3xl md:text-5xl font-black mb-4">المنظومة القانونية السيادية</h1>
            <p className="text-gray-400">إدارة العقود، السياسات، والتواقيع المعتمدة في بيئة مشفرة (AES-256).</p>
        </header>

        <div className="flex gap-2 md:gap-4 mb-8 overflow-x-auto pb-4 hide-scrollbar justify-start md:justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-full border transition-all font-bold text-sm ${activeTab === tab.id ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20' : 'bg-[#12121A] border-white/5 text-gray-400 hover:text-white hover:border-gray-600'}`}
            >
              <tab.icon size={16} /> {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-[#0A0A0F] border border-white/5 rounded-3xl p-6 md:p-10 min-h-[500px] shadow-2xl">
          {activeTab === 'wizard' && <ContractWizard onBack={() => {}} />}
          
          {activeTab === 'signature' && (
             <div className="max-w-md mx-auto space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">وحدة اختبار التوقيع</h2>
                  <p className="text-sm text-gray-400">هذه المساحة مخصصة لاختبار التقاط التوقيع الرقمي وتحويله إلى بيانات قابلة للحفظ (Base64).</p>
                </div>
                <SignaturePad onSign={handleSign} />
                {savedSignature && (
                  <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                    <p className="text-emerald-400 text-xs font-bold mb-2">تم التقاط التوقيع بنجاح!</p>
                    <img src={savedSignature} alt="توقيع محفوظ" className="bg-slate-900 border border-slate-700 rounded-lg max-h-24 mx-auto" />
                  </div>
                )}
             </div>
          )}
          
          {activeTab === 'tos' && (
            <div className="space-y-6 max-w-3xl mx-auto">
               <h2 className="text-3xl font-black border-b border-white/10 pb-4">شروط الخدمة (Terms of Service)</h2>
               <div className="prose prose-invert text-gray-300">
                  <p>تمثل هذه الشروط الاتفاقية الملزمة قانوناً بينك وبين منصة Monteerly OS.</p>
                  <h3 className="text-white font-bold mt-4">1. الحسابات والسيادة</h3>
                  <p>تلتزم المنصة بتوفير بيئة سيادية لحفظ حقوق المبدعين. لا يحق لأي طرف ثالث الاطلاع على ملفات المشاريع قيد التنفيذ.</p>
                  <h3 className="text-white font-bold mt-4">2. الملكية الفكرية</h3>
                  <p>بمجرد تحرير الدفعة المالية من حساب الضمان (Escrow)، تنتقل حقوق الملكية الفكرية للمشروع كاملة إلى العميل.</p>
               </div>
               <button className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-bold bg-indigo-500/10 px-4 py-2 rounded-lg"><Download size={16}/> تحميل النسخة المعتمدة (PDF)</button>
            </div>
          )}
          
          {activeTab === 'privacy' && (
            <div className="space-y-6 max-w-3xl mx-auto">
               <h2 className="text-3xl font-black border-b border-white/10 pb-4">سياسة الخصوصية (Privacy Policy)</h2>
               <div className="prose prose-invert text-gray-300">
                  <p>نحن نتعامل مع بياناتك بأعلى معايير التشفير.</p>
                  <ul className="list-disc pl-5 mt-4 space-y-2">
                    <li>يتم تشفير جميع المحادثات وتفاصيل المشاريع.</li>
                    <li>لا نشارك بياناتك المالية مع أطراف خارجية عدا مزودي خدمات الدفع (Paymob/Stripe).</li>
                    <li>يتم حذف ملفات المشاريع المكتملة تلقائياً من الخوادم السريعة بعد 30 يوماً من التسليم.</li>
                  </ul>
               </div>
            </div>
          )}

          {activeTab === 'escrow' && (
            <div className="space-y-6 max-w-3xl mx-auto">
               <h2 className="text-3xl font-black border-b border-white/10 pb-4">ميثاق الضمان المالي (Escrow)</h2>
               <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-2xl text-amber-100">
                  <h3 className="font-bold text-amber-400 mb-2 flex items-center gap-2"><Shield size={20}/> حماية الطرفين</h3>
                  <p className="text-sm leading-relaxed mb-4">نظام الضمان المالي مصمم لمنع الاحتيال. لا يتم بدء العمل إلا بعد إيداع العميل لكامل المبلغ، ولا يحصل المستقل على المبلغ إلا بعد تسليم العمل ورضا العميل.</p>
                  <div className="bg-black/20 p-4 rounded-xl text-xs space-y-2 font-mono">
                    <p>1. العميل يودع $1000 ➔ المبلغ في حالة (Pending)</p>
                    <p>2. المستقل يبدأ العمل</p>
                    <p>3. المستقل يسلم العمل ➔ العميل يعتمد</p>
                    <p>4. تحرير المبلغ ➔ المستقل يستلم $900 (خصم 10% رسوم المنصة)</p>
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
