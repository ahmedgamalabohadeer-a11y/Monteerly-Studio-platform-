'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';

export function LutLibrary() {
  const [selectedLut, setSelectedLut] = useState<string | null>(null);

  const luts = [
    { id: 'teal-orange', name: 'Teal & Orange', color: 'from-orange-500 to-teal-500' },
    { id: 'bw-noir', name: 'B&W Noir', color: 'from-gray-900 to-gray-500' },
    { id: 'vintage', name: 'Vintage 1980', color: 'from-yellow-600 to-red-400' },
    { id: 'cyberpunk', name: 'Cyberpunk', color: 'from-purple-600 to-pink-500' },
    { id: 'matrix', name: 'Matrix Green', color: 'from-green-900 to-green-400' },
    { id: 'warm', name: 'Warm Sunset', color: 'from-orange-400 to-yellow-300' },
  ];

  return (
    <div className="p-4 bg-card border border-border rounded-xl">
       <h3 className="font-bold text-sm mb-4">مكتبة الألوان (LUTs)</h3>
       
       <div className="grid grid-cols-2 gap-3">
          {luts.map((lut) => (
             <div 
                key={lut.id}
                onClick={() => setSelectedLut(lut.id)}
                className={`relative aspect-video rounded-lg overflow-hidden cursor-pointer group border-2 transition-all ${selectedLut === lut.id ? 'border-primary ring-2 ring-primary/30' : 'border-transparent hover:border-border'}`}
             >
                {/* Simulated LUT Effect Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${lut.color} opacity-40 mix-blend-overlay z-10`} />
                
                {/* Base Image */}
                <Image src="/images/sample_frame.jpg" alt="Preview" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                
                {/* Label */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1 text-[10px] text-center text-white z-20 backdrop-blur-sm">
                   {lut.name}
                </div>

                {selectedLut === lut.id && (
                   <div className="absolute top-1 right-1 bg-primary text-white rounded-full p-0.5 z-20">
                      <Check size={12} />
                   </div>
                )}
             </div>
          ))}
       </div>
    </div>
  );
}
