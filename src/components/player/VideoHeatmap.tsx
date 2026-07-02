'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Marker {
  id: string;
  timecode: number;
}

interface VideoHeatmapProps {
  jobId: string;
  duration: number;
  activeVersion?: number;
}

export function VideoHeatmap({
  jobId,
  duration,
  activeVersion = 1,
}: VideoHeatmapProps) {
  const [markers, setMarkers] = useState<Marker[]>([]);

  useEffect(() => {
    const fetchMarkers = async () => {
      const { data, error } = await supabase
        .from('video_annotations')
        .select('id, timecode')
        .eq('job_id', jobId)
        .eq('version_number', activeVersion);

      if (!error && data) {
        setMarkers(data);
      }
    };

    fetchMarkers();

    const channel = supabase
      .channel(`heatmap-sync-${jobId}-${activeVersion}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'video_annotations',
          filter: `job_id=eq.${jobId}`,
        },
        (payload) => {
          const newMarker = payload.new as {
            id?: string;
            timecode?: number;
            version_number?: number;
          };

          if (newMarker.version_number === activeVersion && typeof newMarker.timecode === 'number' && newMarker.id) {
            setMarkers((prev) => [...prev, { id: newMarker.id, timecode: newMarker.timecode }]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [jobId, activeVersion]);

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center">
      {markers.map((marker) => (
        <div
          key={marker.id}
          className="absolute w-1.5 h-1.5 bg-indigo-400 rounded-full border border-white/50 shadow-[0_0_8px_rgba(129,140,248,0.8)]"
          style={{ left: `${(marker.timecode / duration) * 100}%`, transform: 'translateY(4px)' }}
        />
      ))}
    </div>
  );
}
