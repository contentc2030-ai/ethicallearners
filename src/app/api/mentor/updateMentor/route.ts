'use server';

import {  NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Mentor from '@/models/Mentor';
import logger from '@/lib/logger';



export async function PUT(req:NextRequest) {
    await dbConnect();
    try {
      const body = await req.json();
      const { id, ...updateData } = body;
      if (!id) {
        logger.warn('Mentor ID is required for updating');
        return NextResponse.json({ error: 'Mentor ID is required' }, { status: 400 });
      }
      const updatedMentor = await Mentor.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedMentor) {
        logger.warn(`Mentor with ID ${id} not found`);
        return NextResponse.json({ error: 'Mentor not found' }, { status: 404 });
      }
      logger.info(`Mentor with ID ${id} updated successfully`);
      return NextResponse.json(updatedMentor);
    } catch (error) {
      logger.error(`Error updating mentor: ${error.message}`);
      return NextResponse.json({ error: 'Failed to update mentor' }, { status: 500 });
    }
  }