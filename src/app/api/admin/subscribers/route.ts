'use server'

import { NextRequest, NextResponse } from 'next/server';
import Subscriber from '@/models/Subscriber';
import logger from '@/lib/logger';
import dbConnect from '@/lib/dbConnect';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    // Parse query parameters for pagination
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = (page - 1) * limit;
    
    // Get total count for pagination
    const total = await Subscriber.countDocuments({});
    
    // Get paginated subscribers
    const subscribers = await Subscriber.find({})
      .sort({ subscribedAt: -1 }) // Most recent first
      .skip(skip)
      .limit(limit);
    
    logger.info(`Retrieved ${subscribers.length} subscribers from the database`);
    
    return NextResponse.json({
      subscribers,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    logger.error(`Failed to fetch subscribers: ${error instanceof Error ? error.message : String(error)}`);
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
} 