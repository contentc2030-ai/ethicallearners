'use server'

import { NextRequest, NextResponse } from 'next/server';
import Subscriber from '@/models/Subscriber';
import logger from '@/lib/logger';
import dbConnect from '@/lib/dbConnect';

export async function POST(req: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();
    
    // Parse request body
    const { email } = await req.json();
    
    // Validate email format
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      logger.warn(`Invalid email format attempted: ${email}`);
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    // Check if email already exists
    const existingSubscriber = await Subscriber.findOne({ email });
    
    if (existingSubscriber) {
      logger.info(`Subscription attempt with existing email: ${email}`);
      return NextResponse.json(
        { message: 'Email already subscribed', exists: true },
        { status: 200 }
      );
    }
    
    // Create new subscriber
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();
    
    logger.info(`New subscription: ${email}`);
    return NextResponse.json(
      { message: 'Subscription successful', exists: false },
      { status: 201 }
    );
    
  } catch (error) {
    logger.error(`Subscription error: ${error instanceof Error ? error.message : String(error)}`);
    return NextResponse.json(
      { error: 'Failed to process subscription' },
      { status: 500 }
    );
  }
} 