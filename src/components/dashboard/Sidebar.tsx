'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { 
  LayoutDashboard, ShieldAlert, Landmark, Users, GraduationCap, 
  Settings, LogOut, FolderOpen, Zap, Book, X 
} from 'lucide-react';

export function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) {
  const pathname = usePathname();
  const params = useParams();
  const locale = params?.locale || 'ar';

  const navItems = [
    { name: 'لوحة التحكم', href: `/${locale}/dashboard`, icon: LayoutDashboard, color: 'text-slate-400' },
    { name: 'مركز العمليات', href: `/${locale}/dashboard/operations`, icon: ShieldAlert, color: 'text-indigo-400' },
    { name: 'الإدارة المالية', href: `/${locale}/dashboard/finance`, icon: Landmark, color: 'text-emerald-400' },
    { name: 'إدارة الوكالة', href: `/${locale}/dashboard/agency`, icon: Users, color: 'text-blue-400' },
    { name: 'الأكاديمية', href: `/${locale}/dashboard/academy`, icon: GraduationCap, color: 'text-amber-400' },
    { name: 'المشاريع', href: `/${locale}/dashboard/marketplace`, icon: FolderOpen, color: 'text-purple-400' },
    { name: 'الدليل التشغيلي', href: `/${locale}/dashboard/docs`, icon: Book, color: 'text-indigo-400' },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        fixed inset-y-0 right-0 z-[200] w-72 bg-slate-950 border-l border-slate-800 flex flex-col h-screen transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:block
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `} dir="rtl">
        
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Zap className="text-white" size={24} />
            </div>
            <h2 className="text-white font-black text-xl tracking-tight">MONTEERLY</h2>
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-slate-500">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${
                pathname === item.href ? 'bg-indigo-600/10 text-white border border-indigo-500/20' : 'text-slate-400 hover:bg-slate-900'
              }`}
            >
              <item.icon size={20} className={pathname === item.href ? 'text-indigo-400' : item.color} />
              <span className="text-sm font-bold">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/5">
            <LogOut size={20} />
            <span className="text-sm font-bold">خروج</span>
          </button>
        </div>
      </aside>
    </>
  );
}
