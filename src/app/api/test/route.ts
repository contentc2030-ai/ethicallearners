import { NextRequest, NextResponse } from 'next/server';
import logger from '@/lib/logger';
import dbConnect from '@/lib/dbConnect';

export async function GET(req: NextRequest) {
  // Log for debugging
  logger.info('GET request received on /api/test');
  console.log('start')
  await dbConnect();
        logger.info('GET /api/getCourses - Connected to the database');
        console.log('end')
  // Return a response using NextResponse
  return NextResponse.json({
    status:'alive'
  });
}


