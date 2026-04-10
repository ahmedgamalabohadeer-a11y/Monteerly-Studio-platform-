'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, LayoutDashboard, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import logo from '../../public/images/monteerly/monteerly_02_main_logo_full.svg';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b border-slate-200 bg-white/90 backdrop-blur-xl sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 justify-between items-center">
          
          {/* الشعار */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-10 w-10 transition-transform group-hover:scale-105">
                 <Image src={logo} alt="Monteerly OS" className="object-contain h-10 w-auto" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold text-slate-900 tracking-tight leading-none">MONTEERLY</span>
                <span className="text-[10px] font-bold text-blue-600 tracking-widest uppercase">Creative OS 2.0</span>
              </div>
            </Link>
          </div>

          {/* روابط النظام */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            <Link href="/" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition uppercase tracking-wide">مركز القيادة</Link>
            <Link href="/demo/chat" className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition uppercase tracking-wide">
              <ShieldCheck size={16} /> بروتوكول الحماية
            </Link>
            <Link href="/dashboard" className="flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-slate-800 transition shadow-lg shadow-slate-900/20 active:scale-95">
              <LayoutDashboard size={16} />
              منصة العمليات
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="flex md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-900 p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-t p-4 space-y-4 shadow-2xl absolute w-full">
          <Link href="/" className="block text-slate-900 font-bold p-2">مركز القيادة</Link>
          <Link href="/demo/chat" className="block text-slate-900 font-bold p-2">بروتوكول الحماية</Link>
          <Link href="/dashboard" className="block w-full text-center rounded-lg bg-blue-600 px-4 py-3 text-white font-bold">
            دخول المنصة
          </Link>
        </div>
      )}
    </nav>
  );
}
