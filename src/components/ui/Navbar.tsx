"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  LayoutDashboard,
  ShieldCheck,
  Globe,
  BookOpen,
  Users,
  ChevronDown,
  LogIn,
} from "lucide-react";

// مسارات مطابقة للقرص الفعلي
const LOGO_SRC = "/images/monteerly/monteerly_02_main_logo_full.svg";
const ICON_SRC = "/images/monteerly/monteerly_01_favicon_app_icon.png";

interface NavLink {
  href: string;
  labelEn: string;
  labelAr: string;
  icon: React.ReactNode;
}

interface NavbarProps {
  locale?: "ar" | "en";
}

const NAV_LINKS: NavLink[] = [
  {
    href: "/marketplace",
    labelEn: "Marketplace",
    labelAr: "السوق",
    icon: <Globe size={15} />,
  },
  {
    href: "/library",
    labelEn: "Library",
    labelAr: "المكتبة",
    icon: <BookOpen size={15} />,
  },
  {
    href: "/academy",
    labelEn: "Academy",
    labelAr: "الأكاديمية",
    icon: <Users size={15} />,
  },
  {
    href: "/demochat",
    labelEn: "Secure Chat",
    labelAr: "الدردشة الآمنة",
    icon: <ShieldCheck size={15} />,
  },
];

export default function Navbar({ locale = "en" }: NavbarProps) {
  const isAr = locale === "ar";
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
    setProductsOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setProductsOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleMenu = useCallback(() => setIsOpen((v) => !v), []);

  const localHref = (path: string) => `/${locale}${path}`;

  const isActive = (path: string) => {
    if (!pathname) return false;
    const target = localHref(path);
    return pathname === target || pathname.startsWith(`${target}/`);
  };

  return (
    <>
      <nav
        dir={isAr ? "rtl" : "ltr"}
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border-b border-slate-200 dark:border-white/10"
            : "bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/70 dark:border-white/5"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href={localHref("")} className="flex items-center gap-3">
              <Image src={ICON_SRC} alt="Monteerly" width={38} height={38} priority />
              <div className="hidden sm:block">
                <div className="font-black text-slate-900 dark:text-white">MONTEERLY</div>
                <div className="text-[10px] text-indigo-500 font-bold">Creative OS</div>
              </div>
              <div className="hidden md:block w-32 h-8 relative">
                <Image src={LOGO_SRC} alt="Monteerly Logo" fill className="object-contain" />
              </div>
            </Link>

            {/* Desktop */}
            <div className="hidden md:flex items-center gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={localHref(link.href)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive(link.href)
                      ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {link.icon}
                    {isAr ? link.labelAr : link.labelEn}
                  </span>
                </Link>
              ))}

              <button
                onClick={() => setProductsOpen(!productsOpen)}
                className="px-4 py-2 flex items-center gap-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg dark:text-slate-300 dark:hover:bg-white/5 transition-colors"
              >
                {isAr ? "المنتجات" : "Products"}
                <ChevronDown size={14} />
              </button>

              <Link
                href={localHref("/dashboard")}
                className="px-4 py-2 flex items-center gap-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg dark:text-slate-300 dark:hover:bg-white/5 transition-colors"
              >
                <LayoutDashboard size={16} />
                {isAr ? "لوحة التحكم" : "Dashboard"}
              </Link>

              <Link
                href={localHref("/auth")}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-xl flex items-center gap-2 text-sm font-bold transition-colors"
              >
                <LogIn size={15} />
                {isAr ? "الدخول الآمن" : "Secure Login"}
              </Link>
            </div>

            {/* Mobile Button */}
            <button onClick={toggleMenu} className="md:hidden p-2 text-slate-600 dark:text-slate-300">
              {isOpen ? <X size={25} /> : <Menu size={25} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-all duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <div
        dir={isAr ? "rtl" : "ltr"}
        className={`fixed top-0 ${
          isAr ? "right-0 border-l" : "left-0 border-r"
        } h-full w-[80vw] max-w-sm z-50 bg-white dark:bg-slate-950 border-slate-200 dark:border-white/10 transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : isAr ? "translate-x-full" : "-translate-x-full"
        }`}
      >
        <div className="p-5 border-b border-slate-200 dark:border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image src={ICON_SRC} alt="Logo" width={35} height={35} />
            <div>
              <div className="font-black text-slate-900 dark:text-white">MONTEERLY</div>
              <div className="text-xs text-indigo-500 font-bold">Creative OS</div>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="p-5 space-y-2 flex-1 overflow-y-auto">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={localHref(link.href)}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 p-3 rounded-xl font-semibold transition-colors ${
                isActive(link.href)
                  ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5"
              }`}
            >
              {link.icon}
              {isAr ? link.labelAr : link.labelEn}
            </Link>
          ))}
          
          <Link
            href={localHref("/dashboard")}
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5 transition-colors"
          >
            <LayoutDashboard size={18} />
            {isAr ? "لوحة التحكم" : "Dashboard"}
          </Link>
        </div>

        <div className="p-5 border-t border-slate-200 dark:border-white/10">
          <Link
            href={localHref("/auth")}
            onClick={() => setIsOpen(false)}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white p-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-colors"
          >
            <LogIn size={18} />
            {isAr ? "الدخول الآمن" : "Secure Login"}
          </Link>
        </div>
      </div>
    </>
  );
}
