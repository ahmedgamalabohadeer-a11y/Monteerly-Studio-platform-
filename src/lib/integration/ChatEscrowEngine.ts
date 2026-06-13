import { supabase } from '@/lib/supabase';

// نظام دمج يضيف التزامن اللحظي للدردشة ويربطها بالاستشارات المدفوعة
export class ChatEscrowEngine {
  private roomId: string;
  private channel: unknown;

  constructor(roomId: string) {
    this.roomId = roomId;
  }

  // إضافة: تفعيل التزامن اللحظي دون المساس بواجهة المستخدم
  public enableRealtime(onMessageReceived: (payload: unknown) => void) {
    this.channel = supabase
      .channel(`room:${this.roomId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `room_id=eq.${this.roomId}` },
        (payload) => onMessageReceived(payload.new)
      )
      .subscribe();
    return this.channel;
  }

  // إضافة: ربط الاستشارة المدفوعة بفتح قناة الدردشة
  public async verifyAndUnlockConsultation(consultationId: string, clientId: string) {
    // 1. التحقق من حالة الدفع في محرك الضمان (Escrow)
    const { data: transaction, error: txError } = await supabase
      .from('transactions')
      .select('status')
      .eq('reference_id', consultationId)
      .eq('client_id', clientId)
      .single();

    if (txError || transaction?.status !== 'locked') {
      throw new Error("الرصيد غير مؤمن في حساب الضمان. يرجى إتمام الدفع أولاً.");
    }

    // 2. توثيق الحدث (Audit)
    await supabase.from('audit_logs').insert({
      action: 'CONSULTATION_UNLOCKED',
      user_id: clientId,
      details: { roomId: this.roomId, consultationId }
    });

    return true; // تفعيل الميزة في الواجهة
  }

  // تنظيف الاتصال لتجنب تسريب الذاكرة
  public cleanup() {
    if (this.channel) supabase.removeChannel(this.channel);
  }
}
