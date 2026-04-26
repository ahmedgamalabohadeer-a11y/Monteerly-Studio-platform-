'use client';
import React, { forwardRef } from 'react';
import { Check } from 'lucide-react';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  onCheckedChange?: (checked: boolean) => void;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, onCheckedChange, onChange, ...props }, ref) => {
    return (
      <label className="flex items-center space-x-2 cursor-pointer group">
        <div className="relative">
          <input
            type="checkbox"
            className="peer sr-only"
            ref={ref}
            onChange={(e) => {
              onChange?.(e);
              onCheckedChange?.(e.target.checked);
            }}
            {...props}
          />
          <div className={`
            h-5 w-5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900
            peer-focus-visible:ring-2 peer-focus-visible:ring-primary 
            peer-checked:bg-indigo-600 peer-checked:border-indigo-600
            transition-all flex items-center justify-center
          `}>
             <Check size={14} className="text-white opacity-0 peer-checked:opacity-100" strokeWidth={3} />
          </div>
        </div>
        {label && <span className="text-sm font-medium text-slate-700 dark:text-slate-300 peer-disabled:opacity-70">{label}</span>}
      </label>
    );
  }
);
Checkbox.displayName = 'Checkbox';

