'use client';
import React, { useRef } from 'react';

export const SignaturePad = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  return (
    <div className="border-2 border-dashed border-gray-700 rounded-xl p-2 bg-white/5">
      <canvas 
        ref={canvasRef} 
        className="w-full h-40 cursor-crosshair"
        onMouseDown={() => console.log('Signing...')}
      />
    </div>
  );
};
