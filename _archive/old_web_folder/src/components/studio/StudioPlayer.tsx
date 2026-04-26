// @ts-nocheck
'use client';
import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { Play, Pause, SkipBack, SkipForward, Maximize, PenTool } from 'lucide-react';
import { useProjectStore } from '@/store/useProjectStore';

export const StudioPlayer = () => {
  const playerRef = useRef<ReactPlayer>(null);
  const { isPlaying, setIsPlaying, setCurrentTime, currentTime } = useProjectStore();
  const [drawMode, setDrawMode] = useState(false);

  const handlePlayPause = () => setIsPlaying(!isPlaying);

  const handleProgress = (state: { playedSeconds: number }) => {
    if (!isPlaying) return; // منع التحديث العشوائي
    setCurrentTime(state.playedSeconds);
  };

  // محاكاة التنقل بالفريم (نفترض 30fps)
  const stepFrame = (frames: number) => {
    const current = playerRef.current?.getCurrentTime() || 0;
    const newTime = current + (frames / 30);
    playerRef.current?.seekTo(newTime, 'seconds');
    setCurrentTime(newTime);
  };

  return (
    <div className="flex flex-col h-full bg-black relative group">
      {/* Video Area */}
      <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden">
        <ReactPlayer
          ref={playerRef}
          url="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" // Placeholder Video
          width="100%"
          height="100%"
          playing={isPlaying}
          onProgress={handleProgress}
          controls={false} // Custom controls only
        />
        
        {/* Drawing Canvas Overlay (Placeholder functionality) */}
        {drawMode && (
          <div className="absolute inset-0 z-20 cursor-crosshair border-4 border-brand-alert/50 pointer-events-none">
            <div className="absolute top-4 right-4 bg-brand-alert text-white text-xs px-3 py-1 rounded-full">
              وضع الرسم نشط
            </div>
          </div>
        )}
      </div>

      {/* Custom Controls Bar */}
      <div className="h-16 bg-brand-dark border-t border-gray-800 flex items-center px-6 gap-6 z-30">
        <button 
          onClick={handlePlayPause}
          className="w-10 h-10 rounded-full bg-brand-secondary text-white flex items-center justify-center hover:scale-110 transition-transform"
        >
          {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
        </button>

        <div className="flex items-center gap-2 border-l border-r border-gray-700 px-4 mx-2">
          <button onClick={() => stepFrame(-1)} className="text-gray-400 hover:text-white p-2" title="إطار للخلف">
            <SkipBack size={18} />
          </button>
          <span className="font-mono text-brand-secondary text-lg font-bold min-w-[80px] text-center">
            {new Date(currentTime * 1000).toISOString().substr(14, 5)}
            <span className="text-xs text-gray-500 ml-1">:{Math.floor((currentTime % 1) * 30)}f</span>
          </span>
          <button onClick={() => stepFrame(1)} className="text-gray-400 hover:text-white p-2" title="إطار للأمام">
            <SkipForward size={18} />
          </button>
        </div>

        {/* Tools */}
        <div className="flex-1 flex justify-center gap-4">
          <button 
            onClick={() => setDrawMode(!drawMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${drawMode ? 'bg-brand-alert text-white' : 'hover:bg-gray-800 text-gray-300'}`}
          >
            <PenTool size={16} />
            <span className="text-sm">رسم</span>
          </button>
        </div>

        <button className="text-gray-400 hover:text-white">
          <Maximize size={20} />
        </button>
      </div>
    </div>
  );
};

