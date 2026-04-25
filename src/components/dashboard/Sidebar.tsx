'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { 
  LayoutDashboard, Sparkles, BarChart3, MessageSquare, 
  ShieldAlert, 
  Landmark, 
  Users, 
  GraduationCap, 
  Settings, Book, 
  LogOut,
  FolderOpen,
  ShoppingBag, Gavel, Library, Monitor,
  Zap
} from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();
  const params = useParams();
  const locale = params?.locale || 'ar';

  const navItems = [
    { 
      name: 'لوحة التحكم', 
    { 
      name: 'مركز البيانات والتحليلات', 
      href: `/${locale}/dashboard/analytics`, 
      icon: BarChart3, 
      color: 'text-emerald-400' 
    },
    { 
    { 
      name: 'مركز البيانات والتحليلات', 
      href: `/${locale}/dashboard/analytics`, 
      icon: BarChart3, 
      color: 'text-emerald-400' 
    },
      name: 'استوديو AI الذكي', 
    { 
      name: 'مركز البيانات والتحليلات', 
      href: `/${locale}/dashboard/analytics`, 
      icon: BarChart3, 
      color: 'text-emerald-400' 
    },
      href: `/${locale}/dashboard/ai-studio`, 
    { 
      name: 'مركز البيانات والتحليلات', 
      href: `/${locale}/dashboard/analytics`, 
      icon: BarChart3, 
      color: 'text-emerald-400' 
    },
      icon: Sparkles, BarChart3, 
    { 
      name: 'مركز البيانات والتحليلات', 
      href: `/${locale}/dashboard/analytics`, 
      icon: BarChart3, 
      color: 'text-emerald-400' 
    },
      color: 'text-indigo-400' 
    { 
      name: 'مركز البيانات والتحليلات', 
      href: `/${locale}/dashboard/analytics`, 
      icon: BarChart3, 
      color: 'text-emerald-400' 
    },
    },
    { 
      name: 'مركز البيانات والتحليلات', 
      href: `/${locale}/dashboard/analytics`, 
      icon: BarChart3, 
      color: 'text-emerald-400' 
    },
    { 
    { 
      name: 'استوديو AI الذكي', 
      href: `/${locale}/dashboard/ai-studio`, 
      icon: Sparkles, BarChart3, 
      color: 'text-indigo-400' 
    },
      name: 'الرسائل والمفاوضات', 
    { 
      name: 'استوديو AI الذكي', 
      href: `/${locale}/dashboard/ai-studio`, 
      icon: Sparkles, BarChart3, 
      color: 'text-indigo-400' 
    },
      href: `/${locale}/dashboard/messages`, 
    { 
      name: 'استوديو AI الذكي', 
      href: `/${locale}/dashboard/ai-studio`, 
      icon: Sparkles, BarChart3, 
      color: 'text-indigo-400' 
    },
      icon: MessageSquare, 
    { 
      name: 'استوديو AI الذكي', 
      href: `/${locale}/dashboard/ai-studio`, 
      icon: Sparkles, BarChart3, 
      color: 'text-indigo-400' 
    },
      color: 'text-indigo-400' 
    { 
      name: 'استوديو AI الذكي', 
      href: `/${locale}/dashboard/ai-studio`, 
      icon: Sparkles, BarChart3, 
      color: 'text-indigo-400' 
    },
    },
    { 
      name: 'استوديو AI الذكي', 
      href: `/${locale}/dashboard/ai-studio`, 
      icon: Sparkles, BarChart3, 
      color: 'text-indigo-400' 
    },
      href: `/${locale}/dashboard`, 
    { 
      name: 'الرسائل والمفاوضات', 
      href: `/${locale}/dashboard/messages`, 
      icon: MessageSquare, 
      color: 'text-indigo-400' 
    },
      icon: LayoutDashboard, Sparkles, BarChart3, MessageSquare,
    { 
      name: 'الرسائل والمفاوضات', 
      href: `/${locale}/dashboard/messages`, 
      icon: MessageSquare, 
      color: 'text-indigo-400' 
    },
      color: 'text-slate-400' 
    { 
      name: 'الرسائل والمفاوضات', 
      href: `/${locale}/dashboard/messages`, 
      icon: MessageSquare, 
      color: 'text-indigo-400' 
    },
    },
    { 
      name: 'الرسائل والمفاوضات', 
      href: `/${locale}/dashboard/messages`, 
      icon: MessageSquare, 
      color: 'text-indigo-400' 
    },
    { 
      name: 'مركز العمليات (OS)', 
      href: `/${locale}/dashboard/operations`, 
      icon: ShieldAlert,
      color: 'text-indigo-400' 
    },
    { 
      name: 'الإدارة المالية', 
      href: `/${locale}/dashboard/finance`, 
      icon: Landmark,
      color: 'text-emerald-400' 
    },
    { 
      name: 'إدارة الوكالة', 
      href: `/${locale}/dashboard/agency`, 
      icon: Users,
      color: 'text-blue-400' 
    },
    { 
      name: 'الأكاديمية', 
      href: `/${locale}/dashboard/academy`, 
      icon: GraduationCap,
      color: 'text-amber-400' 
    },
    { 
      name: 'المشاريع', 
    { 
      name: 'مكتبة الأصول', 
      href: `/${locale}/dashboard/library`, 
      icon: Library, 
      color: 'text-sky-400' 
    }, 
    { 
      name: 'مساحة العمل', 
      href: `/${locale}/dashboard/workspace`, 
      icon: Monitor, 
      color: 'text-rose-400' 
    },
    { 
    { 
      name: 'مكتبة الأصول', 
      href: `/${locale}/dashboard/library`, 
      icon: Library, 
      color: 'text-sky-400' 
    }, 
    { 
      name: 'مساحة العمل', 
      href: `/${locale}/dashboard/workspace`, 
      icon: Monitor, 
      color: 'text-rose-400' 
    },
      name: 'النزاعات والتحكيم', 
    { 
      name: 'مكتبة الأصول', 
      href: `/${locale}/dashboard/library`, 
      icon: Library, 
      color: 'text-sky-400' 
    }, 
    { 
      name: 'مساحة العمل', 
      href: `/${locale}/dashboard/workspace`, 
      icon: Monitor, 
      color: 'text-rose-400' 
    },
      href: `/${locale}/dashboard/disputes`, 
    { 
      name: 'مكتبة الأصول', 
      href: `/${locale}/dashboard/library`, 
      icon: Library, 
      color: 'text-sky-400' 
    }, 
    { 
      name: 'مساحة العمل', 
      href: `/${locale}/dashboard/workspace`, 
      icon: Monitor, 
      color: 'text-rose-400' 
    },
      icon: Gavel, 
    { 
      name: 'مكتبة الأصول', 
      href: `/${locale}/dashboard/library`, 
      icon: Library, 
      color: 'text-sky-400' 
    }, 
    { 
      name: 'مساحة العمل', 
      href: `/${locale}/dashboard/workspace`, 
      icon: Monitor, 
      color: 'text-rose-400' 
    },
      color: 'text-red-400' 
    { 
      name: 'مكتبة الأصول', 
      href: `/${locale}/dashboard/library`, 
      icon: Library, 
      color: 'text-sky-400' 
    }, 
    { 
      name: 'مساحة العمل', 
      href: `/${locale}/dashboard/workspace`, 
      icon: Monitor, 
      color: 'text-rose-400' 
    },
    },
    { 
      name: 'مكتبة الأصول', 
      href: `/${locale}/dashboard/library`, 
      icon: Library, 
      color: 'text-sky-400' 
    }, 
    { 
      name: 'مساحة العمل', 
      href: `/${locale}/dashboard/workspace`, 
      icon: Monitor, 
      color: 'text-rose-400' 
    },
      href: `/${locale}/dashboard/marketplace`, 
    { 
      name: 'النزاعات والتحكيم', 
      href: `/${locale}/dashboard/disputes`, 
      icon: Gavel, 
      color: 'text-red-400' 
    },
      icon: FolderOpen,
    { 
      name: 'النزاعات والتحكيم', 
      href: `/${locale}/dashboard/disputes`, 
      icon: Gavel, 
      color: 'text-red-400' 
    },
      color: 'text-purple-400' 
    { 
      name: 'النزاعات والتحكيم', 
      href: `/${locale}/dashboard/disputes`, 
      icon: Gavel, 
      color: 'text-red-400' 
    },
    },
    { 
      name: 'النزاعات والتحكيم', 
      href: `/${locale}/dashboard/disputes`, 
      icon: Gavel, 
      color: 'text-red-400' 
    },
  ];

  return (
    <aside className="w-72 bg-slate-950 border-l border-slate-800 flex flex-col h-screen sticky top-0" dir="rtl">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800 flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Zap className="text-white" size={24} />
        </div>
        <div>
          <h2 className="text-white font-black text-xl tracking-tight">MONTEERLY</h2>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Corporate OS v2</p>
        </div>
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
        <p className="text-[10px] font-bold text-slate-600 px-4 mb-4 uppercase tracking-widest">القائمة الرئيسية</p>
        
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-indigo-600/10 border border-indigo-500/20 text-white shadow-sm' 
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={20} className={isActive ? 'text-indigo-400' : item.color} />
                <span className="text-sm font-bold">{item.name}</span>
              </div>
              {isActive && <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-glow" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <Link
          href={`/${locale}/dashboard/settings`}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-900 transition-colors"
        >
          <Settings size={20} />
          <span className="text-sm font-bold">الإعدادات</span>
        </Link>
        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/5 transition-colors">
          <LogOut size={20} />
          <span className="text-sm font-bold">خروج من النظام</span>
        </button>
      </div>
    </aside>
  );
}
