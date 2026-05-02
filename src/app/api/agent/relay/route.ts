import { NextResponse } from 'next/server';

// مفتاح التشفير السيادي لمنع أي اتصال خارجي غير مصرح به
const AGENT_SECRET_KEY = process.env.MCOS_AGENT_SECRET || 'mcos_super_secret_agent_key_v5';

// طابور مهام مؤقت في الذاكرة (للمحاكاة السريعة، سيتم نقله لـ Supabase للإنتاج)
let taskQueue: any[] = [];
let taskResults: any[] = [];

// [Termux -> Vercel] جلب المهام أو تسليم النتائج
export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${AGENT_SECRET_KEY}`) {
      return NextResponse.json({ error: 'Unauthorized Node' }, { status: 401 });
    }

    const data = await req.json();

    // إذا كان Termux يسلم نتيجة مهمة
    if (data.action === 'submit_result') {
      taskResults.push({ taskId: data.taskId, result: data.result, timestamp: new Date() });
      return NextResponse.json({ status: 'result_accepted' }, { status: 200 });
    }

    // إذا كان Vercel (واجهة الموقع) يطلب إضافة مهمة جديدة للطابور
    if (data.action === 'add_task') {
      const newTask = { id: `task_${Date.now()}`, command: data.command, payload: data.payload };
      taskQueue.push(newTask);
      return NextResponse.json({ status: 'task_queued', taskId: newTask.id }, { status: 200 });
    }

    return NextResponse.json({ error: 'Invalid Action' }, { status: 400 });

  } catch (error) {
    return NextResponse.json({ error: 'Relay Error' }, { status: 500 });
  }
}

// [Termux -> Vercel] قراءة المهام المعلقة
export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${AGENT_SECRET_KEY}`) {
    return NextResponse.json({ error: 'Unauthorized Node' }, { status: 401 });
  }

  // سحب أول مهمة من الطابور
  const nextTask = taskQueue.length > 0 ? taskQueue.shift() : null;
  
  return NextResponse.json({ task: nextTask }, { status: 200 });
}
