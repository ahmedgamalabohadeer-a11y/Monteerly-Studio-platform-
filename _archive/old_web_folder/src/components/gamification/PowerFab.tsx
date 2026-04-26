'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Video, Wallet, Zap } from 'lucide-react';

export const PowerFab = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const menuItems = [
    { icon: Video, color: 'bg-blue-500', label: 'مشروع جديد' },
    { icon: Zap, color: 'bg-purple-500', label: 'توليد إعلان' },
    { icon: Wallet, color: 'bg-emerald-500', label: 'شحن رصيد' },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <div className="flex flex-col gap-3 mb-2">
            {menuItems.map((item, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 group"
              >
                <span className="bg-brand-surface text-white text-sm px-3 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {item.label}
                </span>
                <div className={`${item.color} p-3 rounded-full shadow-lg text-white hover:scale-110 transition-transform`}>
                  <item.icon size={20} />
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleOpen}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`p-4 rounded-full shadow-2xl text-white transition-colors ${
          isOpen ? 'bg-brand-alert rotate-45' : 'bg-brand-secondary'
        }`}
      >
        <Plus size={28} />
      </motion.button>
    </div>
  );
};

