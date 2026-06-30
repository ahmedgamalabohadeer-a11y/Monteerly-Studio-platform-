import os

# دالة مساعدة لكتابة الملفات
def write_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✅ تم إنشاء/تحديث: {path}")

# ==========================================
# 1. إنشاء مكون الشريط الجانبي (Sidebar)
# ==========================================
sidebar_code = """'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, ShoppingBag, Clapperboard, GraduationCap, MessageSquare, Users, Building2, Settings, LogOut } from 'lucide-react';

const NAV_ITEMS = [
  { name: 'الرئيسية', path: '/', icon: LayoutGrid },
  { name: 'سوق العمل', path: '/marketplace', icon: ShoppingBag },
  { name: 'الاستوديو', path: '/studio', icon: Clapperboard },
  { name: 'الأكاديمية', path: '/academy', icon: GraduationCap },
  { name: 'الرسائل', path: '/messages', icon: MessageSquare },
  { name: 'المجتمع', path: '/community', icon: Users },
  { name: 'الوكالة', path: '/agency', icon: Building2 },
];

export default function Sidebar() {
  const pathname = usePathname();

  // دالة مساعدة لتحديد الرابط النشط
  const isActive = (path) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname?.includes(path)) return true;
    return false;
  };

  return (
    <aside className="hidden lg:flex w-64 flex-col bg-slate-900 border-l border-slate-800 h-screen sticky top-0">
      {/* الشعار */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
          مونتيرلي ستوديو
        </h1>
      </div>

      {/* روابط التنقل */}
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.path);
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                active 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 ${active ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} />
              <span className="font-medium">{item.name}</span>
              {active && <span className="mr-auto w-1.5 h-1.5 bg-white rounded-full" />}
            </Link>
          );
        })}
      </nav>

      {/* تذييل الشريط (الملف الشخصي) */}
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center font-bold text-white">
            K
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white truncate">كريم المونتير</p>
            <p className="text-xs text-slate-500 truncate">محترف | Level 5</p>
          </div>
          <button className="text-slate-400 hover:text-white">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
"""
write_file("src/components/Sidebar.tsx", sidebar_code)

# ==========================================
# 2. تحديث التخطيط العام (Layout) لدمج الشريط
# ==========================================
layout_code = """import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Monteerly Studio | نظام تشغيل المبدعين",
  description: "المنصة المتكاملة للمونتير وصناع المحتوى",
};

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html lang={locale} dir="rtl">
      <body className={`${inter.className} bg-slate-950 text-white overflow-hidden`}>
        <div className="flex h-screen w-full">
          {/* الشريط الجانبي الثابت */}
          <Sidebar />
          
          {/* منطقة المحتوى الرئيسية */}
          <main className="flex-1 h-full overflow-y-auto relative scroll-smooth">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
"""
write_file("src/app/[locale]/layout.tsx", layout_code)

print("\n🚀 تم تنفيذ الحزمة السابعة بنجاح: تم ربط جميع الصفحات بالشريط الجانبي.")
