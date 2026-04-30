import { MONTEERLY_ASSETS } from '@/constants/assets';
import { finalizeFreelancerOnboarding } from './actions';
import { Sparkles, Camera, Video, Music, Palette, PenTool, Layout, ShieldCheck } from 'lucide-react';

export default function FreelancerSetupPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans" dir="rtl">
      <div className="max-w-5xl w-full bg-white rounded-[3.5rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col md:flex-row">
        
        {/* القسم الجانبي: الهوية البصرية */}
        <div className="md:w-2/5 bg-slate-900 p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <img src={MONTEERLY_ASSETS.LOGO.FULL} alt="Monteerly Logo" className="w-40 mb-12" />
            <h2 className="text-4xl font-black mb-6 leading-tight">مرحباً بك في <br/>نخبة المبدعين</h2>
            <p className="text-slate-400 text-lg leading-relaxed">أنت الآن بصدد تفعيل استوديو العمل الخاص بك. هذه الخطوة تمنحك السيادة الكاملة على مشاريعك وعقودك المالية.</p>
          </div>
          
          <div className="relative z-10 mt-12 bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-sm">
             <img src={MONTEERLY_ASSETS.FEATURES.WORKSPACE} alt="Workspace Preview" className="rounded-2xl shadow-2xl mb-4" />
             <p className="text-xs text-slate-400 text-center font-bold uppercase tracking-widest">غرفة العمليات التعاونية</p>
          </div>

          {/* ديكور بصري خلفي */}
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl"></div>
        </div>

        {/* قسم النموذج التنفيذي */}
        <div className="md:w-3/5 p-16">
          <header className="mb-12">
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-xs font-black mb-4">
              <Sparkles className="w-4 h-4" /> تفعيل الهوية الرقمية (F-009)
            </div>
            <h1 className="text-3xl font-black text-slate-900">أكمل إعداد ملفك الشخصي</h1>
          </header>

          <form action={finalizeFreelancerOnboarding} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-sm font-black text-slate-700">الاسم المهني (الذي سيظهر في العقود)</label>
                <input name="full_name" required type="text" placeholder="أحمد جمال..." className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all" />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-black text-slate-700">التخصص الأساسي (الدائرة الأولى)</label>
                <select name="role" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all font-bold">
                  <option value="editor">المونتير (Video Editor)</option>
                  <option value="videographer">المصور (Videographer)</option>
                  <option value="motion_designer">مصمم الجرافيك (Motion Designer)</option>
                  <option value="colorist">مصحح الألوان (Colorist)</option>
                  <option value="sound_engineer">مهندس الصوت (Sound Engineer)</option>
                  <option value="director">المخرج (Director)</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-black text-slate-700">نبذة تعريفية (Bio)</label>
              <textarea name="bio" rows={3} placeholder="ما الذي يميز استوديو العمل الخاص بك؟" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all"></textarea>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-black text-slate-700">رابط معرض الأعمال (Portfolio)</label>
              <input name="portfolio_url" type="url" placeholder="https://vimeo.com/your-work" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all text-left" dir="ltr" />
            </div>

            <div className="bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100 flex items-start gap-4">
              <ShieldCheck className="w-8 h-8 text-emerald-600 shrink-0" />
              <p className="text-xs text-emerald-800 leading-relaxed font-bold">
                بإتمام هذا الإعداد، أنت تقر بامتثالك للقوانين السيادية لمنصة Monteerly. 
                سيتم توليد "هوية برمجية" محمية بـ RLS وتفعيل حقك في استلام أموال الضمان (Escrow).
              </p>
            </div>

            <button type="submit" className="w-full bg-slate-900 text-white font-black py-5 rounded-[2rem] hover:bg-black transition-all active:scale-95 shadow-2xl shadow-slate-900/20 text-lg">
              تفعيل الاستوديو والبدء في العمل
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
