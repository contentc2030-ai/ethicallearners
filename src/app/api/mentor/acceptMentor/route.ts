import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import logger from '@/lib/logger';


export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const status = searchParams.get('status');

    if (!email || !status) {
      logger.error(`Invalid mentor approval request: missing email or status`);
      return NextResponse.json({ error: 'Email and status are required' }, { status: 400 });
    }

    logger.info(`Processing mentor approval request for ${email} - Status: ${status}`);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'somnath553.in@gmail.com',
        pass: 'dboxcppygdqgjcpe',
      },
    });

    let mailOptions;

    if (status === 'accepted') {
      mailOptions = {
        from: 'somnath553.in@gmail.com',
        to: email,
        subject: 'Mentor Registration Approved',
        html: `
          <div style="background-color:#0c1524; color:#ffffff; padding:20px; border-radius:8px;">
            <h2 style="color:#38bdf8;">Congratulations!</h2>
            <p>Your mentor registration has been <strong style="color:#38bdf8;">approved</strong>.</p>
            <p>Please complete your profile by filling out the registration form:</p>
            <a href="https://ethical-learner.vercel.app/pages/mentor/register?email=${email}" 
               style="display:inline-block; background-color:#38bdf8; color:white; padding:10px 20px; text-decoration:none; border-radius:5px;">Complete Registration</a>
          </div>
        `,
      };
      logger.info(`Mentor ${email} has been approved and sent registration form link.`);
    } else {
      mailOptions = {
        from: 'somnath553.in@gmail.com',
        to: email,
        subject: 'Mentor Registration Rejected',
        html: `
          <div style="background-color:#0c1524; color:#ffffff; padding:20px; border-radius:8px;">
            <h2 style="color:#ff4c4c;">Mentor Registration Rejected</h2>
            <p>We appreciate your interest in becoming a mentor, but unfortunately, your request has been <strong style="color:#ff4c4c;">rejected</strong>.</p>
            <p>You can try again in the future.</p>
          </div>
        `,
      };
      logger.info(`Mentor ${email} has been rejected.`);
    }

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: `Mentor request ${status}` }, { status: 200 });
  } catch (error) {
    logger.error(`Error in mentor approval process: ${error}`);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
