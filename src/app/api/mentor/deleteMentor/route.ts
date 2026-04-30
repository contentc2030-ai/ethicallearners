'use server';

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Mentor from '@/models/Mentor';
import logger from '@/lib/logger';



export async function DELETE(req:NextRequest) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
  
    if (!id) {
      logger.warn('Mentor ID is required for deletion');
      return NextResponse.json({ error: 'Mentor ID is required' }, { status: 400 });
    }
  
    try {
      const deletedMentor = await Mentor.findByIdAndDelete(id);
      if (!deletedMentor) {
        logger.warn(`Mentor with ID ${id} not found`);
        return NextResponse.json({ error: 'Mentor not found' }, { status: 404 });
      }
      logger.info(`Mentor with ID ${id} deleted successfully`);
      return NextResponse.json({ message: 'Mentor deleted successfully' });
    } catch (error) {
      logger.error(`Error deleting mentor: ${error.message}`);
      return NextResponse.json({ error: 'Failed to delete mentor' }, { status: 500 });
    }
  }