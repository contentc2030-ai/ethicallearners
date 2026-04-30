'use server';

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Course from '@/models/Course';                                              
import logger from '@/lib/logger';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        logger.info('GET /api/getCourses - Request received');
        await dbConnect();
        logger.info('GET /api/getCourses - Connected to the database');

        const courses = [await Course.findById(id).select('-__v').lean()];
        
        const formattedCourses = courses?.map((course:any) => ({
            ...course,
            id: course._id,
            _id: undefined,
            highlights: course.highlights || [],
            about: {
                heading: course.about?.heading || '',
                description: course.about?.description || '',
                points: course.about?.points || [],
                image: course.about?.image || ''
            },
            tools: course.tools || [],
            modules: course.modules || [],
            reviews: course.reviews || [],
            mentors: course.mentors || [],
            frequentQuestions: course.frequentQuestions || []
        }));

        return NextResponse.json({ courses: formattedCourses }, { status: 200 });
    } catch (error) {
        logger.error(`GET /api/getCourses - Error fetching courses: ${error.message}`);
        return NextResponse.json(
            { message: 'Error fetching courses', error: error.message },
            { status: 500 }
        );
    }
};
