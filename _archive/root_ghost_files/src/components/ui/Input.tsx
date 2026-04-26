"use client";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

export function Input({ label, icon, className = "", ...props }: InputProps) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="flex items-center gap-2 text-xs text-gray-400 font-bold mb-2 uppercase tracking-wider">
          {icon} {label}
        </label>
      )}
      <div className="relative group">
        <input 
          {...props}
          className="w-full bg-[#020817]/50 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 focus:bg-blue-900/10 outline-none transition-all font-mono"
        />
        <div className="absolute inset-0 rounded-xl bg-blue-500/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" />
      </div>
    </div>
  );
}

################################################################################