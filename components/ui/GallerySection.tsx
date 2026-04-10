'use client';
import Image from 'next/image';

// استيراد صور المعرض
import img1 from '../../public/images/monteerly/monteerly_16_editor_arab_thobe_collaboration.png';
import img2 from '../../public/images/monteerly/monteerly_21_photographer_saudi_heritage_traditional.png';
import img3 from '../../public/images/monteerly/monteerly_22_photographer_algerian_drone_aerial.png';
import img4 from '../../public/images/monteerly/monteerly_23_photographer_library_heritage_cinematic.png';
import img5 from '../../public/images/monteerly/monteerly_14_editor_professional_dual_screen.png';
import img6 from '../../public/images/monteerly/monteerly_12_editor_red_shirt_timeline.png';
import img7 from '../../public/images/monteerly/monteerly_10_multi_platform_publishing_hero.png';
import img8 from '../../public/images/monteerly/monteerly_13_analytics_dashboard_woman_ai.png';

const galleryAssets = [
  { id: 1, src: img1, title: 'هوية عربية، جودة عالمية', category: 'Talent Market' },
  { id: 2, src: img2, title: 'عمق التراث السعودي', category: 'Heritage' },
  { id: 3, src: img3, title: 'زوايا مستحيلة (Drone)', category: 'Advanced Tech' },
  { id: 4, src: img4, title: 'لمسة سينمائية', category: 'Cinematic' },
  { id: 5, src: img5, title: 'بيئة المحترفين', category: 'Pro Workspace' },
  { id: 6, src: img6, title: 'دقة المونتاج', category: 'Production' },
  { id: 7, src: img7, title: 'نشر متعدد المنصات', category: 'Publishing' },
  { id: 8, src: img8, title: 'رؤية ثاقبة (AI)', category: 'Analytics' },
];

export default function GallerySection() {
  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 text-center mb-16">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-4">السوق المفتوح</h2>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
          استحوذ على تراخيص استخدام تجاري لأصول بصرية نادرة، أو وظف نخبة المبدعين العرب.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
        {galleryAssets.map((item) => (
          <div key={item.id} className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-900 shadow-md hover:shadow-2xl transition duration-500 cursor-pointer">
            <Image 
              src={item.src} 
              alt={item.title} 
              fill 
              className="object-cover group-hover:scale-110 transition duration-700 ease-in-out opacity-90 group-hover:opacity-100"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition duration-300">
              <span className="inline-block px-2 py-1 mb-2 rounded bg-blue-600/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider border border-blue-500/30">
                {item.category}
              </span>
              <h3 className="text-white font-bold text-lg leading-tight">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
