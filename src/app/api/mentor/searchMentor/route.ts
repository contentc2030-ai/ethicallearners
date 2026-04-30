'use server';

import {  NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Mentor from '@/models/Mentor';
import logger from '@/lib/logger';

export async function GET(req:NextRequest) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');
  
    if (!query) {
      logger.warn('Search query is required');
      return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
    }
  
    try {
      const mentors = await Mentor.find(
        {
          $or: [
            { name: { $regex: query, $options: 'i' } },
            { email: { $regex: query, $options: 'i' } }
          ]
        },
        { name: 1, email: 1, _id: 1 }
      );
      logger.info(`Found ${mentors.length} mentors for query: ${query}`);
      return NextResponse.json(mentors);
    } catch (error) {
      logger.error(`Error searching mentors: ${error.message}`);
      return NextResponse.json({ error: 'Failed to search mentors' }, { status: 500 });
    }
  }