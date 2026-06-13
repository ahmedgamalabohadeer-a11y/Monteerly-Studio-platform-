// @ts-expect-error: legacy compatibility
import React from 'react';
import Link from 'next/link';
import { Linkedin, Share2, Video } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="container px-4 mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
           {/* Brand */}
           <div className="space-y-4">
              <div className="flex items-center gap-2 font-bold text-xl">
                 <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">M</div>
                 <span>Monteerly</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                 المنصة الأولى عربياً لربط صناع المحتوى بأفضل المونتيرية والمصممين في بيئة آمنة واحترافية.
              </p>
           </div>

           {/* Links 1 */}
           <div>
              <h4 className="font-bold mb-4">الشركة</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                 <li><Link href="/about" className="hover:text-primary">من نحن</Link></li>
                 <li><Link href="/careers" className="hover:text-primary">وظائف</Link></li>
                 <li><Link href="/blog" className="hover:text-primary">المدونة</Link></li>
              </ul>
           </div>

           {/* Links 2 */}
           <div>
              <h4 className="font-bold mb-4">الدعم</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                 <li><Link href="/help" className="hover:text-primary">مركز المساعدة</Link></li>
                 <li><Link href="/terms" className="hover:text-primary">شروط الخدمة</Link></li>
                 <li><Link href="/privacy" className="hover:text-primary">الخصوصية</Link></li>
              </ul>
           </div>

           {/* Newsletter */}
           <div>
              <h4 className="font-bold mb-4">اشترك في النشرة</h4>
              <div className="flex gap-2">
                 <input type="email" placeholder="بريدك الإلكتروني" className="bg-slate-800 border-none rounded-lg px-3 py-2 text-sm w-full outline-none focus:ring-1 focus:ring-primary" />
                 <button className="bg-primary px-3 py-2 rounded-lg text-sm font-bold hover:bg-primary/90">Go</button>
              </div>
              <div className="flex gap-4 mt-6">
                 <Share2 size={20} className="text-slate-400 hover:text-white cursor-pointer" />
                 <Video size={20} className="text-slate-400 hover:text-white cursor-pointer" />
                 <Share2 size={20} className="text-slate-400 hover:text-white cursor-pointer" />
              </div>
           </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-xs text-slate-500">
           © 2026 Monteerly Studio Inc. All rights reserved. Cairo, Egypt.
        </div>
      </div>
    </footer>
  );
}

