'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useSound } from '@/hooks/ui/use-sound';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/design/tokens';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
}

export function InteractiveButton({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  icon,
  className,
  onClick,
  ...props 
}: ButtonProps) {
  const { play } = useSound();

  const baseStyles = "relative inline-flex items-center justify-center font-bold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden";
  
  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] border border-indigo-500/50",
    secondary: "bg-white text-black hover:bg-slate-200 border border-transparent",
    ghost: "bg-transparent hover:bg-white/10 text-slate-300 hover:text-white border border-transparent",
    danger: "bg-red-600 hover:bg-red-700 text-white shadow-[0_0_20px_rgba(220,38,38,0.3)] border border-red-500/50",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!loading && !props.disabled) {
      play('click');
      onClick?.(e);
    }
  };

  return (
    // @ts-ignore
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      onClick={handleClick}
      disabled={loading || props.disabled}
      {...props}
    >
      {/* Loading Spinner */}
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center bg-inherit">
          <Loader2 className="animate-spin" size={size === 'sm' ? 14 : 18} />
        </span>
      )}

      {/* Content */}
      <span className={cn("flex items-center gap-2", loading && "invisible")}>
        {icon}
        {children}
      </span>

      {/* Shine Effect on Hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-10 pointer-events-none" />
    </motion.button>
  );
}

################################################################################