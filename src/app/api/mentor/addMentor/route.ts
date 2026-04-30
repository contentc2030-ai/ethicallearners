'use server';

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Mentor from '@/models/Mentor';
import logger from '@/lib/logger';

export async function POST(req:NextRequest) {
    await dbConnect();
    try {
      const body = await req.json();
      logger.info(`POST /api/addMentor - Request received with payload: ${JSON.stringify(body)}`);
  
      const { name, email, phone, password, image, experience, skills, speciality, about, address, cv, socialMedias } = body;
  
      if (!name || !email || !phone || !password || !speciality || !about || !address || !cv || !skills || !experience) {
        logger.error('POST /api/addMentor - Missing required fields');
        return NextResponse.json(
          { message: 'All required fields must be provided' },
          { status: 400 }
        );
      }
  
      const newMentor = new Mentor(body);
      await newMentor.save();
      logger.info(`POST /api/addMentor - Mentor added successfully: ${JSON.stringify(newMentor)}`);
      return NextResponse.json(newMentor, { status: 201 });
    } catch (error) {
      logger.error(`POST /api/addMentor - Error adding mentor: ${error.message}`);
      return NextResponse.json(
        { message: 'Error adding mentor', error: error.message },
        { status: 500 }
      );
    }
  }