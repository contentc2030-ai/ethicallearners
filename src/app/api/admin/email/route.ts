'use server'

import { NextRequest, NextResponse } from 'next/server';
import Subscriber from '@/models/Subscriber';
import logger from '@/lib/logger';
import dbConnect from '@/lib/dbConnect';
import nodemailer from 'nodemailer';

// Configure nodemailer with appropriate transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ADMIN_EMAIL || 'your-email@gmail.com',
    pass: process.env.ADMIN_EMAIL_PASSWORD || 'your-app-password',
  },
});

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    
    const { subscriberIds, subject, message, senderName } = await req.json();
    
    // Validate input
    if (!subject || !message || !Array.isArray(subscriberIds)) {
      logger.warn('Invalid email request parameters');
      return NextResponse.json(
        { error: 'Invalid request parameters' },
        { status: 400 }
      );
    }
    
    // Get subscriber emails from IDs
    let subscribers;
    
    if (subscriberIds.length === 0) {
      // If no specific subscribers selected, send to all
      subscribers = await Subscriber.find({});
    } else {
      subscribers = await Subscriber.find({ _id: { $in: subscriberIds } });
    }
    
    if (!subscribers || subscribers.length === 0) {
      logger.warn('No subscribers found for the selected IDs');
      return NextResponse.json(
        { error: 'No subscribers found for the selected IDs' },
        { status: 404 }
      );
    }
    
    // Send emails to all subscribers
    const emails = subscribers.map(sub => sub.email);
    
    // Create email options
    const mailOptions = {
      from: `"${senderName || 'Ethical Learner'}" <${process.env.EMAIL_USER || 'your-email@gmail.com'}>`,
      bcc: emails, // Use BCC to hide recipient emails from each other
      subject: subject,
      html: message,
    };
    
    // Send the email
    await transporter.sendMail(mailOptions);
    
    logger.info(`Email sent to ${emails.length} subscribers with subject: ${subject}`);
    
    return NextResponse.json(
      { success: true, count: emails.length },
      { status: 200 }
    );
    
  } catch (error) {
    logger.error(`Failed to send email: ${error instanceof Error ? error.message : String(error)}`);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 