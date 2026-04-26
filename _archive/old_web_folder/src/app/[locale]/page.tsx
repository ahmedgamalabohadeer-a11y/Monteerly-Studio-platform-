// @ts-nocheck
import React from 'react';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { Hero } from '@/components/home/Hero';
import { AITechSection } from '@/components/home/AITechSection';
import { PricingTable } from '@/components/growth/PricingTable';
import { FeatureGrid } from '@/components/home/FeatureGrid';
import { Testimonials } from '@/components/home/Testimonials';

export default function LandingPage() {
  return (
    <div className="bg-slate-950 min-h-screen text-white overflow-x-hidden" dir="rtl">
      {/* شريط التنقل العلوي */}
      <Navbar />

      <main>
        {/* قسم الترحيب الرئيسي - القوة البصرية */}
        <Hero />

        {/* شبكة الميزات - المونتاج، المالية، الأكاديمية، والوكالة */}
        <section className="py-24 bg-slate-900/50">
          <div className="container mx-auto px-6 text-center mb-16">
            <h2 className="text-4xl font-black mb-4">منظومة إدارية متكاملة (Corporate OS)</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Monteerly Studio ليست مجرد أداة مونتاج، بل هي نظام تشغيل كامل لأعمالك اللوجستية والإنتاجية.
            </p>
          </div>
          <FeatureGrid />
        </section>

        {/* عرض تقنيات الذكاء الاصطناعي */}
        <AITechSection />

        {/* خطط الأسعار والاشتراكات */}
        <section className="py-24 bg-slate-900/30">
          <PricingTable />
        </section>

        {/* آراء الشركاء والنجاحات */}
        <Testimonials />
      </main>

      {/* التذييل النهائي */}
      <Footer />
    </div>
  );
}
