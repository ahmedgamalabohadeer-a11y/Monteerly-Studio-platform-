"use client";
import { ReactNode } from "react";

interface AppButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'danger' | 'outline';
  className?: string;
}

export default function AppButton({ children, onClick, variant = 'primary', className = '' }: AppButtonProps) {
  const baseStyle = "w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all active:scale-95";
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-900/30",
    danger: "bg-red-600 text-white shadow-lg shadow-red-900/30",
    outline: "bg-transparent border border-white/20 hover:bg-white/5 text-white"
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}

