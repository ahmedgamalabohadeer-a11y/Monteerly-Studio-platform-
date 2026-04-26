'use client';
import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number; // Current rating (0-5)
  editable?: boolean;
  onChange?: (rating: number) => void;
  size?: number;
}

export function StarRating({ rating, editable = false, onChange, size = 16 }: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex gap-1" onMouseLeave={() => setHoverRating(0)}>
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = (hoverRating || rating) >= star;
        
        return (
          <button
            key={star}
            type="button"
            disabled={!editable}
            onClick={() => onChange && onChange(star)}
            onMouseEnter={() => editable && setHoverRating(star)}
            className={`transition-colors ${editable ? 'cursor-pointer' : 'cursor-default'}`}
          >
            <Star 
              size={size} 
              fill={isFilled ? '#EAB308' : 'transparent'} 
              className={isFilled ? 'text-yellow-500' : 'text-muted-foreground/30'} 
            />
          </button>
        );
      })}
    </div>
  );
}

################################################################################