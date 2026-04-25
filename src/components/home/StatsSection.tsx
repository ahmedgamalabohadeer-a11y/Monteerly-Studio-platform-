'use client';
import { useContent } from '@/hooks/useContent';

export function StatsSection() {
  const { stats } = useContent();
  return (
    <section className="py-12 border-y border-border bg-muted/30">
      <div className="container px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.items.map((item: any, i: number) => (
            <div key={i} className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-primary">{item.value}</div>
              <div className="text-sm md:text-base text-muted-foreground font-medium uppercase tracking-wide">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

################################################################################