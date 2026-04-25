'use client';
import React from 'react';
import { SignaturePad } from '@/components/legal/SignaturePad';
import { FileText, Shield, Download, Printer } from 'lucide-react';

export default function LegalPage() {
  return (
    <div className="min-h-screen p-6 pb-24" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold font-cairo text-white flex items-center gap-2">
              <Shield className="text-brand-success" />
              مركز العقود والملفات
            </h1>
            <p className="text-gray-400 text-sm">جميع تعاملاتك محمية بعقود رقمية ملزمة</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 text-white"><Printer size={20} /></button>
            <button className="p-2 bg-brand-secondary text-brand-dark rounded-lg font-bold flex items-center gap-2">
              <Download size={20} /> تحميل PDF
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Contract Viewer */}
          <div className="md:col-span-2 bg-white text-gray-900 p-8 rounded-2xl shadow-2xl font-serif leading-relaxed h-[600px] overflow-y-auto relative">
            <div className="absolute top-4 left-4 opacity-10">
              <Shield size={100} />
            </div>
            
            <h2 className="text-2xl font-bold text-center mb-6 border-b pb-4">عقد اتفاق إنتاج محتوى إعلامي</h2>
            
            <p className="mb-4 text-justify">
              إنه في يوم <strong>الجمعة 6 فبراير 2026</strong>، تم الاتفاق بين كل من:<br/>
              <strong>الطرف الأول (العميل):</strong> شركة الأفق الرقمي<br/>
              <strong>الطرف الثاني (المبدع):</strong> أحمد محمد (Monteerly Studio)
            </p>

            <h3 className="font-bold mb-2 mt-4">1. التزامات الطرف الثاني</h3>
            <p className="mb-2 text-sm">يلتزم الطرف الثاني بتسليم عدد (1) فيديو إعلاني مدته 30 ثانية بجودة 4K، وفقاً للمواصفات الفنية المرفقة في المشروع رقم #8821.</p>

            <h3 className="font-bold mb-2 mt-4">2. حقوق الملكية</h3>
            <p className="mb-2 text-sm">تنتقل جميع حقوق الملكية الفكرية للعمل النهائي إلى الطرف الأول فور سداد كامل المستحقات المالية عبر منصة Monteerly.</p>

            <h3 className="font-bold mb-2 mt-4">3. شروط الضمان (Escrow)</h3>
            <p className="mb-2 text-sm">يقر الطرفان بأن المبلغ المودع في محفظة الضمان لا يتم تحريره إلا بموافقة الطرف الأول، وفي حال النزاع يتم الرجوع لإدارة المنصة.</p>
            
            <div className="mt-12 pt-8 border-t flex justify-between">
              <div className="text-center">
                <p className="font-bold mb-2">توقيع الطرف الأول</p>
                <div className="text-brand-primary font-dancing-script">Digital Horizon Co.</div>
                <p className="text-xs text-gray-500 mt-1">تم التوقيع إلكترونياً</p>
              </div>
              
              <div className="text-center">
                <p className="font-bold mb-2">توقيع الطرف الثاني</p>
                <div className="text-gray-400 text-sm border-b border-dashed border-gray-400 pb-1">بانتظار التوقيع...</div>
              </div>
            </div>
          </div>

          {/* Action Sidebar */}
          <div className="space-y-6">
            <div className="bg-brand-surface p-6 rounded-2xl border border-gray-800">
              <h3 className="font-bold text-white mb-4">التوقيع الإلكتروني</h3>
              <p className="text-xs text-gray-400 mb-4">يرجى رسم توقيعك في المربع أدناه لاعتماد العقد وبدء العمل.</p>
              <SignaturePad />
              <button className="w-full mt-4 bg-brand-success hover:bg-emerald-600 text-white py-3 rounded-xl font-bold transition-colors shadow-lg shadow-brand-success/20">
                اعتماد وتوقيع العقد
              </button>
            </div>

            <div className="bg-blue-900/20 p-4 rounded-xl border border-blue-500/30 flex gap-3">
              <Shield className="text-blue-400 shrink-0" size={24} />
              <div className="text-xs text-blue-200">
                هذا العقد معتمد قانونياً وفقاً لقانون المعاملات الإلكترونية ولائحة حماية البيانات.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
