import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import FormSubmission from '../../../models/FormSubmission';
import logger from '@/lib/logger';

// Get all form submissions
export async function GET() {
  try {
    await dbConnect();
    
    const submissions = await FormSubmission.find({})
      .sort({ createdAt: -1 }) // Sort by newest first
      .lean();
    
    return NextResponse.json({
      success: true,
      data: submissions
    });
  } catch (error) {
    logger.error('Error fetching form submissions:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch form submissions' },
      { status: 500 }
    );
  }
}

// Update form submission's resolved status
export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const data = await req.json();
    
    // Validate required fields
    if (!data.id) {
      return NextResponse.json(
        { success: false, message: 'Form ID is required' },
        { status: 400 }
      );
    }

    const submission = await FormSubmission.findById(data.id);
    
    if (!submission) {
      return NextResponse.json(
        { success: false, message: 'Form submission not found' },
        { status: 404 }
      );
    }
    
    // Update resolved status
    submission.resolved = !!data.resolved;
    await submission.save();
    
    logger.info(`Form submission status updated: ${data.id}, resolved: ${data.resolved}`);
    
    return NextResponse.json({
      success: true,
      message: 'Form submission updated successfully',
      data: submission
    });
  } catch (error) {
    logger.error('Error updating form submission:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update form submission' },
      { status: 500 }
    );
  }
} 