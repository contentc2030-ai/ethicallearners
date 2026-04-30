

'use server';

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Course from '@/models/Course';
import logger from '@/lib/logger';


export async function DELETE(req: NextRequest) {
    try {
        const payload = await req.json();
        logger.info(`DELETE /api/deleteCourse - Request received with payload: ${JSON.stringify(payload)}`);

        const { id } = payload;

        if (!id) {
            logger.error('DELETE /api/deleteCourse - Course ID is required');
            return NextResponse.json(
                { message: 'Course ID is required' },
                { status: 400 }
            );
        }

        await dbConnect();
        logger.info('DELETE /api/deleteCourse - Connected to the database');

        const deletedCourse = await Course.findByIdAndDelete(id);

        if (!deletedCourse) {
            logger.error('DELETE /api/deleteCourse - Course not found');
            return NextResponse.json(
                { message: 'Course not found' },
                { status: 404 }
            );
        }

        logger.info(`DELETE /api/deleteCourse - Course deleted successfully: ${JSON.stringify(deletedCourse)}`);
        return NextResponse.json({ message: 'Course deleted successfully' }, { status: 200 });
    } catch (error) {
        logger.error(`DELETE /api/deleteCourse - Error deleting course: ${error.message}`);
        return NextResponse.json(
            { message: 'Error deleting course', error: error.message },
            { status: 500 }
        );
    }
};