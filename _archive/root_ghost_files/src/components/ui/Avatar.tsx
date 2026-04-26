'use client';
import React from 'react';

interface AvatarProps {
  src?: string;
  fallback?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Avatar({ src, fallback = 'Ui', size = 'md', className }: AvatarProps) {
  
  const sizeClasses = {
    xs: 'h-6 w-6 text-[10px]',
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-14 w-14 text-base',
    xl: 'h-20 w-20 text-lg'
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;

  // استخراج الحرف الأول بأمان حتى لو كان النص فارغاً
  const fallbackChar = (fallback && fallback.length > 0) ? fallback.charAt(0).toUpperCase() : 'U';

  return (
    <div className={`relative rounded-full overflow-hidden bg-muted flex items-center justify-center font-bold text-muted-foreground border border-border shrink-0 ${currentSize} ${className || ''}`}>
       {src ? (
         <img 
           src={src} 
           alt="Avatar" 
           className="w-full h-full object-cover"
           onError={(e) => {
             e.currentTarget.style.display = 'none';
             // إظهار العنصر البديل (Sibling) عند الخطأ
             const span = e.currentTarget.nextElementSibling;
             if (span) span.classList.remove('hidden');
           }}
         />
       ) : null}
       
       {/* يظهر هذا النص إذا لم توجد صورة أو فشل تحميلها */}
       <span className={`${src ? 'hidden' : ''}`}>{fallbackChar}</span>
    </div>
  );
}

################################################################################