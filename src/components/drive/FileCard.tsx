'use client';
import React from 'react';
import { FileVideo, FileAudio, FileImage, Folder, MoreVertical, Share2, Download } from 'lucide-react';

interface FileProps {
  name: string;
  type: 'folder' | 'video' | 'image' | 'audio';
  size?: string;
  date: string;
  thumbnail?: string;
}

export function FileCard({ name, type, size, date, thumbnail }: FileProps) {
  const icons = {
    folder: <Folder size={32} className="text-yellow-400 fill-yellow-400/20" />,
    video: <FileVideo size={32} className="text-blue-400" />,
    image: <FileImage size={32} className="text-purple-400" />,
    audio: <FileAudio size={32} className="text-pink-400" />,
  };

  return (
    <div className="group bg-slate-900 border border-white/10 rounded-xl p-4 hover:bg-white/5 hover:border-indigo-500/50 transition-all cursor-pointer relative">
       {/* Thumbnail / Icon Area */}
       <div className="aspect-square bg-black/40 rounded-lg mb-4 flex items-center justify-center overflow-hidden border border-white/5">
          {thumbnail ? (
             <img src={thumbnail} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          ) : (
             <div className="group-hover:scale-110 transition-transform duration-300">
                {icons[type]}
             </div>
          )}
          
          {/* Hover Overlay Actions */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
             <button className="p-2 bg-white text-black rounded-full hover:bg-indigo-500 hover:text-white transition-colors" title="Download"><Download size={16}/></button>
             <button className="p-2 bg-white text-black rounded-full hover:bg-indigo-500 hover:text-white transition-colors" title="Share"><Share2 size={16}/></button>
          </div>
       </div>

       {/* Meta Data */}
       <div className="flex justify-between items-start">
          <div className="overflow-hidden">
             <h4 className="font-bold text-white text-sm truncate mb-1" title={name}>{name}</h4>
             <p className="text-[10px] text-slate-500 flex gap-2">
                <span>{date}</span>
                {size && <span>• {size}</span>}
             </p>
          </div>
          <button className="text-slate-500 hover:text-white"><MoreVertical size={16} /></button>
       </div>
    </div>
  );
}

