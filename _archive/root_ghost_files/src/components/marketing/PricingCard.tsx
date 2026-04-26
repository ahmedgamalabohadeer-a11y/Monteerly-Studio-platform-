'use client';
import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface PricingCardProps {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText?: string;
}

export function PricingCard({ name, price, period = '/ شهرياً', description, features, isPopular, buttonText = "اشترك الآن" }: PricingCardProps) {
  return (
    <div className={`relative p-8 rounded-3xl border flex flex-col h-full ${isPopular ? 'border-primary bg-primary/5 shadow-2xl scale-105 z-10' : 'border-border bg-card'}`}>
       
       {isPopular && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
             <Badge variant="primary" className="px-3 py-1 text-sm uppercase tracking-wide">الأكثر طلباً</Badge>
          </div>
       )}

       <div className="mb-6">
          <h3 className="text-xl font-bold font-heading mb-2">{name}</h3>
          <p className="text-muted-foreground text-sm h-10">{description}</p>
       </div>

       <div className="mb-6 flex items-baseline gap-1">
          <span className="text-4xl font-black">{price}</span>
          {price !== 'Free' && <span className="text-muted-foreground">{period}</span>}
       </div>

       <div className="flex-1 space-y-4 mb-8">
          {features.map((feat, i) => (
             <div key={i} className="flex items-start gap-3 text-sm">
                <div className={`mt-0.5 p-0.5 rounded-full ${isPopular ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                   <Check size={12} strokeWidth={3} />
                </div>
                <span>{feat}</span>
             </div>
          ))}
       </div>

       <Button variant={isPopular ? 'primary' : 'outline'} className="w-full h-12 text-lg">
          {buttonText}
       </Button>
    </div>
  );
}

################################################################################