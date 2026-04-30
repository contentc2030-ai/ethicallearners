'use server';

import {  NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Mentor from '@/models/Mentor';
import logger from '@/lib/logger';


export async function GET() {
    await dbConnect();
    try {
      const mentors = await Mentor.find();
      logger.info('Fetched all mentors');
      return NextResponse.json(mentors);
    } catch (error) {
      logger.error(`Error fetching mentors: ${error.message}`);
      return NextResponse.json({ error: 'Failed to fetch mentors' }, { status: 500 });
    }
  }