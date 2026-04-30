'use server';

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Course from '@/models/Course';
import logger from '@/lib/logger';



export async function POST(req: NextRequest) {
    try {
        const payload = await req.json();

        logger.info(`POST /api/addCourse - Request received with payload: ${JSON.stringify(payload)}`);

        const { image, name, description, price, instock, rating, duration, tags, level, lessons, students, certifications, highlights, about, tools, modules, reviews, isPopular, mentors, frequentQuestions } = payload;

        if (!image || !name || !description || !price || instock === undefined || !rating || !duration || !tags || !tools || !modules) {
            logger.error('POST /api/addCourse - Missing required fields');
            return NextResponse.json(
                { message: 'All required fields must be provided' },
                { status: 400 }
            );
        }

        await dbConnect();
        logger.info('POST /api/addCourse - Connected to the database');

        const newCourse = new Course({
            image, name, description, price, instock, rating, duration, tags, level, lessons, students, certifications, highlights, about, tools, modules, reviews, isPopular, mentors, frequentQuestions
        });
        await newCourse.save();

        logger.info(`POST /api/addCourse - Course added successfully: ${JSON.stringify(newCourse)}`);
        return NextResponse.json({ message: 'Course added successfully', course: newCourse }, { status: 201 });
    } catch (error) {
        logger.error(`POST /api/addCourse - Error adding course: ${error.message}`);
        return NextResponse.json(
            { message: 'Error adding course', error: error.message },
            { status: 500 }
        );
    }
};

