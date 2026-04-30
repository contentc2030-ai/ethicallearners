import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import logger from '@/lib/logger';
import { registerMentor } from '@/template/mentorTemplate';
export async function POST(req: Request) {
  try {
    const { name, email, phoneNumber } = await req.json();

    if (!name || !email || !phoneNumber) {
      logger.error(`Missing fields in mentor registration request`);
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    logger.info(`Received mentor registration request from ${email}`);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'somnath553.in@gmail.com',
        pass: 'dboxcppygdqgjcpe',
      },
    });

    const mailOptions = {
      from: 'somnath553.in@gmail.com',
      to: 'somnath553.in@gmail.com',
      subject: 'New Mentor Registration Request',
      html: registerMentor(name, email, phoneNumber),
    };

    await transporter.sendMail(mailOptions);
    logger.info(`Mentor request email sent to admin for ${email}`);

    return NextResponse.json({ message: 'Registration request sent to admin' }, { status: 200 });
  } catch (error) {
    logger.error(`Error in mentor registration: ${error}`);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
