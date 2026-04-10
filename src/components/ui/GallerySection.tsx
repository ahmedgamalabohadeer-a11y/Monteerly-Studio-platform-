'use client';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export default function GallerySection() {
  return (
    <section id="gallery" className="py-24 bg-[#020817] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/5 blur-[150px]" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">قدرات بصرية غير محدودة</h2>
          <p className="text-slate-400 text-lg">منصة مصممة للتعامل مع أعلى دقة وجودة (4K/8K HDR).</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px]">
          {/* Main Item */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden border border-white/10 group cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
            <div className="absolute inset-0 bg-slate-800 animate-pulse group-hover:animate-none transition-colors" /> {/* Placeholder for Image */}
            <div className="absolute bottom-8 right-8 z-20">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold mb-2 inline-block">FEATURED</span>
              <h3 className="text-2xl font-bold text-white">مونتاج سينمائي متقدم</h3>
              <p className="text-slate-300">أدوات قص وتلوين مدمجة في المتصفح.</p>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-20 h-20 bg-white/10 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <Play className="w-8 h-8 text-white fill-current" />
            </div>
          </motion.div>

          {/* Sub Item 1 */}
          <motion.div whileHover={{ scale: 1.02 }} className="relative rounded-3xl overflow-hidden border border-white/10 bg-slate-900 group">
             <div className="absolute inset-0 flex items-center justify-center text-slate-700 group-hover:text-slate-600 transition-colors">
                <span className="text-6xl font-black opacity-20">VFX</span>
             </div>
             <div className="absolute bottom-6 right-6 p-4">
                <h4 className="font-bold text-white">مؤثرات بصرية</h4>
             </div>
          </motion.div>

          {/* Sub Item 2 */}
          <motion.div whileHover={{ scale: 1.02 }} className="relative rounded-3xl overflow-hidden border border-white/10 bg-slate-900 group">
             <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20" />
             <div className="absolute bottom-6 right-6 p-4">
                <h4 className="font-bold text-white">تصحيح ألوان</h4>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
