"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Video, QrCode, Layers, Home } from "lucide-react";

export default function BottomAppNav() {
  const pathname = usePathname();

  const links = [
    { href: "/apps/monitor", icon: Video, label: "Monitor" },
    { href: "/apps/id", icon: QrCode, label: "ID" },
    { href: "/apps/logger", icon: Layers, label: "Logger" },
  ];

  if (!pathname?.startsWith("/apps")) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2">
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#0a0f1e]/90 px-2 py-2 shadow-2xl backdrop-blur-xl">
        <Link
          href="/"
          className="rounded-full p-3 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Home"
        >
          <Home size={20} />
        </Link>

        <div className="mx-1 h-6 w-px bg-white/10" />

        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-label={link.label}
              className={`flex items-center justify-center rounded-full p-3 transition-all duration-300 ${
                isActive
                  ? "scale-110 bg-blue-600 text-white shadow-lg shadow-blue-900/50"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
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
