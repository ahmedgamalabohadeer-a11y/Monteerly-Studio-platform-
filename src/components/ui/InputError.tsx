import React from 'react';
import { AlertCircle } from 'lucide-react';

interface InputErrorProps {
  message?: string;
}

export function InputError({ message }: InputErrorProps) {
  if (!message) return null;

  return (
    <div className="flex items-center gap-2 mt-1.5 text-red-600 text-xs font-medium animate-in slide-in-from-top-1">
      <AlertCircle size={12} />
      <span>{message}</span>
    </div>
  );
}

################################################################################