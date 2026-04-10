'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, Wallet, Video, FileText, Settings, LogOut, Zap, Gavel, Users, User } from 'lucide-react';

export const Sidebar = () => {
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname?.includes(path);

  const navItems = [
    { name: 'لوحة القيادة', path: '/dashboard', icon: LayoutDashboard },
    { name: 'المشاريع', path: '/projects', icon: Video },
    { name: 'سوق المبدعين', path: '/market', icon: ShoppingBag },
    { name: 'استوديو الإعلانات', path: '/ad-studio', icon: Zap },
    { name: 'المحفظة', path: '/wallet', icon: Wallet },
    { name: 'العقود', path: '/legal', icon: FileText },
    { name: 'فض النزاعات', path: '/disputes', icon: Gavel },
    { name: 'دعوة الأصدقاء', path: '/referral', icon: Users },
  ];

  return (
    <aside className="w-64 bg-brand-surface border-l border-gray-800 hidden md:flex flex-col h-screen fixed right-0 top-0 z-40 overflow-hidden">
      {/* Logo Area */}
      <div className="h-16 flex items-center gap-3 px-6 border-b border-gray-800 shrink-0">
        <div className="w-8 h-8 bg-gradient-to-tr from-brand-secondary to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
          M
        </div>
        <span className="font-cairo font-bold text-xl text-white tracking-wide">Monteerly</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => (
          <Link 
            key={item.path} 
            href={`/ar${item.path}`}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              isActive(item.path) 
                ? 'bg-brand-primary/10 text-brand-secondary border border-brand-primary/20 shadow-[0_0_15px_rgba(13,183,180,0.1)]' 
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <item.icon size={20} className={isActive(item.path) ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'} />
            <span className="font-medium text-sm">{item.name}</span>
            {isActive(item.path) && (
              <div className="mr-auto w-1.5 h-1.5 rounded-full bg-brand-secondary shadow-[0_0_8px_#0DB7B4]"></div>
            )}
          </Link>
        ))}
      </nav>

      {/* User & Settings */}
      <div className="p-4 border-t border-gray-800 shrink-0 space-y-1">
        <Link 
          href="/ar/profile"
          className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-colors ${isActive('/profile') ? 'text-white bg-gray-800' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
        >
          <User size={20} />
          <span className="font-medium text-sm">الملف الشخصي</span>
        </Link>
        <Link 
          href="/ar/settings"
          className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-colors ${isActive('/settings') ? 'text-white bg-gray-800' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
        >
          <Settings size={20} />
          <span className="font-medium text-sm">الإعدادات</span>
        </Link>
        <button className="flex items-center gap-3 w-full px-4 py-3 text-brand-alert hover:bg-brand-alert/10 rounded-xl transition-colors">
          <LogOut size={20} />
          <span className="font-medium text-sm">تسجيل خروج</span>
        </button>
      </div>
    </aside>
  );
};
