import os

# دالة مساعدة لإنشاء المجلدات وكتابة الملفات
def write_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✅ تم إنشاء/إصلاح: {path}")

# ==========================================
# 1. إصلاح صفحة الأكاديمية (Academy)
# ==========================================
academy_page = """'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Star, Users, Award, Search } from 'lucide-react';
import Link from 'next/link';

const COURSES = [
  {
    id: "premier-pro-masterclass",
    title: "إتقان أدوبي بريمير من الصفر للاحتراف",
    instructor: "أحمد سامي",
    level: "Beginner",
    duration: "15 ساعة",
    studentsCount: 1240,
    rating: 4.8,
    xpReward: 500,
    price: "مجاناً",
    thumbnail: "bg-indigo-900"
  },
  {
    id: "color-grading-davinci",
    title: "فن تصحيح الألوان السينمائي",
    instructor: "سارة المخرج",
    level: "Advanced",
    duration: "8 ساعات",
    studentsCount: 850,
    rating: 4.9,
    xpReward: 800,
    price: 450,
    thumbnail: "bg-purple-900"
  },
  {
    id: "motion-graphics-trends",
    title: "تريندات الموشن جرافيك 2026",
    instructor: "ستوديو بيكسل",
    level: "Intermediate",
    duration: "5 ساعات",
    studentsCount: 2000,
    rating: 4.7,
    xpReward: 300,
    price: 200,
    thumbnail: "bg-blue-900"
  }
];

export default function AcademyPage() {
  const [activeTab, setActiveTab] = useState('الكل');

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />
      
      <section className="relative pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-4">أكاديمية مونتيرلي 🎓</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">تعلم مهارات <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">المستقبل الإبداعي</span></h1>
            
            <div className="max-w-2xl mx-auto bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-2 flex items-center shadow-2xl mt-8">
              <div className="p-3 text-slate-500"><Search className="w-6 h-6" /></div>
              <input type="text" placeholder="ماذا تريد أن تتعلم اليوم؟" className="flex-1 bg-transparent border-none text-white placeholder-slate-500 focus:ring-0 text-right px-4" />
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-colors">بحث</button>
            </div>
          </motion.div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap gap-4 mb-10 border-b border-slate-800 pb-4">
          {['الكل', 'المونتاج', 'تلوين', 'موشن جرافيك', 'هندسة صوتية'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab ? 'bg-white text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}>{tab}</button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COURSES.map((course, index) => (
            <Link href={`/academy/${course.id}`} key={course.id}>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 }} className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-500/50 hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                <div className={`h-48 w-full ${course.thumbnail} relative flex items-center justify-center overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                  <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-300"><Play className="w-6 h-6 text-white fill-current" /></div>
                  <span className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-xs font-bold px-2 py-1 rounded text-white border border-white/10">{course.level}</span>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold text-indigo-400 flex items-center gap-1 bg-indigo-500/10 px-2 py-1 rounded"><Award className="w-3 h-3" />+{course.xpReward} XP</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-indigo-400 transition-colors">{course.title}</h3>
                  <div className="mt-auto space-y-4 border-t border-slate-800 pt-4 flex justify-between text-sm text-slate-400">
                    <div className="flex items-center gap-1.5"><Users className="w-4 h-4" />{course.studentsCount}</div>
                    <div className="flex items-center gap-1.5 text-yellow-500"><Star className="w-4 h-4 fill-current" />{course.rating}</div>
                    <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{course.duration}</div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
"""
write_file("src/app/[locale]/academy/page.tsx", academy_page)

# ==========================================
# 2. إصلاح لوحة الاستوديو (Studio Dashboard)
# ==========================================
studio_page = """'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Clock, CheckCircle, AlertCircle, FileVideo, MoreVertical } from 'lucide-react';
import Link from 'next/link';

const ACTIVE_PROJECTS = [
  { id: "proj-001", title: "إعلان تطبيق وصلة - رمضان 2026", client: "Wasla App", status: "in_review", progress: 85, lastUpdate: "منذ ساعتين", thumbnail: "bg-indigo-900" },
  { id: "proj-002", title: "وثائقي الحرف اليدوية - الحلقة 3", client: "قناة الثقافة", status: "in_progress", progress: 40, lastUpdate: "أمس", thumbnail: "bg-slate-800" },
  { id: "proj-003", title: "تغطية مؤتمر TechLeap", client: "Tech KSA", status: "pending_assets", progress: 10, lastUpdate: "منذ 3 أيام", thumbnail: "bg-slate-900" }
];

export default function StudioDashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 pb-20">
      <div className="max-w-7xl mx-auto pt-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div><h1 className="text-3xl font-bold mb-2">ستوديو العمل</h1><p className="text-slate-400">تابع مشاريعك، راجع التعديلات، وسلم الأعمال.</p></div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-lg shadow-indigo-600/20"><Plus className="w-5 h-5" /> مشروع جديد</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex items-center gap-4"><div className="bg-blue-500/20 p-3 rounded-xl text-blue-400"><Clock className="w-6 h-6" /></div><div><div className="text-2xl font-bold">3</div><div className="text-slate-400 text-sm">قيد التنفيذ</div></div></div>
          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex items-center gap-4"><div className="bg-yellow-500/20 p-3 rounded-xl text-yellow-400"><AlertCircle className="w-6 h-6" /></div><div><div className="text-2xl font-bold">1</div><div className="text-slate-400 text-sm">في المراجعة</div></div></div>
          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex items-center gap-4"><div className="bg-green-500/20 p-3 rounded-xl text-green-400"><CheckCircle className="w-6 h-6" /></div><div><div className="text-2xl font-bold">12</div><div className="text-slate-400 text-sm">مكتملة</div></div></div>
        </div>

        <h2 className="text-xl font-bold mb-6">المشاريع النشطة</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACTIVE_PROJECTS.map((project, index) => (
            <Link href={`/studio/${project.id}`} key={project.id}>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-500/50 hover:shadow-xl transition-all group cursor-pointer">
                <div className={`h-40 w-full ${project.thumbnail} relative flex items-center justify-center`}>
                  <FileVideo className="w-12 h-12 text-white/20 group-hover:text-indigo-400 transition-colors" />
                  <div className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full border ${project.status === 'in_review' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : project.status === 'in_progress' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                    {project.status === 'in_review' ? 'مراجعة العميل' : project.status === 'in_progress' ? 'قيد العمل' : 'بانتظار ملفات'}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2"><h3 className="font-bold text-lg group-hover:text-indigo-400 transition-colors line-clamp-1">{project.title}</h3><MoreVertical className="w-5 h-5 text-slate-500" /></div>
                  <p className="text-slate-500 text-sm mb-4">{project.client}</p>
                  <div className="w-full bg-slate-800 h-2 rounded-full mb-4 overflow-hidden"><div className="bg-indigo-600 h-full rounded-full" style={{ width: `${project.progress}%` }} /></div>
                  <div className="flex justify-between text-xs text-slate-400 border-t border-slate-800 pt-4"><span>آخر تحديث: {project.lastUpdate}</span><span>{project.progress}%</span></div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
"""
write_file("src/app/[locale]/studio/page.tsx", studio_page)

# ==========================================
# 3. إصلاح غرفة المونتاج (Studio Workspace)
# ==========================================
workspace_page = """'use client';
import React from 'react';
import { ArrowRight, Play, Share2, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function ProjectWorkspace({ params }: { params: { projectId: string } }) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/studio" className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"><ArrowRight className="w-5 h-5" /></Link>
          <div><h1 className="font-bold text-sm md:text-base">إعلان تطبيق وصلة - النسخة 3</h1><div className="flex items-center gap-2 text-xs text-slate-500"><span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" /> قيد المراجعة</div></div>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"><Share2 className="w-4 h-4" /><span className="hidden md:inline">مشاركة الرابط</span></button>
          <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2"><CheckCircle className="w-4 h-4" /> تسليم نهائي</button>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-4 overflow-hidden h-[calc(100vh-64px)]">
        <div className="lg:col-span-3 bg-black flex flex-col relative border-l border-slate-800 order-2 lg:order-1">
          <div className="flex-1 flex items-center justify-center bg-slate-900/20 m-4 rounded-xl border border-slate-800 border-dashed relative group">
            <div className="text-slate-600 text-center"><Play className="w-16 h-16 mx-auto mb-4 opacity-50 group-hover:text-indigo-500 transition-colors" /><p>مساحة عرض الفيديو</p></div>
            <div className="absolute bottom-0 left-0 w-full h-12 bg-slate-900 border-t border-slate-800 flex items-center px-4 gap-4"><Play className="w-4 h-4 fill-current" /><div className="flex-1 h-1 bg-slate-700 rounded-full relative"><div className="absolute left-[30%] w-3 h-3 bg-indigo-500 rounded-full -top-1" /><div className="absolute left-[30%] w-full h-full bg-indigo-500/30 rounded-full" style={{ width: '0%' }} /></div><span className="text-xs font-mono text-slate-400">00:30 / 01:15</span></div>
          </div>
        </div>

        <div className="bg-slate-950 border-r border-slate-800 flex flex-col order-1 lg:order-2">
          <div className="flex border-b border-slate-800"><button className="flex-1 py-3 text-sm font-bold text-white border-b-2 border-indigo-500 bg-slate-900/50">التعليقات (3)</button><button className="flex-1 py-3 text-sm font-medium text-slate-400 hover:text-white">النسخ (v3)</button></div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="bg-slate-900 rounded-xl p-3 border border-slate-800"><div className="flex justify-between items-start mb-2"><div className="flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">C</div><span className="text-sm font-bold text-slate-300">العميل</span></div><span className="text-xs text-indigo-400 font-mono bg-indigo-500/10 px-1 rounded">00:12</span></div><p className="text-sm text-slate-300">ممكن نسرع الإيقاع هنا شوية؟</p></div>
            <div className="bg-slate-900 rounded-xl p-3 border border-slate-800"><div className="flex justify-between items-start mb-2"><div className="flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold">M</div><span className="text-sm font-bold text-slate-300">أنت</span></div><span className="text-xs text-slate-500">منذ 10 د</span></div><p className="text-sm text-slate-300">تمام، هعدلها فوراً.</p></div>
          </div>
          <div className="p-4 border-t border-slate-800 bg-slate-900/50">
            <div className="relative"><textarea placeholder="أضف تعليقاً..." className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm text-right min-h-[80px]" /><button className="absolute bottom-3 left-3 bg-indigo-600 p-1.5 rounded-lg hover:bg-indigo-700"><ArrowRight className="w-4 h-4 text-white" /></button></div>
          </div>
        </div>
      </main>
    </div>
  );
}
"""
write_file("src/app/[locale]/studio/[projectId]/page.tsx", workspace_page)

# ==========================================
# 4. إصلاح صفحة الرسائل (Messages)
# ==========================================
messages_page = """'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Shield, Search, MoreVertical, Phone, AlertTriangle, Paperclip, Mic } from 'lucide-react';

const CONVERSATIONS = [
  { id: '1', name: "Wasla App Team", role: "Client", lastMessage: "متى يمكننا استلام النسخة الأولية؟", unread: 2, status: 'online', color: "bg-blue-600" },
  { id: '2', name: "Ahmed Sami", role: "Creator", lastMessage: "تم رفع الملفات على السيرفر.", unread: 0, status: 'busy', color: "bg-purple-600" },
];

const MESSAGES = [
  { id: '1', sender: 'other', text: "مرحباً، هل يمكننا التواصل خارج المنصة؟ العمولات هنا مرتفعة.", time: "10:30 AM" },
  { id: '2', sender: 'system', text: "⚠️ تم حجب الرسالة: اكتشف 'نظام الحارس' محاولة لمخالفة شروط الاستخدام.", time: "10:30 AM", type: 'warning' },
  { id: '3', sender: 'me', text: "دعنا نكمل العمل هنا، المنصة تضمن حقوقي وحقوقك.", time: "10:32 AM" },
  { id: '4', sender: 'other', text: "حسناً، اتفقنا. بخصوص الفيديو الأخير...", time: "10:35 AM" },
];

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState('1');
  const [inputText, setInputText] = useState('');

  return (
    <div className="h-[calc(100vh-64px)] bg-slate-950 text-white flex overflow-hidden pt-16">
      <aside className="w-full md:w-80 border-l border-slate-800 bg-slate-900/50 flex flex-col">
        <div className="p-4 border-b border-slate-800">
          <h2 className="text-xl font-bold mb-4">الرسائل</h2>
          <div className="relative"><Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" /><input type="text" placeholder="بحث..." className="w-full bg-slate-800 border-none rounded-xl py-2 pr-10 pl-4 text-sm focus:ring-1 focus:ring-indigo-500" /></div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {CONVERSATIONS.map((chat) => (
            <div key={chat.id} onClick={() => setSelectedChat(chat.id)} className={`p-4 flex items-center gap-3 cursor-pointer border-b border-slate-800/50 ${selectedChat === chat.id ? 'bg-indigo-900/20 border-r-2 border-indigo-500' : 'hover:bg-slate-800/50'}`}>
              <div className="relative"><div className={`w-12 h-12 rounded-full ${chat.color} flex items-center justify-center font-bold text-lg`}>{chat.name.charAt(0)}</div><div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-900 ${chat.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`} /></div>
              <div className="flex-1 min-w-0"><div className="flex justify-between items-center mb-1"><h3 className="font-bold truncate">{chat.name}</h3>{chat.unread > 0 && <span className="bg-indigo-600 text-xs px-1.5 py-0.5 rounded-full">{chat.unread}</span>}</div><p className="text-sm text-slate-400 truncate">{chat.lastMessage}</p></div>
            </div>
          ))}
        </div>
      </aside>

      <main className="flex-1 flex flex-col bg-slate-950 relative">
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/30 backdrop-blur">
          <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">W</div><div><div className="font-bold">Wasla App Team</div><div className="text-xs text-green-500">متصل الآن</div></div></div>
          <div className="flex items-center gap-4 text-slate-400"><div className="flex items-center gap-1 text-xs bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full border border-indigo-500/20"><Shield className="w-3 h-3" /> مؤمن بواسطة الحارس</div></div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {MESSAGES.map((msg) => (
            <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
              {msg.type === 'warning' ? (
                <div className="max-w-2xl w-full bg-red-900/10 border border-red-500/30 rounded-lg p-4 flex gap-3 items-start"><AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" /><div><h4 className="text-red-500 font-bold text-sm mb-1">نظام الحارس الأمني</h4><p className="text-slate-300 text-sm">{msg.text}</p></div></div>
              ) : (
                <div className={`max-w-[70%] rounded-2xl p-4 ${msg.sender === 'me' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-slate-800 text-slate-200 rounded-bl-none'}`}><p className="text-sm leading-relaxed">{msg.text}</p><span className={`text-[10px] block text-right mt-1 ${msg.sender === 'me' ? 'text-indigo-200' : 'text-slate-500'}`}>{msg.time}</span></div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="p-4 bg-slate-900/50 border-t border-slate-800">
          <div className="flex items-center gap-3 max-w-4xl mx-auto">
            <button className="p-2 text-slate-400 hover:text-white"><Paperclip className="w-5 h-5" /></button>
            <div className="flex-1 relative"><input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="اكتب رسالتك هنا..." className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 text-white text-right" /></div>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-xl"><Send className="w-5 h-5" /></button>
          </div>
        </div>
      </main>
    </div>
  );
}
"""
write_file("src/app/[locale]/messages/page.tsx", messages_page)

# ==========================================
# 5. إصلاح صفحة المجتمع (Community)
# ==========================================
community_page = """'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Heart, Share2, TrendingUp, Hash } from 'lucide-react';

const POSTS = [
  { id: 1, author: "كريم المونتير", badge: "Top Rated", avatar: "bg-green-600", content: "يا شباب، إيه رأيكم في آخر تعديل على التلوين؟ استخدمت DaVinci Resolve مع LUTs خاصة. هل التباين مظبوط؟", tags: ["ColorGrading", "Feedback"], likes: 45, comments: 12, time: "منذ ساعتين" },
  { id: 2, author: "Sarah Motion", badge: "Expert", avatar: "bg-pink-600", content: "نصيحة للمبتدئين في الأفتر إفكتس: بلاش تكتروا من الـ Plugins في البداية. ركزوا على الـ Graph Editor.", tags: ["Tips", "AfterEffects"], likes: 120, comments: 34, time: "منذ 5 ساعات" }
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="hidden lg:block space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2 text-indigo-400"><TrendingUp className="w-4 h-4" /> المواضيع الرائجة</h3>
            <div className="space-y-3">{['#Premiere_Pro_2026', '#AI_Editing', '#Freelance_Rates'].map(tag => (<div key={tag} className="flex justify-between text-sm text-slate-400 hover:text-white cursor-pointer transition-colors"><span>{tag}</span><span className="text-slate-600">2.4k</span></div>))}</div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4"><div className="flex gap-4"><div className="w-10 h-10 rounded-full bg-indigo-600 flex-shrink-0" /><input type="text" placeholder="شارك أفكارك أو اسأل المجتمع..." className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 text-white" /></div></div>
          {POSTS.map((post, i) => (
            <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors">
              <div className="flex items-center gap-3 mb-4"><div className={`w-10 h-10 rounded-full ${post.avatar} flex items-center justify-center font-bold`}>{post.author.charAt(0)}</div><div><div className="flex items-center gap-2"><span className="font-bold">{post.author}</span><span className="text-[10px] bg-yellow-500/10 text-yellow-500 px-2 py-0.5 rounded border border-yellow-500/20">{post.badge}</span></div><div className="text-xs text-slate-500">{post.time}</div></div></div>
              <p className="text-slate-300 leading-relaxed mb-4">{post.content}</p>
              <div className="flex flex-wrap gap-2 mb-6">{post.tags.map(tag => (<span key={tag} className="text-xs text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded flex items-center gap-1"><Hash className="w-3 h-3" />{tag}</span>))}</div>
              <div className="flex items-center gap-6 border-t border-slate-800 pt-4 text-slate-400"><button className="flex items-center gap-2 hover:text-red-500"><Heart className="w-5 h-5" /><span>{post.likes}</span></button><button className="flex items-center gap-2 hover:text-indigo-400"><MessageSquare className="w-5 h-5" /><span>{post.comments}</span></button><button className="flex items-center gap-2 hover:text-white ml-auto"><Share2 className="w-5 h-5" /><span>مشاركة</span></button></div>
            </motion.div>
          ))}
        </div>

        <div className="hidden lg:block">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sticky top-24"><h3 className="font-bold mb-4">مبدعين قد تعرفهم</h3><div className="space-y-4">{[1, 2, 3].map((user) => (<div key={user} className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-slate-700" /><div className="flex-1"><div className="text-sm font-bold">User {user}</div><div className="text-xs text-slate-500">Video Editor</div></div><button className="text-xs text-indigo-400 font-bold hover:underline">متابعة</button></div>))}</div></div>
        </div>
      </div>
    </div>
  );
}
"""
write_file("src/app/[locale]/community/page.tsx", community_page)

# ==========================================
# 6. إنشاء صفحات الوكالة (Agency & Team)
# ==========================================
agency_page = """'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Users, BarChart3, Briefcase, Plus } from 'lucide-react';

export default function AgencyDashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 pb-20 pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10"><div><h1 className="text-3xl font-bold mb-2">لوحة تحكم الوكالة</h1><p className="text-slate-400">إدارة الفريق، المشاريع، والتحليلات.</p></div><div className="flex gap-3"><button className="bg-slate-800 px-4 py-2 rounded-xl text-sm font-bold">الإعدادات</button><button className="bg-indigo-600 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2"><Plus className="w-4 h-4" /> دعوة عضو</button></div></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[{ label: "إجمالي الإيرادات", val: "54,000 EGP", icon: BarChart3, color: "text-green-400", bg: "bg-green-500/10" }, { label: "أعضاء الفريق", val: "8 نشط", icon: Users, color: "text-blue-400", bg: "bg-blue-500/10" }, { label: "مشاريع جارية", val: "12 مشروع", icon: Briefcase, color: "text-purple-400", bg: "bg-purple-500/10" }].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center justify-between"><div><div className="text-slate-400 text-sm mb-1">{stat.label}</div><div className="text-2xl font-bold">{stat.val}</div></div><div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}><stat.icon className="w-6 h-6" /></div></motion.div>
          ))}
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6"><h2 className="text-xl font-bold mb-6">نشاط الفريق الأخير</h2><div className="space-y-4">{[1, 2, 3].map((item) => (<div key={item} className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800"><div className="flex items-center gap-4"><div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold">M</div><div><div className="font-bold">محمد علي</div><div className="text-xs text-slate-500">قام برفع ملف جديد في مشروع "إعلان بيبسي"</div></div></div><span className="text-xs text-slate-400">منذ 15 دقيقة</span></div>))}</div></div>
      </div>
    </div>
  );
}
"""
write_file("src/app/[locale]/agency/page.tsx", agency_page)

team_page = """'use client';
import React from 'react';
import { Mail, Trash2 } from 'lucide-react';

const MEMBERS = [
  { id: 1, name: "كريم يحيى", role: "Admin", email: "karim@agency.com" },
  { id: 2, name: "سارة حسن", role: "Editor", email: "sara@agency.com" },
  { id: 3, name: "مازن أحمد", role: "Colorist", email: "mazen@agency.com" },
];

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 pb-20 pt-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">إدارة الفريق</h1>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <table className="w-full text-right">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400"><tr><th className="p-4 font-medium">الاسم</th><th className="p-4 font-medium">الدور</th><th className="p-4 font-medium">البريد الإلكتروني</th><th className="p-4 font-medium">إجراءات</th></tr></thead>
            <tbody>
              {MEMBERS.map((member) => (
                <tr key={member.id} className="border-b border-slate-800 last:border-0 hover:bg-slate-800/50"><td className="p-4 font-bold">{member.name}</td><td className="p-4"><span className={`px-2 py-1 rounded text-xs border ${member.role === 'Admin' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>{member.role}</span></td><td className="p-4 text-slate-400">{member.email}</td><td className="p-4"><button className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/10 rounded-lg"><Trash2 className="w-4 h-4" /></button></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
"""
write_file("src/app/[locale]/agency/team/page.tsx", team_page)

print("\n🚀 تم إصلاح جميع الملفات المبتورة وإنشاء ملفات الوكالة بنجاح.")
