'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Marker {
  id: string;
  timecode: number;
}

export function VideoHeatmap({ jobId, duration }: { jobId: string; duration: number }) {
  const [markers, setMarkers] = useState<Marker[]>([]);

  useEffect(() => {
    const fetchMarkers = async () => {
      const { data, error } = await supabase
        .from('video_annotations')
        .select('id, timecode')
        .eq('job_id', jobId);

      if (!error && data) {
        setMarkers(data);
      }
    };

    fetchMarkers();

    // الاستماع للإضافات الجديدة لحظياً
    const channel = supabase.channel('heatmap-sync')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'video_annotations' }, (payload) => {
        setMarkers((prev) => [...prev, payload.new as Marker]);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [jobId]);

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center">
      {markers.map((marker) => (
        <div
          key={marker.id}
          className="absolute w-1.5 h-1.5 bg-indigo-400 rounded-full border border-white/50 shadow-[0_0_8px_rgba(129,140,248,0.8)]"
          style={{ left: `${(marker.timecode / duration) * 100}%` }}
        />
      ))}
    </div>
  );
}
