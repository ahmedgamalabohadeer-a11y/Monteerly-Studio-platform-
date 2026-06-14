'use client'
import React, { use } from 'react';
import { Star, ShieldCheck, Award, Layers, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function FreelancerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const freelancer = {
    name: "أحمد جمال", // في الإنتاج: اجلب بيانات المستخدم ذو الـ ID من قاعدة البيانات
    role: "مخرج ومونتير سيادي",
    bio: "خبير في المونتاج السينمائي بخبرة تتجاوز 10 سنوات، متخصص في إبراز الهوية البصرية وإخراج الأفلام الوثائقية والإعلانية بأعلى معايير الجودة العالمية.",
    rating: 4.9,
    escrowVerified: true,
    skills: ["Premiere Pro (95%)", "After Effects (90%)", "Color Grading (85%)"],
    img: "/images/monteerly/monteerly_16_editor_arab_thobe_collaboration.png"
  };

  const startContract = () => {
     // توليد رقم مشروع عشوائي مؤقتاً لتمريره لبوابة الدفع (Checkout)
     const tempProjectId = `PRJ-${Math.floor(Math.random() * 10000)}`;
     router.push(`/ar/checkout/${tempProjectId}`);
  };

  return (
    <div className="min-h-screen bg-[#05050A] text-slate-50 p-4 md:p-8 font-sans relative" dir="rtl">
      <button onClick={() => router.back()} className="absolute top-8 right-8 text-slate-400 hover:text-white flex items-center gap-2 transition-colors z-10">
        <ArrowRight className="w-4 h-4" /> العودة للسوق
      </button>

      <div className="max-w-5xl mx-auto pt-10">
        <div className="bg-[#0A0A0F] border border-white/5 p-8 rounded-[2rem] flex flex-col md:flex-row gap-8 mb-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-2 bg-gradient-to-l from-indigo-500 to-purple-500"></div>
          
          <div className="w-32 h-32 rounded-3xl overflow-hidden border border-white/10 shrink-0 bg-slate-900 relative">
             <Image src={freelancer.img} alt={freelancer.name} fill className="object-cover" />
          </div>
          <div className="flex-1">
             <h1 className="text-3xl font-black mb-2">{freelancer.name}</h1>
             <p className="text-indigo-400 font-bold mb-4">{freelancer.role}</p>
             <p className="text-slate-400 mb-6 leading-relaxed max-w-3xl">{freelancer.bio}</p>
             
             <div className="flex flex-wrap gap-4">
                <button onClick={startContract} className="bg-indigo-600 hover:bg-indigo-500 px-8 py-3 rounded-xl font-black transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] text-center flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5"/> التعاقد وبدء الضمان (Escrow)
                </button>
                <button className="bg-[#12121A] border border-white/10 px-8 py-3 rounded-xl font-bold hover:border-white/30 transition-colors">
                    مراسلة سريعة
                </button>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="md:col-span-2 bg-[#0A0A0F] border border-white/5 p-8 rounded-[2rem]">
              <h2 className="text-xl font-black mb-6 flex items-center gap-2"><Layers className="text-indigo-500" /> معرض الأعمال (Portfolio)</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="aspect-video bg-[#12121A] rounded-2xl border border-white/5 flex flex-col items-center justify-center hover:border-indigo-500/50 cursor-pointer transition-all group overflow-hidden relative">
                          <Image src={`https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=500&auto=format&fit=crop&sig=${i}`} alt="Portfolio" fill className="object-cover opacity-50 group-hover:opacity-100 transition-opacity" />
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors z-10"></div>
                          <span className="text-white font-bold z-20 group-hover:scale-110 transition-transform bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">المشروع {i}</span>
                      </div>
                  ))}
              </div>
           </div>

           <div className="bg-[#0A0A0F] border border-white/5 p-8 rounded-[2rem]">
              <h2 className="text-xl font-black mb-6">التقييمات والمهارات</h2>
              <div className="flex items-center gap-2 text-2xl font-black mb-8 border-b border-white/5 pb-6">
                 <Star className="text-amber-400 fill-amber-400 w-8 h-8" /> 
                 <span>{freelancer.rating}</span>
                 <span className="text-sm font-normal text-slate-500 mt-2">(42 مراجعة)</span>
              </div>
              
              <div className="space-y-5">
                {freelancer.skills.map((skill, index) => (
                    <div key={index}>
                        <div className="flex justify-between text-xs mb-2 font-bold text-slate-300">
                          <span>{skill.split('(')[0]}</span>
                          <span className="text-indigo-400">{skill.split('(')[1]}</span>
                        </div>
                        <div className="h-2 bg-[#12121A] rounded-full overflow-hidden border border-white/5">
                            <div className="h-full bg-gradient-to-r from-indigo-600 to-purple-600" style={{ width: skill.split('(')[1] }}></div>
                        </div>
                    </div>
                ))}
              </div>
              
              <div className="mt-10 flex flex-col gap-3">
                 <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 text-sm font-bold">
                    <ShieldCheck className="w-5 h-5" /> هوية موثقة سيادياً (KYC)
                 </div>
                 <div className="flex items-center gap-2 text-amber-400 bg-amber-500/10 p-4 rounded-xl border border-amber-500/20 text-sm font-bold">
                    <Award className="w-5 h-5" /> صانع محتوى متميز
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
