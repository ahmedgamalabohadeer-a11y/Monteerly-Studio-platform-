"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Video, QrCode, Layers, Home } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

export default function BottomAppNav() {
  const pathname = usePathname();
  const { t } = useLang();

  const links = [
    { href: "/apps/monitor", icon: Video, label: "Monitor" },
    { href: "/apps/id", icon: QrCode, label: "ID" },
    { href: "/apps/logger", icon: Layers, label: "Logger" },
  ];

  // لا تظهر الشريط إذا لم نكن داخل مجلد التطبيقات
  if (!pathname?.startsWith("/apps")) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
      <div className="flex items-center gap-2 px-2 py-2 bg-[#0a0f1e]/90 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl">
        
        <Link href="/" className="p-3 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
          <Home size={20} />
        </Link>
        
        <div className="w-px h-6 bg-white/10 mx-1"></div>

        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.href} 
              href={link.href}
              className={`p-3 rounded-full flex items-center justify-center transition-all duration-300 ${
                isActive 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50 scale-110" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <link.icon size={20} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
