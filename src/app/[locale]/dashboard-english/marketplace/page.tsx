"use client";

import { motion } from "framer-motion";
import { Search, Filter, Star, ShoppingCart } from "lucide-react";

export default function MarketplacePage() {
  const items = [
    { id: 1, title: "مصحح ألوان سينمائي", price: "$50/hr", rating: 4.9, category: "Video Editing", image: "bg-purple-500" },
    { id: 2, title: "Cinematic Sound Pack", price: "$29", rating: 4.5, category: "Assets", image: "bg-blue-500" },
    { id: 3, title: "قوالب موشن جرافيك", price: "$15", rating: 4.8, category: "Templates", image: "bg-orange-500" },
    { id: 4, title: "خدمة تعليق صوتي", price: "$30/min", rating: 5.0, category: "Audio", image: "bg-green-500" },
    { id: 5, title: "سكربتات يوتيوب", price: "$100", rating: 4.7, category: "Writing", image: "bg-red-500" },
    { id: 6, title: "إدارة قنوات", price: "$500/mo", rating: 4.6, category: "Management", image: "bg-indigo-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">سوق Monteerly</h1>
          <p className="text-muted-foreground">اكتشف أفضل المواهب والأصول الرقمية</p>
        </div>
        <div className="flex gap-2 flex-1 md:max-w-md">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <input type="text" placeholder="ابحث عن خدمات..." className="h-10 w-full rounded-lg border border-input bg-background pr-10 pl-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <button className="p-2 border border-input rounded-lg hover:bg-accent"><Filter size={20} /></button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-2xl transition-all flex flex-col"
          >
            <div className={`h-40 w-full ${item.image} opacity-80 group-hover:opacity-100 transition-opacity relative`}>
              <span className="absolute top-2 right-2 px-2 py-1 bg-black/50 backdrop-blur-md text-white text-xs rounded-md">{item.category}</span>
            </div>
            
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold truncate pr-2">{item.title}</h3>
                <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold">
                  <Star size={12} fill="currentColor" /> {item.rating}
                </div>
              </div>
              <div className="mt-auto pt-4 flex items-center justify-between">
                <p className="text-lg font-bold text-primary">{item.price}</p>
                <button className="p-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-primary hover:text-white transition-colors">
                  <ShoppingCart size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
