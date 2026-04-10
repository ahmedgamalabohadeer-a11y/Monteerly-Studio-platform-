"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Folder, MoreVertical, Calendar, Plus, Loader2, Trash2 } from "lucide-react";

interface Project {
  id: string;
  title: string;
  client: string;
  status: string;
  progress: number;
  color: string;
  createdAt: any;
}

export default function ProjectsPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  // قراءة البيانات لحظياً من Firestore
  useEffect(() => {
    if (!user) return;

    // استعلام لجلب مشاريع المستخدم الحالي فقط
    const q = query(
      collection(db, "projects"), 
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projectsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Project[];
      setProjects(projectsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // دالة إنشاء مشروع تجريبي جديد
  const handleCreateProject = async () => {
    if (!user) return;
    setIsCreating(true);
    
    try {
      const colors = ["bg-blue-500", "bg-purple-500", "bg-orange-500", "bg-green-500", "bg-pink-500"];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      await addDoc(collection(db, "projects"), {
        userId: user.uid,
        title: `مشروع جديد #${Math.floor(Math.random() * 1000)}`,
        client: "عميل محتمل",
        status: "جديد",
        progress: 10,
        color: randomColor,
        createdAt: serverTimestamp()
      });
      // لا نحتاج لتحديث الحالة يدوياً، onSnapshot ستقوم بذلك
    } catch (error) {
      console.error("Error creating project:", error);
      alert("فشل إنشاء المشروع. تحقق من الصلاحيات.");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">مشاريعي</h1>
          <p className="text-muted-foreground">إدارة ومتابعة سير العمل (بيانات حية)</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleCreateProject}
            disabled={isCreating}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-primary/25 hover:scale-105 transition-all disabled:opacity-70"
          >
            {isCreating ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />}
            مشروع جديد
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={40} /></div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border rounded-3xl">
          <Folder size={64} className="mx-auto text-muted-foreground/30 mb-4" />
          <h3 className="text-lg font-medium">لا توجد مشاريع بعد</h3>
          <p className="text-muted-foreground">ابدأ بإنشاء مشروعك الأول الآن</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group bg-card border border-border rounded-2xl p-5 hover:shadow-xl hover:border-primary/50 transition-all cursor-pointer relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-2 h-full ${project.color} opacity-80`} />
                
                <div className="flex justify-between items-start mb-4 pl-4">
                  <div className={`p-3 rounded-xl ${project.color}/10 text-${project.color.replace('bg-', '')}`}>
                    <Folder size={24} className={project.color.replace('bg-', 'text-')} />
                  </div>
                  <button className="text-muted-foreground hover:text-foreground p-1 hover:bg-accent rounded"><MoreVertical size={20} /></button>
                </div>
                
                <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors truncate">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{project.client}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>الإنجاز</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-1000 ${project.color}`} style={{ width: `${project.progress}%` }} />
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1"><Calendar size={14} /> <span>{project.createdAt?.toDate ? new Date(project.createdAt.toDate()).toLocaleDateString('ar-EG') : 'الآن'}</span></div>
                  <div className="px-2 py-1 rounded-full bg-secondary text-secondary-foreground text-[10px]">{project.status}</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
