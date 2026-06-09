import os

file_path = "src/app/[locale]/marketplace/profile/[id]/page.tsx"

# الكود الكامل مع الاستيرادات الصحيحة
fixed_content = r"""'use client'
import React from 'react';
import { useParams } from 'next/navigation';
import { Star, ShieldCheck, Award, Layers } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function FreelancerProfilePage() {
  const params = useParams();
  const id = params?.id || '1';
  
  const freelancer = {
    name: "أحمد جمال",
    role: "مخرج ومونتير",
    bio: "خبير في المونتاج السينمائي بخبرة تتجاوز 10 سنوات، متخصص في إبراز الهوية البصرية.",
    rating: 4.9,
    escrowVerified: true,
    skills: ["Premiere Pro (95%)", "After Effects (90%)", "Color Grading (85%)"],
    img: "/images/monteerly/monteerly_16_editor_arab_thobe_collaboration.png"
  };

  return (
    <div className="min-h-screen bg-[#05050A] text-slate-50 p-4 md:p-8 font-sans" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <div className="bg-[#0A0A0F] border border-white/5 p-8 rounded-[2rem] flex flex-col md:flex-row gap-8 mb-8 shadow-2xl">
          <div className="w-32 h-32 rounded-3xl overflow-hidden border border-white/10 shrink-0">
             <Image src={freelancer.img} alt={freelancer.name} width={128} height={128} className="object-cover" />
          </div>
          <div className="flex-1">
             <h1 className="text-3xl font-black mb-2">{freelancer.name}</h1>
             <p className="text-indigo-400 font-bold mb-4">{freelancer.role}</p>
             <p className="text-slate-400 mb-6">{freelancer.bio}</p>
             <div className="flex flex-wrap gap-4">
                <Link href={`/ar/marketplace/escrow/${id}`} className="bg-indigo-600 hover:bg-indigo-500 px-8 py-3 rounded-xl font-black transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] text-center">
                    التعاقد السيادي
                </Link>
                <button className="bg-[#12121A] border border-white/10 px-8 py-3 rounded-xl font-bold hover:border-white/30">مراسلة مباشرة</button>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="md:col-span-2 bg-[#0A0A0F] border border-white/5 p-8 rounded-[2rem]">
              <h2 className="text-xl font-black mb-6 flex items-center gap-2"><Layers /> نماذج الأعمال</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="aspect-video bg-slate-900 rounded-2xl border border-white/5 flex items-center justify-center hover:border-indigo-500/50 cursor-pointer transition-all">
                          <span className="text-slate-600 font-bold">عمل إبداعي {i}</span>
                      </div>
                  ))}
              </div>
           </div>
           
           <div className="bg-[#0A0A0F] border border-white/5 p-8 rounded-[2rem]">
              <h2 className="text-xl font-black mb-6">التقييمات والمهارات</h2>
              <div className="flex items-center gap-2 text-2xl font-black mb-6">
                 <Star className="text-amber-400 fill-amber-400" /> {freelancer.rating}
              </div>
              {freelancer.skills.map((skill, index) => (
                  <div key={index} className="mb-4">
                      <div className="flex justify-between text-xs mb-1 font-bold text-slate-400"><span>{skill.split('(')[0]}</span><span>{skill.split('(')[1]}</span></div>
                      <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500" style={{ width: skill.split('(')[1] }}></div>
                      </div>
                  </div>
              ))}
              <div className="mt-8 flex items-center gap-2 text-emerald-400 bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20 text-xs font-bold">
                 <ShieldCheck className="w-4 h-4" /> عضو موثق Escrow
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
"""

with open(file_path, "w", encoding="utf-8") as f:
    f.write(fixed_content)
print("✅ تم تصحيح ملف الملف الشخصي بالاستيرادات الصحيحة!")
