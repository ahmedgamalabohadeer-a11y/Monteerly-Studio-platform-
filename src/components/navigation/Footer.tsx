import React from 'react';
import { Zap, Globe, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 pt-20 pb-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="text-indigo-500" size={24} />
            <span className="text-xl font-black">MONTEERLY</span>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed">نظام تشغيل مؤسسي متكامل يجمع بين الإنتاج الفني والحلول اللوجستية والمالية.</p>
        </div>
        <div>
          <h4 className="font-bold mb-6">المنصة</h4>
          <ul className="text-slate-500 text-sm space-y-4">
            <li>لوحة التحكم</li>
            <li>سوق الخبراء</li>
            <li>الأكاديمية</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6">قانوني</h4>
          <ul className="text-slate-500 text-sm space-y-4">
            <li>اتفاقية الاستخدام</li>
            <li>سياسة الخصوصية</li>
            <li>مركز التحكيم</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6">تواصل معنا</h4>
          <div className="flex items-center gap-3 text-slate-500 text-sm">
            <Mail size={16} /> support@monteerly.studio
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 pt-10 border-t border-slate-900 text-center text-slate-600 text-[10px] font-bold">
        © 2026 MONTEERLY STUDIO. جميع الحقوق محفوظة لـ أحمد جمال محمد عمر.
      </div>
    </footer>
  );
}
