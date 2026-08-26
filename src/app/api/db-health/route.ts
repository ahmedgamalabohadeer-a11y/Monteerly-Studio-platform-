import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { withAuthGuard } from '@/lib/security/apiGuard';

export async function GET(req: Request) {
  return withAuthGuard(
    req,
    async () => {
      try {
        const supabase = await createClient();
        const { error } = await supabase
          .from('employees')
          .select('id', { count: 'exact', head: true });

        if (error) {
          throw error;
        }

        return NextResponse.json(
          {
            status: '✅ Connected Successfully',
            database: 'Supabase PostgreSQL',
            environment: process.env.NODE_ENV,
          },
          { status: 200 }
        );
      } catch (error) {
        console.error('Database health check failed:', error);
        return NextResponse.json(
          {
            status: '❌ Connection Failed',
            message: 'تعذر التحقق من قاعدة البيانات.',
          },
          { status: 500 }
        );
      }
    },
    ['admin', 'executive']
  );
}
