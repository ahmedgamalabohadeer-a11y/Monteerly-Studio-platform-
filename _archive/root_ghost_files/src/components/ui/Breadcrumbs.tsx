import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center text-sm text-muted-foreground mb-4 overflow-x-auto whitespace-nowrap pb-1">
      <Link href="/dashboard" className="hover:text-primary transition-colors flex items-center gap-1">
         <Home size={14} />
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronLeft size={14} className="mx-2 flex-shrink-0 rtl:rotate-180" />
          {item.href ? (
            <Link href={item.href} className="hover:text-primary transition-colors font-medium">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-bold pointer-events-none">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

################################################################################