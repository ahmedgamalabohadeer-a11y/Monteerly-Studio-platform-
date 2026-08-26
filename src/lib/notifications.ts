import 'server-only';

import { createClient } from '@/lib/supabase/server';

export async function notifyUser(userId: string, title: string, message: string) {
  const supabase = await createClient();
  await supabase.from('notifications').insert({ user_id: userId, title, message, is_read: false });
}
