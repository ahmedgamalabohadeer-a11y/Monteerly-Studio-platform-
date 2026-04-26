'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface BlogProps {
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  category: string;
  slug: string;
}

export function BlogCard({ title, excerpt, image, author, date, category, slug }: BlogProps) {
  return (
    <div className="group bg-slate-900 border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all hover:-translate-y-1">
       <div className="h-48 overflow-hidden relative">
          <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10">
             {category}
          </div>
       </div>
       
       <div className="p-6">
          <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
             <span className="flex items-center gap-1"><Calendar size={12}/> {date}</span>
             <span className="flex items-center gap-1"><User size={12}/> {author}</span>
          </div>
          
          <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-indigo-400 transition-colors">
             <Link href={`/blog/${slug}`}>{title}</Link>
          </h3>
          
          <p className="text-slate-400 text-sm mb-6 line-clamp-2">
             {excerpt}
          </p>
          
          <Link href={`/blog/${slug}`}>
             <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/10 group-hover:border-indigo-500/30">
                اقرأ المزيد <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
             </Button>
          </Link>
       </div>
    </div>
  );
}

