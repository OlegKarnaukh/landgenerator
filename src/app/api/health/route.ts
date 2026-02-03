import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    checks: {
      database: 'skipped',
      memory: 'unknown',
      openai: process.env.OPENAI_API_KEY ? 'configured' : 'missing',
    },
  };

  // Check database connection only if DATABASE_URL is set
  if (process.env.DATABASE_URL) {
    try {
      const { db } = await import('@/lib/db');
      await db.$queryRaw`SELECT 1`;
      health.checks.database = 'ok';
    } catch (error) {
      health.checks.database = 'error';
      health.status = 'degraded';
    }
  }

  // Check memory usage
  const memUsage = process.memoryUsage();
  const memUsedMB = Math.round(memUsage.heapUsed / 1024 / 1024);
  const memTotalMB = Math.round(memUsage.heapTotal / 1024 / 1024);

  if (memUsedMB / memTotalMB > 0.9) {
    health.checks.memory = 'warning';
  } else {
    health.checks.memory = 'ok';
  }

  // OpenAI key is critical
  if (!process.env.OPENAI_API_KEY) {
    health.status = 'degraded';
  }

  const statusCode = health.status === 'ok' ? 200 : 503;

  return NextResponse.json(health, { status: statusCode });
}
