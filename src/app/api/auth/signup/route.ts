'use server';

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import logger from '@/lib/logger';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Handle POST requests for signup
export async function POST(req: NextRequest) {
    try {
        // Parse the request body
        const { name, phone, email, password } = await req.json();

        // Validate required fields
        if (!name || !phone || !email || !password) {
            logger.error('Missing required fields during sign-up attempt');
            return NextResponse.json({ message: 'Name, phone, email, and password are required' }, { status: 400 });
        }

        await dbConnect();

        // Check if the user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            logger.warn(`Sign-up attempt with existing email: ${email}`);
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            name,
            phone,
            email,
            password: hashedPassword,
        });

        // Save the new user to the database
        await newUser.save();
        logger.info(`User created successfully: ${email}`);

        // Generate JWT token
        const token = jwt.sign(
            { id: newUser._id, email: newUser.email, name: newUser.name, phone: newUser.phone },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Set token in HTTP-only cookie
        const response = NextResponse.json({ message: 'User created successfully' }, { status: 201 });
        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60, // 7 days
            path: '/', // Ensure the cookie is available site-wide
        });

        return response;
    } catch (error) {
        logger.error(`Error creating user: ${error.message}`);
        return NextResponse.json({ message: 'Error creating user' }, { status: 500 });
    }
}
