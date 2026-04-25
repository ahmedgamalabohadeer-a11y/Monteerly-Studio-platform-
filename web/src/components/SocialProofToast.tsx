'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const NOTIFICATIONS = [
  { name: "أحمد م.", action: "انضم إلى الاستوديو", time: "منذ دقيقة" },
  { name: "Sara Design", action: "أنهت مشروعاً جديداً", time: "منذ 3 دقائق" },
  { name: "Media House", action: "رقت الخطة إلى Pro", time: "منذ 10 دقائق" }
];

export default function SocialProofToast() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % NOTIFICATIONS.length);
        setVisible(true);
      }, 500);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-40 pointer-events-none">
      <AnimatePresence mode='wait'>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: -20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20, x: -20 }}
            className="bg-slate-900/90 backdrop-blur border border-slate-700 p-4 rounded-xl shadow-2xl flex items-center gap-3 min-w-[250px]"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-xs">
              {NOTIFICATIONS[index].name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-bold text-white">{NOTIFICATIONS[index].name}</p>
              <p className="text-xs text-slate-400">{NOTIFICATIONS[index].action} • {NOTIFICATIONS[index].time}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
