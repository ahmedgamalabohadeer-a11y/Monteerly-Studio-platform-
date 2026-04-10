'use client';
import Link from 'next/link';
import { Menu, X, LayoutGrid } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#020817]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">M</div>
          <span className="text-xl font-bold text-white tracking-tight">Monteerly Studio</span>
        </div>

        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
          <a href="#infrastructure" className="hover:text-white transition">البنية التحتية</a>
          <a href="#apps" className="hover:text-white transition">التطبيقات</a>
          <a href="#gallery" className="hover:text-white transition">المعرض</a>
        </div>

        <div className="flex gap-4">
          <Link href="/dashboard" className="hidden md:flex items-center gap-2 text-white hover:text-blue-400 font-medium transition">
            <LayoutGrid size={18} /> لوحة التحكم
          </Link>
          <Link href="/dashboard" className="bg-white text-slate-950 px-5 py-2.5 rounded-full font-bold hover:bg-blue-50 transition shadow-lg">
            ابدأ الآن
          </Link>
        </div>
      </div>
    </nav>
  );
}
