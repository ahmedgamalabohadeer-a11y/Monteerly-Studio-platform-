import React from 'react';
import { SecureInput } from '@/components/ui/SecureInput';
import { Wand2, Upload, Play } from 'lucide-react';

export default function AdStudioPage() {
  return (
    <div className="min-h-screen bg-brand-dark text-white p-6" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-brand-alert/10 rounded-full mb-4">
            <Wand2 className="text-brand-alert" size={32} />
          </div>
          <h1 className="text-4xl font-bold font-cairo mb-2 bg-gradient-to-r from-brand-alert to-brand-secondary bg-clip-text text-transparent">
            مولد الإعلانات الذكي
          </h1>
          <p className="text-gray-400">حول منتجك إلى فيديو إعلاني احترافي باستخدام الذكاء الاصطناعي في ثوانٍ</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-brand-surface p-6 rounded-2xl border border-gray-700">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-secondary text-brand-dark flex items-center justify-center text-sm">1</span>
              بيانات الإعلان
            </h3>
            
            <div className="space-y-4">
              <SecureInput label="اسم المنتج / الخدمة" placeholder="مثال: قهوة عربي فاخرة" />
              
              <div>
                <label className="text-sm text-gray-300 mb-2 block">الهدف من الإعلان</label>
                <div className="grid grid-cols-3 gap-2">
                  <button className="p-2 rounded-lg bg-brand-primary/20 border border-brand-primary text-brand-primary text-sm">مبيعات</button>
                  <button className="p-2 rounded-lg bg-slate-950 border border-gray-700 text-gray-400 text-sm">وعي بالعلامة</button>
                  <button className="p-2 rounded-lg bg-slate-950 border border-gray-700 text-gray-400 text-sm">زيارات</button>
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-700 rounded-xl p-8 text-center cursor-pointer hover:border-brand-secondary transition-colors">
                <Upload className="mx-auto text-gray-500 mb-2" />
                <p className="text-sm text-gray-300">ارفع صور المنتج هنا</p>
                <p className="text-xs text-gray-500">JPG, PNG بحد أقصى 5MB</p>
              </div>

              <button className="w-full bg-gradient-to-r from-brand-alert to-purple-600 p-4 rounded-xl font-bold text-white shadow-lg shadow-brand-alert/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
                <Wand2 size={20} />
                توليد الفيديو (50 نقطة)
              </button>
            </div>
          </div>

          {/* Preview Placeholder */}
          <div className="bg-black/50 rounded-2xl border border-gray-800 flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent opacity-60"></div>
            <div className="text-center p-6 relative z-10">
              <div className="w-20 h-20 bg-slate-950/10 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform cursor-pointer">
                <Play className="text-white ml-1" size={32} />
              </div>
              <p className="text-gray-400 text-sm">ستظهر المعاينة هنا بعد التوليد</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
