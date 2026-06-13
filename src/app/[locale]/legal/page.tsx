// @ts-expect-error: legacy compatibility
'use client';
import React, { useState } from 'react';
import { Shield, FileCheck, PenTool } from 'lucide-react';
import { ContractWizard } from '@/components/legal/ContractWizard';
import { SignaturePad } from '@/components/legal/SignaturePad';

export default function LegalPage() {
  const [showWizard, setShowWizard] = useState(false);

  return (
    <div className="min-h-screen space-y-8 animate-in fade-in duration-700" dir="rtl">
      {!showWizard ? (
        <div className="max-w-4xl mx-auto py-10">
          <div className="text-center mb-12">
            <Shield className="mx-auto text-brand-success w-16 h-16 mb-4" />
            <h1 className="text-4xl font-bold text-white font-cairo">المنظومة القانونية السيادية</h1>
            <p className="text-gray-400 mt-2">إدارة العقود الذكية والتوقيعات الرقمية المعتمدة</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div onClick={() => setShowWizard(true)} className="group bg-brand-surface p-8 rounded-3xl border border-gray-800 hover:border-brand-primary transition-all cursor-pointer">
              <FileCheck className="text-brand-primary mb-4 w-10 h-10" />
              <h3 className="text-xl font-bold text-white mb-2">إنشاء عقد جديد</h3>
              <p className="text-gray-400 text-sm">صياغة عقود إنتاج وتصدير احترافية بنظام الأتمتة.</p>
            </div>

            <div className="bg-brand-surface p-8 rounded-3xl border border-gray-800">
              <PenTool className="text-brand-success mb-4 w-10 h-10" />
              <h3 className="text-xl font-bold text-white mb-2">اختبار التوقيع الرقمي</h3>
              <SignaturePad />
              <p className="text-gray-500 text-[10px] mt-2">وحدة SignaturePad نشطة ومؤمنة (v5.0)</p>
            </div>
          </div>
        </div>
      ) : (
        <ContractWizard onBack={() => setShowWizard(false)} />
      )}
    </div>
  );
}
