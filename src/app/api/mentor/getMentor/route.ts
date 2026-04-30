'use server';

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Mentor from '@/models/Mentor';
import logger from '@/lib/logger';

export async function GET(req:NextRequest) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
  
    if (!id) {
      logger.warn('Mentor ID is missing in the request');
      return NextResponse.json({ error: 'Mentor ID is required' }, { status: 400 });
    }
  
    try {
      const mentor = await Mentor.findById(id);
      if (!mentor) {
        logger.warn(`Mentor with ID ${id} not found`);
        return NextResponse.json({ error: 'Mentor not found' }, { status: 404 });
      }
      logger.info(`Fetched mentor with ID ${id}`);
      return NextResponse.json(mentor);
    } catch (error) {
      logger.error(`Error fetching mentor: ${error.message}`);
      return NextResponse.json({ error: 'Failed to fetch mentor' }, { status: 500 });
    }
  }