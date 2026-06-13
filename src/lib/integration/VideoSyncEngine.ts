import { supabase } from '@/lib/supabase';

export class VideoSyncEngine {
  private projectId: string;
  private channel: unknown;

  constructor(projectId: string) {
    this.projectId = projectId;
  }

  // تفعيل التزامن اللحظي لحالة مشغل الفيديو (Play/Pause/Seek)
  public enableSync(onSyncEvent: (payload: unknown) => void) {
    this.channel = supabase
      .channel(`video_room:${this.projectId}`)
      .on('broadcast', { event: 'player_state' }, (payload) => onSyncEvent(payload.payload))
      .subscribe();
    return this.channel;
  }

  // بث حدث التغيير للطرف الآخر
  public broadcastState(state: { isPlaying: boolean, currentTime: number }) {
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
