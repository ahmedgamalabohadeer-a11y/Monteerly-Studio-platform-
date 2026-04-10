'use client';
import React from 'react';
import { AlertTriangle, Upload, MessageSquare, Gavel } from 'lucide-react';
import { SecureInput } from '@/components/ui/SecureInput';

export default function DisputePage() {
  return (
    <div className="min-h-screen p-6 pb-24" dir="rtl">
      <div className="max-w-2xl mx-auto bg-brand-surface border border-gray-800 rounded-2xl overflow-hidden">
        <div className="bg-red-900/20 p-6 border-b border-red-500/20 flex items-center gap-4">
          <div className="p-3 bg-red-500/20 rounded-full text-red-500">
            <Gavel size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">فتح نزاع جديد</h1>
            <p className="text-red-300 text-sm">سيقوم فريق "مونتيرلي" بالتدخل للتحكيم بين الطرفين</p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-brand-dark p-4 rounded-lg border border-gray-700 text-sm text-gray-300">
            <strong className="text-white block mb-1">⚠️ تنبيه هام:</strong>
            يرجى التأكد من أنك حاولت حل المشكلة ودياً عبر الشات قبل فتح النزاع. بمجرد فتح النزاع، سيتم <strong>تجميد الأموال</strong> في محفظة الضمان لحين صدور الحكم.
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">اختر المشروع</label>
              <select className="w-full bg-brand-dark border border-gray-700 rounded-lg p-3 text-white outline-none focus:border-red-500">
                <option>إعلان قهوة عربي فاخرة v1</option>
                <option>وثائقي: تاريخ الأهرامات</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">سبب النزاع</label>
              <div className="grid grid-cols-2 gap-3">
                {['جودة سيئة', 'تأخر في التسليم', 'عدم استجابة', 'انتهاك حقوق ملكية'].map((reason) => (
                  <label key={reason} className="flex items-center gap-2 bg-brand-dark p-3 rounded-lg cursor-pointer hover:bg-gray-800">
                    <input type="radio" name="reason" className="text-red-500 focus:ring-red-500" />
                    <span className="text-sm text-gray-200">{reason}</span>
                  </label>
                ))}
              </div>
            </div>

            <SecureInput label="وصف المشكلة بالتفصيل" placeholder="اشرح ما حدث بدقة..." />

            <div className="border-2 border-dashed border-gray-700 rounded-xl p-6 text-center hover:border-gray-500 transition-colors cursor-pointer">
              <Upload className="mx-auto text-gray-500 mb-2" />
              <p className="text-sm text-gray-300">أرفق صور أو ملفات (اختياري)</p>
              <p className="text-xs text-gray-500">سيتم استدعاء سجل الشات تلقائياً كدليل</p>
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-800">
            <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl font-bold transition-colors">
              إلغاء
            </button>
            <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
              <AlertTriangle size={18} />
              رفع النزاع وتجميد الأموال
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
