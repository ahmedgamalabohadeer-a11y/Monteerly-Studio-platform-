'use client';
import React from 'react';
import { Trophy, Clock, Users } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export function ContestHub() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       {[1, 2].map((i) => (
          <div key={i} className="border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow bg-card">
             <div className="h-32 bg-gradient-to-r from-pink-500 to-rose-500 p-6 text-white relative">
                <Badge variant="secondary" className="absolute top-4 left-4 bg-white/20 text-white border-none">مسابقة</Badge>
                <h3 className="text-xl font-bold mt-2">تصميم هوية بصرية لشركة Tech</h3>
                <div className="absolute bottom-4 right-4 flex items-center gap-2 font-bold text-yellow-300">
                   <Trophy size={18} /> جائزة: $1,500
                </div>
             </div>
             <div className="p-4 flex justify-between items-center text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Clock size={14} /> باقي 3 أيام</span>
                <span className="flex items-center gap-1"><Users size={14} /> 45 مشارك</span>
             </div>
          </div>
       ))}
    </div>
  );
}

