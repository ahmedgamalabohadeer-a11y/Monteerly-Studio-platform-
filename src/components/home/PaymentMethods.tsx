'use client';
import { useContent } from '@/hooks/useContent';

export function PaymentMethods() {
  const { payment } = useContent();
  return (
    <section className="py-12 border-t border-border bg-background">
      <div className="container px-4 text-center">
        <p className="text-sm text-muted-foreground mb-6 uppercase tracking-widest">{payment.title}</p>
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
           {/* Replace with actual SVG/PNG logos for Paymob, Visa, etc. Using text for now as placeholders are safer */}
           {payment.methods.map((method: string, i: number) => (
             <span key={i} className="font-bold text-lg md:text-xl text-foreground/80">{method}</span>
           ))}
        </div>
      </div>
    </section>
  );
}
