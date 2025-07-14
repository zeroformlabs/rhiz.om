import { NextResponse } from 'next/server';
import logger from '@rhiz.om/shared/utils/logger';

export async function POST(request: Request) {
  try {
    const logEntry = await request.json();
    const { level, msg, context, ...rest } = logEntry;

    // Use the server-side Winston logger to process the client log
    logger.log(level, msg, { ...rest, ...context });

    return NextResponse.json({ status: 'ok' });
  } catch (error: any) {
    logger.error(`Failed to process client log: ${error.message}`);
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}

export const runtime = 'nodejs';
