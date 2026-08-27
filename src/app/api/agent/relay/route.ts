import { timingSafeEqual } from 'node:crypto';
import { NextResponse } from 'next/server';

const taskQueue: Record<string, unknown>[] = [];
const taskResults: Record<string, unknown>[] = [];

function authorizeAgent(req: Request): NextResponse | null {
  const secret = process.env.MCOS_AGENT_SECRET;

  if (!secret) {
    return NextResponse.json(
      { error: 'Agent relay is not configured.' },
      { status: 503 }
    );
  }

  const authHeader = req.headers.get('authorization') ?? '';
  const expected = `Bearer ${secret}`;
  const suppliedBuffer = Buffer.from(authHeader);
  const expectedBuffer = Buffer.from(expected);

  if (
    suppliedBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(suppliedBuffer, expectedBuffer)
  ) {
    return NextResponse.json({ error: 'Unauthorized Node' }, { status: 401 });
  }

  return null;
}

export async function POST(req: Request) {
  const authorizationError = authorizeAgent(req);
  if (authorizationError) return authorizationError;

  try {
    const data = (await req.json()) as Record<string, unknown>;

    if (data.action === 'submit_result') {
      taskResults.push({
        taskId: data.taskId,
        result: data.result,
        timestamp: new Date(),
      });
      return NextResponse.json({ status: 'result_accepted' }, { status: 200 });
    }

    if (data.action === 'add_task') {
      const newTask = {
        id: `task_${Date.now()}`,
        command: data.command,
        payload: data.payload,
      };
      taskQueue.push(newTask);
      return NextResponse.json(
        { status: 'task_queued', taskId: newTask.id },
        { status: 200 }
      );
    }

    return NextResponse.json({ error: 'Invalid Action' }, { status: 400 });
  } catch {
    return NextResponse.json({ error: 'Relay Error' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const authorizationError = authorizeAgent(req);
  if (authorizationError) return authorizationError;

  const nextTask = taskQueue.length > 0 ? taskQueue.shift() : null;
  return NextResponse.json({ task: nextTask }, { status: 200 });
}
