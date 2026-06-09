import os

# المسار المستهدف للملف
profile_dir = "src/app/[locale]/marketplace/profile/[id]"
file_path = os.path.join(profile_dir, "page.tsx")
os.makedirs(profile_dir, exist_ok=True)

content = r"""'use client'
import React from 'react';
import { useParams } from 'next/navigation';
import { Briefcase, Star, ShieldCheck, Zap, Award, Calendar } from 'lucide-react';
import Image from 'next/image';

export default function FreelancerProfilePage() {
  const { id } = useParams();
  
  // بيانات محاكاة (سيتم استبدالها لاحقاً ببيانات من Supabase/Database)
  const freelancer = {
    name: "أحمد جمال",
    role: "مخرج ومونتير",
    bio: "خبير في المونتاج السينمائي بخبرة تتجاوز 10 سنوات، متخصص في إبراز الهوية البصرية.",
    rating: 4.9,
    escrowVerified: true,
    skills: ["Premiere Pro", "After Effects", "Color Grading"],
    img: "/images/monteerly/monteerly_16_editor_arab_thobe_collaboration.png"
  };

  return (
    <div className="min-h-screen bg-[#05050A] text-slate-50 p-4 md:p-8 font-sans" dir="rtl">
      <div className="max-w-5xl mx-auto">
        {/* ملف تعريف المبدع */}
        <div className="bg-[#0A0A0F] border border-white/5 p-8 rounded-[2rem] flex flex-col md:flex-row gap-8 mb-8">
          <div className="w-32 h-32 rounded-3xl overflow-hidden border border-white/10 shrink-0">
             <Image src={freelancer.img} alt={freelancer.name} width={128} height={128} className="object-cover" />
          </div>
          <div className="flex-1">
             <h1 className="text-3xl font-black mb-2">{freelancer.name}</h1>
             <p className="text-indigo-400 font-bold mb-4">{freelancer.role}</p>
             <p className="text-slate-400 mb-6">{freelancer.bio}</p>
             <div className="flex flex-wrap gap-4">
                <button className="bg-indigo-600 hover:bg-indigo-500 px-8 py-3 rounded-xl font-black transition-all">التعاقد السيادي</button>
                <button className="bg-[#12121A] border border-white/10 px-8 py-3 rounded-xl font-bold">مراسلة مباشرة</button>
             </div>
          </div>
        </div>

        {/* أقسام المحفظة والتقييمات */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="md:col-span-2 bg-[#0A0A0F] border border-white/5 p-8 rounded-[2rem]">
              <h2 className="text-xl font-black mb-6">نماذج الأعمال</h2>
              {/* هنا سيتم عرض الفيديوهات أو الصور */}
              <div className="aspect-video bg-slate-900 rounded-2xl flex items-center justify-center text-slate-500">
                  عرض الوسائط (Portfolio Grid)
              </div>
           </div>
           
           <div className="bg-[#0A0A0F] border border-white/5 p-8 rounded-[2rem]">
              <h2 className="text-xl font-black mb-6">التقييمات والأمان</h2>
              <div className="flex items-center gap-2 text-2xl font-black mb-4">
                 <Star className="text-amber-400 fill-amber-400" /> {freelancer.rating}
              </div>
              {freelancer.escrowVerified && (
                 <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
                    <ShieldCheck /> عضو موثق Escrow
                 </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}
"""

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("✅ تم إنشاء صفحة الملف الشخصي بنجاح!")
