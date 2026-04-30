import { supabase } from './supabase';

export async function notifyUser(userId: string, title: string, message: string) {
  await supabase.from('notifications').insert({ user_id: userId, title, message, is_read: false });
}
