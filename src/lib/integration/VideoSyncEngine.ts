import { supabase } from '@/lib/supabase';
import type { RealtimeChannel } from '@supabase/supabase-js';
export interface VideoPlayerState {
  isPlaying: boolean;
  currentTime: number;
}


export class VideoSyncEngine {
  private projectId: string;
  private channel: RealtimeChannel | null = null;

  constructor(projectId: string) {
    this.projectId = projectId;
  }

  // تفعيل التزامن اللحظي لحالة مشغل الفيديو (Play/Pause/Seek)
  public enableSync(onSyncEvent: (payload: VideoPlayerState) => void) {
    this.channel = supabase
      .channel(`video_room:${this.projectId}`)
      .on('broadcast', { event: 'player_state' }, (payload) => {
        const state = payload.payload as VideoPlayerState;
        onSyncEvent(state);
      })
      .subscribe();
    return this.channel;
  }

  // بث حدث التغيير للطرف الآخر
  public broadcastState(state: VideoPlayerState) {
    if (this.channel) {
      this.channel.send({
        type: 'broadcast',
        event: 'player_state',
        payload: state
      });
    }
  }

  public cleanup() {
    if (this.channel) supabase.removeChannel(this.channel);
  }
}
