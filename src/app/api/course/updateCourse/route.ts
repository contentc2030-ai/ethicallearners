'use server';

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Course from '@/models/Course';
import logger from '@/lib/logger';

export async function PUT(req: NextRequest) {
    try {
        const payload = await req.json();
        logger.info(`PUT /api/updateCourse - Request received with payload: ${JSON.stringify(payload)}`);

        const { id, image, name, description, price, instock, rating, duration, tags, level, lessons, students, certifications, highlights, about, tools, modules, reviews, isPopular, mentors, frequentQuestions } = payload;

        if (!id) {
            logger.error('PUT /api/updateCourse - Course ID is required');
            return NextResponse.json(
                { message: 'Course ID is required' },
                { status: 400 }
            );
        }

        await dbConnect();
        logger.info('PUT /api/updateCourse - Connected to the database');

        const updatedCourse = await Course.findByIdAndUpdate(
            id,
            { image, name, description, price, instock, rating, duration, tags, level, lessons, students, certifications, highlights, about, tools, modules, reviews, isPopular, mentors, frequentQuestions },
            { new: true }
        );

        if (!updatedCourse) {
            logger.error('PUT /api/updateCourse - Course not found');
            return NextResponse.json(
                { message: 'Course not found' },
                { status: 404 }
            );
        }

        logger.info(`PUT /api/updateCourse - Course updated successfully: ${JSON.stringify(updatedCourse)}`);
        return NextResponse.json({ message: 'Course updated successfully', course: updatedCourse }, { status: 200 });
    } catch (error) {
        logger.error(`PUT /api/updateCourse - Error updating course: ${error.message}`);
        return NextResponse.json(
            { message: 'Error updating course', error: error.message },
            { status: 500 }
        );
    }
};