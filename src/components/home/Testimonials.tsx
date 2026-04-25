'use client';
import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useContent } from '@/hooks/useContent';
import { Avatar } from '@/components/ui/Avatar';

export function Testimonials() {
  // استخدام casting (any) لتجاوز خطأ TypeScript الصارم هنا
  const content: any = useContent();
  
  // بيانات افتراضية في حالة عدم تحميل المحتوى
  const testimonials = content?.testimonials || {
    title: 'ماذا يقول المبدعون عنا؟',
    items: [
      {
        id: 1,
        name: 'سارة أحمد',
        role: 'Filmmaker',
        text: 'غيّر Monteerly طريقة عملي تماماً. التسليم أصبح أسرع 3 مرات.',
        avatar: '/avatars/sara.jpg'
      },
      {
        id: 2,
        name: 'محمد علي',
        role: 'Creative Director',
        text: 'أفضل منصة للتعاون مع العملاء في الشرق الأوسط.',
        avatar: '/avatars/mohamed.jpg'
      }
    ]
  };

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{testimonials.title}</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.items.map((item: any) => (
            <div key={item.id} className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all relative">
              <Quote className="absolute top-4 right-4 text-primary/10" size={40} />
              <div className="flex items-center gap-1 text-yellow-400 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">"{item.text}"</p>
              <div className="flex items-center gap-4">
                <Avatar src={item.avatar} fallback={item.name[0]} />
                <div>
                  <div className="font-bold text-sm">{item.name}</div>
                  <div className="text-xs text-primary">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

################################################################################