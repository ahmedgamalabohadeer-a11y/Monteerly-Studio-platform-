// @ts-nocheck
"use client";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Layout, Plus, Clock, Folder, Bell, 
  TrendingUp, Users, Video, QrCode, Layers, MoreHorizontal
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLang } from "@/context/LanguageContext";

export default function DashboardPage() {
  const { user } = useAuth();
  const { t } = useLang();

  const projects = [
    { id: 1, title: "Alpha Campaign", status: "Editing", progress: 65, updated: "2h ago" },
    { id: 2, title: "Summer Vlog", status: "Review", progress: 90, updated: "5h ago" },
    { id: 3, title: "Tech Review", status: "Planning", progress: 15, updated: "1d ago" },
  ];

  const quickApps = [
    { name: "Monitor", icon: Video, color: "text-red-500", bg: "bg-red-500/10", link: "/apps/monitor" },
    { name: "Digital ID", icon: QrCode, color: "text-blue-500", bg: "bg-blue-500/10", link: "/apps/id" },
    { name: "Logger", icon: Layers, color: "text-green-500", bg: "bg-green-500/10", link: "/apps/logger" },
  ];

  return (
    <div className="min-h-screen bg-[#020817] text-white font-sans selection:bg-blue-500/30 overflow-hidden relative">
      <Navbar />
      
      {/* Background Blobs (Identity Injection) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
         <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px] animate-pulse" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[100px] animate-pulse" />
      </div>
      
      <main className="container mx-auto px-6 pt-32 pb-24 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {t('dash.welcome')}, <span className="text-blue-400">{user?.displayName || "Creator"}</span> 👋
            </h1>
            <p className="text-gray-400">{t('dash.overview')}</p>
          </div>
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-900/20">
            <Plus size={20} /> {t('dash.new_project')}
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-6 rounded-3xl bg-[#0f172a]/80 backdrop-blur border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><Folder size={64} /></div>
            <div className="text-gray-400 text-sm mb-2">{t('dash.active_projects')}</div>
            <div className="text-4xl font-bold">12</div>
            <div className="mt-4 text-green-500 text-xs flex items-center gap-1"><TrendingUp size={12} /> +2 {t('dash.month')}</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-6 rounded-3xl bg-[#0f172a]/80 backdrop-blur border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><Clock size={64} /></div>
            <div className="text-gray-400 text-sm mb-2">{t('dash.hours')}</div>
            <div className="text-4xl font-bold">48h</div>
            <div className="mt-4 text-gray-500 text-xs">{t('dash.days')}</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="p-6 rounded-3xl bg-[#0f172a]/80 backdrop-blur border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><Users size={64} /></div>
            <div className="text-gray-400 text-sm mb-2">{t('dash.team')}</div>
            <div className="text-4xl font-bold">5</div>
            <div className="mt-4 text-blue-500 text-xs">{t('dash.online')}</div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Projects List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold flex items-center gap-2"><Layout size={20} /> {t('dash.recent_projects')}</h2>
              <button className="text-sm text-blue-400 hover:underline">{t('dash.view_all')}</button>
            </div>
            
            <div className="space-y-4">
              {projects.map((p, i) => (
                <motion.div 
                  key={p.id} 
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i }}
                  className="p-5 rounded-2xl bg-[#0f172a]/50 border border-white/5 hover:bg-[#0f172a] hover:border-white/10 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 font-bold text-lg">
                      {p.title.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold">{p.title}</h3>
                      <p className="text-xs text-gray-400">{t('dash.last_update')}: {p.updated}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="hidden md:block w-32 bg-gray-800 rounded-full h-2 overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full" style={{ width: `${p.progress}%` }}></div>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full border ${p.status === 'Editing' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 'bg-green-500/10 text-green-500 border-green-500/20'}`}>
                      {p.status}
                    </span>
                    <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400"><MoreHorizontal size={18} /></button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Apps */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">🚀 {t('dash.quick_access')}</h2>
            <div className="grid gap-4">
              {quickApps.map((app, i) => (
                <Link key={app.name} href={app.link} className="block">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-[#0f172a]/50 border border-white/5 hover:border-white/20 transition-all"
                  >
                    <div className={`w-12 h-12 rounded-xl ${app.bg} ${app.color} flex items-center justify-center`}>
                      <app.icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold">{t(`monitor.title`) === app.name ? t('monitor.title') : (t(`id.title`) === app.name ? t('id.title') : app.name)}</h3>
                      <p className="text-xs text-gray-500">{t('dash.open_app')}</p>
                    </div>
                    <div className="mr-auto text-gray-600"><Plus size={16} className="rotate-45" /></div>
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* Notifications */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-white/5 mt-8">
              <div className="flex items-center gap-3 mb-4">
                <Bell size={20} className="text-yellow-500" />
                <h3 className="font-bold">{t('dash.alerts')}</h3>
              </div>
              <ul className="space-y-3">
                <li className="text-sm text-gray-300 border-l-2 border-blue-500 pl-3">
                  Project X render completed.
                </li>
                <li className="text-sm text-gray-300 border-l-2 border-green-500 pl-3">
                  New member joined the team.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
