'use client';
import React, { useState } from 'react';
import { Folder, FolderOpen, FileVideo, FileAudio, FileImage, ChevronRight, ChevronDown } from 'lucide-react';
// نوع البيانات لمحاكاة الهيكل الشجري
type Node = {
  id: string;
  name: string;
  type: 'folder' | 'file';
  fileType?: 'video' | 'audio' | 'image';
  children?: Node[];
};
const initialData: Node[] = [
  {
    id: '1', name: 'Raw Footage', type: 'folder', children: [
      { id: '1-1', name: 'Camera A', type: 'folder', children: [
         { id: '1-1-1', name: 'C001.mp4', type: 'file', fileType: 'video' },
         { id: '1-1-2', name: 'C002.mp4', type: 'file', fileType: 'video' },
      ]},
      { id: '1-2', name: 'Drone', type: 'folder', children: [] },
    ]
  },
  {
    id: '2', name: 'Audio', type: 'folder', children: [
      { id: '2-1', name: 'Music.wav', type: 'file', fileType: 'audio' },
      { id: '2-2', name: 'SFX_Whoosh.mp3', type: 'file', fileType: 'audio' },
    ]
  },
  { id: '3', name: 'Graphics', type: 'folder', children: [
      { id: '3-1', name: 'Logo.png', type: 'file', fileType: 'image' }
  ]}
];
export function FileTree() {
  return (
    <div className="w-64 bg-card border-r border-border h-full flex flex-col">
       <div className="p-3 border-b border-border bg-muted/10 text-xs font-bold uppercase text-muted-foreground">
          Project Explorer
       </div>
       <div className="flex-1 overflow-y-auto p-2">
          {initialData.map((node) => (
             <TreeNode key={node.id} node={node} level={0} />
          ))}
       </div>
    </div>
  );
}
function TreeNode({ node, level }: { node: Node, level: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const paddingLeft = level * 16 + 12;
  const getIcon = () => {
    if (node.type === 'folder') return isOpen ? <FolderOpen size={16} className="text-yellow-500" /> : <Folder size={16} className="text-yellow-500" />;
    if (node.fileType === 'video') return <FileVideo size={16} className="text-blue-500" />;
    if (node.fileType === 'audio') return <FileAudio size={16} className="text-purple-500" />;
    return <FileImage size={16} className="text-emerald-500" />;
  };
  return (
    <div>
       <div 
          className="flex items-center gap-2 py-1.5 px-2 hover:bg-muted/50 rounded cursor-pointer text-sm select-none transition-colors"
          style={{ paddingLeft: `${paddingLeft}px` }}
          onClick={() => node.type === 'folder' && setIsOpen(!isOpen)}
       >
          {node.type === 'folder' && (
             <span className="text-muted-foreground">
                {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
             </span>
          )}
          {node.type === 'file' && <span className="w-3.5" />} {/* Spacer */}
          {getIcon()}
          <span className="truncate">{node.name}</span>
       </div>
       {isOpen && node.children && (
          <div>
             {node.children.map((child) => (
                <TreeNode key={child.id} node={child} level={level + 1} />
             ))}
          </div>
       )}
    </div>
  );
}
