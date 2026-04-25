'use client';
import React from 'react';
import { useSuperID } from '@/lib/context/SuperIDContext';
import { Home, Film, ShoppingBag, GraduationCap, LayoutGrid, Settings, Shield } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NeuralSidebar() {
  const { identity } = useSuperID();
  const pathname = usePathname();

  // القوائم تتغير ديناميكياً بناءً على "الشخصية" (Persona)
  const menus = {
    rookie: [
      { icon: Home, label: 'الرئيسية', href: '/dashboard' },
      { icon: GraduationCap, label: 'الأكاديمية', href: '/academy' }, // التركيز على التعلم
      { icon: Film, label: 'الاستوديو (Lite)', href: '/studio' },
    ],
    pro: [
      { icon: LayoutGrid, label: 'القيادة', href: '/command-center' },
      { icon: Film, label: 'الاستوديو', href: '/studio' }, // التركيز على الإنتاج
      { icon: ShoppingBag, label: 'السوق', href: '/marketplace' },
      { icon: Shield, label: 'العقود', href: '/contracts' },
    ],
    enterprise: [
      { icon: LayoutGrid, label: 'نظرة عامة', href: '/admin/overview' },
      { icon: Film, label: 'إدارة الإنتاج', href: '/production' },
      { icon: Settings, label: 'إدارة الفريق', href: '/team' },
    ]
  };

  const currentMenu = menus[identity.persona];

  return (
    <div className="w-20 lg:w-64 border-r border-white/10 h-screen bg-black flex flex-col justify-between p-4">
       {/* Logo Area */}
       <div className="mb-8 flex items-center gap-3 px-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-black text-white">M</div>
          <div className="hidden lg:block font-bold text-white tracking-wider">MONTEERLY</div>
       </div>

       {/* Dynamic Menu */}
       <nav className="flex-1 space-y-2">
          <div className="text-[10px] font-bold text-slate-500 uppercase px-2 mb-2 hidden lg:block">
             {identity.persona === 'rookie' ? 'Learning Path' : identity.persona === 'pro' ? 'Production Suite' : 'Enterprise Control'}
          </div>
          
          {currentMenu.map((item, idx) => {
             const isActive = pathname === item.href;
             return (
               <Link 
                 key={idx} 
                 href={item.href}
                 className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                    isActive 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                 }`}
               >
                  <item.icon size={20} />
                  <span className="hidden lg:block text-sm font-medium">{item.label}</span>
               </Link>
             );
          })}
       </nav>

       {/* User Profile Snippet */}
       <div className="border-t border-white/10 pt-4 mt-4">
          <div className="flex items-center gap-3 px-2">
             <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 border border-white/20"></div>
             <div className="hidden lg:block overflow-hidden">
                <div className="text-sm font-bold text-white truncate">{identity.name}</div>
                <div className="text-[10px] text-green-400 font-mono">ID: {identity.id}</div>
             </div>
          </div>
       </div>
    </div>
  );
}

################################################################################