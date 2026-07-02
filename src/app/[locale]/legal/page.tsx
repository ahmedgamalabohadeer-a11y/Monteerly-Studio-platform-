'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  AlertTriangle,
  BookOpen,
  Download,
  FileCheck,
  PenTool,
  Shield,
} from 'lucide-react';
import { ContractWizard } from '@/components/legal/ContractWizard';
import { SignaturePad } from '@/components/legal/SignaturePad';

const tabs = [
  { id: 'wizard', label: 'إنشاء عقد', icon: FileCheck },
  { id: 'tos', label: 'شروط الخدمة', icon: BookOpen },
  { id: 'privacy', label: 'الخصوصية', icon: Shield },
  { id: 'signature', label: 'اختبار التوقيع', icon: PenTool },
  { id: 'escrow', label: 'ميثاق الضمان', icon: AlertTriangle },
] as const;

type TabId = (typeof tabs)[number]['id'];

export default function LegalPage() {
  const [activeTab, setActiveTab] = useState<TabId>('wizard');
  const [savedSignature, setSavedSignature] = useState<string | null>(null);

  const handleSign = (signatureData: string) => {
    setSavedSignature(signatureData);
    console.log('صورة التوقيع:', signatureData);
  };

  return (
    <section className="mx-auto w-full max-w-6xl space-y-8 px-4 py-6 md:px-6 md:py-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-black text-slate-50 md:text-4xl">
          المنظومة القانونية السيادية
        </h1>
        <p className="max-w-3xl text-sm leading-7 text-slate-400 md:text-base">
          إدارة العقود والسياسات والتوقيعات المعتمدة داخل بيئة تشغيل هادئة وواضحة،
          مع تقليل الضجيج البصري وإبقاء التركيز على الإجراء القانوني نفسه.
        </p>
      </header>

      <div className="flex gap-2 overflow-x-auto pb-2 md:gap-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-all md:px-5 md:py-3 ${
                isActive
                  ? 'border-indigo-500 bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                  : 'border-white/10 bg-[#12121A] text-slate-400 hover:border-slate-600 hover:text-white'
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="min-h-[500px] rounded-3xl border border-white/5 bg-[#0A0A0F] p-6 shadow-2xl md:p-10">
        {activeTab === 'wizard' && <ContractWizard onBack={() => {}} />}

        {activeTab === 'signature' && (
          <div className="mx-auto max-w-md space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-bold text-slate-50">
                وحدة اختبار التوقيع
              </h2>
              <p className="text-sm leading-7 text-slate-400">
                هذه المساحة مخصصة لاختبار التقاط التوقيع الرقمي وتحويله إلى بيانات
                قابلة للحفظ.
              </p>
            </div>

            <SignaturePad onSign={handleSign} />

            {savedSignature && (
              <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                <p className="mb-3 text-xs font-bold text-emerald-400">
                  تم التقاط التوقيع بنجاح.
                </p>

                <div className="mx-auto overflow-hidden rounded-lg border border-slate-700 bg-slate-900">
                  <Image
                    src={savedSignature}
                    alt="توقيع محفوظ"
                    width={640}
                    height={240}
                    className="h-auto max-h-24 w-full object-contain"
                    unoptimized
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'tos' && (
          <div className="mx-auto max-w-3xl space-y-6">
            <h2 className="border-b border-white/10 pb-4 text-3xl font-black text-slate-50">
              شروط الخدمة
            </h2>

            <div className="space-y-4 text-sm leading-8 text-slate-300 md:text-base">
              <p>
                تمثل هذه الشروط الاتفاقية الملزمة قانوناً بينك وبين منصة
                Monteerly OS.
              </p>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white">
                  1. الحسابات والسيادة
                </h3>
                <p>
                  تلتزم المنصة بتوفير بيئة سيادية لحفظ حقوق المبدعين، ولا يحق لأي
                  طرف ثالث الاطلاع على ملفات المشاريع قيد التنفيذ دون تفويض
                  مشروع.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white">
                  2. الملكية الفكرية
                </h3>
                <p>
                  بمجرد تحرير الدفعة المالية من حساب الضمان، تنتقل حقوق الملكية
                  الفكرية للمشروع إلى العميل بحسب شروط العقد المعتمد بين الطرفين.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-500/10 px-4 py-2 font-bold text-indigo-400 transition-colors hover:text-indigo-300"
            >
              <Download size={16} />
              تحميل النسخة المعتمدة (PDF)
            </button>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="mx-auto max-w-3xl space-y-6">
            <h2 className="border-b border-white/10 pb-4 text-3xl font-black text-slate-50">
              سياسة الخصوصية
            </h2>

            <div className="space-y-4 text-sm leading-8 text-slate-300 md:text-base">
              <p>نحن نتعامل مع بياناتك بأعلى معايير الحماية والتقليل من الوصول.</p>

              <ul className="list-disc space-y-2 pr-5 marker:text-slate-500">
                <li>يتم تشفير المحادثات وتفاصيل المشاريع داخل مسارات العمل الحساسة.</li>
                <li>
                  لا نشارك البيانات المالية مع أطراف خارجية إلا بقدر ما يلزم
                  لإتمام خدمات الدفع والتسوية.
                </li>
                <li>
                  يتم حذف ملفات المشاريع المكتملة من طبقات التخزين السريع بعد
                  انتهاء مدة الاحتفاظ المعتمدة.
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'escrow' && (
          <div className="mx-auto max-w-3xl space-y-6">
            <h2 className="border-b border-white/10 pb-4 text-3xl font-black text-slate-50">
              ميثاق الضمان المالي
            </h2>

            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-6 text-amber-100">
              <h3 className="mb-2 flex items-center gap-2 font-bold text-amber-400">
                <Shield size={20} />
                حماية الطرفين
              </h3>

              <p className="mb-4 text-sm leading-7">
                نظام الضمان المالي مصمم لمنع الاحتيال. لا يبدأ التنفيذ إلا بعد
                إيداع العميل للمبلغ، ولا يُصرف المستحق إلا بعد التسليم أو تحقق
                شروط الإفراج المحددة تعاقدياً.
              </p>

              <div className="space-y-2 rounded-xl bg-black/20 p-4 font-mono text-xs leading-6">
                <p>1. العميل يودع $1000 والمبلغ يبقى في حالة Pending</p>
                <p>2. المستقل يبدأ العمل</p>
                <p>3. المستقل يسلم العمل والعميل يعتمد</p>
                <p>4. يتم تحرير المبلغ ويصل صافي المستحق بعد خصم رسوم المنصة</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
