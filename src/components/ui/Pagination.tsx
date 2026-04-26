import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <Button 
        variant="outline" 
        size="sm" 
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        icon={<ChevronRight size={14} />} // Icon flipped for RTL
      >
         السابق
      </Button>

      <span className="text-sm font-medium mx-2">
         صفحة {currentPage} من {totalPages}
      </span>

      <Button 
        variant="outline" 
        size="sm" 
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
         التالي <ChevronLeft size={14} className="mr-2" />
      </Button>
    </div>
  );
}

