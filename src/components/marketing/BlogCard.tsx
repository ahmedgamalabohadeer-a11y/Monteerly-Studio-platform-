import React from 'react';
import Image from 'next/image';
import { Calendar, User } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface BlogCardProps {
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  author: string;
}

export function BlogCard({ title, excerpt, image, category, date, author }: BlogCardProps) {
  return (
    <article className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
       <div className="relative h-48 overflow-hidden">
          <Image 
             src={image} 
             alt={title} 
             fill 
             className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3">
             <Badge variant="secondary" className="bg-white/90 backdrop-blur text-black font-bold shadow-sm">
                {category}
             </Badge>
          </div>
       </div>

       <div className="p-5">
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
             <span className="flex items-center gap-1"><Calendar size={12} /> {date}</span>
             <span className="flex items-center gap-1"><User size={12} /> {author}</span>
          </div>
          
          <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
             <a href="#">{title}</a>
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
             {excerpt}
          </p>
       </div>
    </article>
  );
}
