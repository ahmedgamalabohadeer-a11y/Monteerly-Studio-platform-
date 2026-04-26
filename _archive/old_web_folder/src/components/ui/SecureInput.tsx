import React from 'react';
import { Lock } from 'lucide-react';

interface SecureInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const SecureInput: React.FC<SecureInputProps> = ({ label, ...props }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm font-tajawal text-gray-300 flex items-center gap-2">
        {label}
        <Lock size={14} className="text-brand-success" />
      </label>
      <div className="relative group">
        <input
          {...props}
          className="w-full bg-brand-surface border border-gray-700 rounded-lg p-3 pl-10 text-white focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary transition-all outline-none dir-rtl"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-secondary">
          <Lock size={16} />
        </div>
      </div>
      <span className="text-xs text-brand-success flex items-center gap-1">
        <Lock size={10} /> بيانات مشفرة ومحمية (End-to-End)
      </span>
    </div>
  );
};

