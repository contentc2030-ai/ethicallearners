'use server';

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import logger from '@/lib/logger';
import { withAuth } from '@/lib/withAuth';

// Fetch user data


const getUserHandler= async (req: NextRequest)=> {
    try {
        logger.info('GET /api/getUser - Request received');

        const userId = req.headers.get('x-user-id'); // Get the user ID set by middleware

        if (!userId) {
            logger.error('GET /api/getUser - User ID not found in request headers');
            return NextResponse.json(
                { message: 'User ID not found in request' },
                { status: 400 }
            );
        }

        logger.info(`GET /api/getUser - Fetching user data for ID: ${userId}`);

        await dbConnect();
        logger.info('GET /api/getUser - Connected to the database');

        // Fetch user data from the database
        const user = await User.findById(userId).select('-password'); // Exclude password

        if (!user) {
            logger.warn(`GET /api/getUser - User not found for ID: ${userId}`);
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        logger.info(`GET /api/getUser - User data retrieved successfully for ID: ${userId}`);
        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        logger.error(`GET /api/getUser - Error fetching user data: ${error.message}`);
        return NextResponse.json(
            { message: 'Error fetching user data', error: error.message },
            { status: 500 }
        );
    }
}
export const GET = withAuth(getUserHandler, true); 





