"use client";
import Link from "next/link";
import { ArrowRight, MoreVertical } from "lucide-react";

export default function AppHeader({ title, backUrl = "/" }: { title: string, backUrl?: string }) {
  return (
    <div className="fixed top-0 w-full z-50 bg-[#0a0f1e]/90 backdrop-blur-xl border-b border-white/10 px-4 h-16 flex items-center justify-between">
      <Link href={backUrl} className="p-2 rounded-full hover:bg-white/10 transition-colors text-white">
        <ArrowRight size={24} />
      </Link>
      <h1 className="text-lg font-bold text-white tracking-wide">{title}</h1>
      <button className="p-2 rounded-full hover:bg-white/10 transition-colors text-white">
        <MoreVertical size={24} />
      </button>
    </div>
  );
}
