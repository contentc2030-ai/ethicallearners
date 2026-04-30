import { NextRequest, NextResponse } from 'next/server';
import logger from '@/lib/logger';
import dbConnect from '@/lib/dbConnect';
import FormSubmission from '../../models/FormSubmission';
import { json } from 'stream/consumers';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const data = await req.json();
    
    // Validate that formName is present
    if (!data.formName) {
      return NextResponse.json(
        { success: false, message: 'Form name is required' },
        { status: 400 }
      );
    }

    // Create a new form submission entry
    const submission = new FormSubmission({
      formName: data.formName,
      formData: data
    });

    await submission.save();

    logger.info(`Form submission received: ${data.formName}`);
    logger.info(`Form submission received: ${JSON.stringify(data)}`);
    
    return NextResponse.json(
      { success: true, message: 'Form submitted successfully' },
      { status: 201 }
    );
  } catch (error) {
    logger.error('Error submitting form:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit form' },
      { status: 500 }
    );
  }
} 