'use server';

import {NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Blog from '@/models/Blog';
import logger from '@/lib/logger';

export async function GET() {
    await dbConnect();
    try {
      const blogs = await Blog.find();
      logger.info('GET /api/blog/getAll - Fetched all blogs');
      return NextResponse.json(blogs);
    } catch (error) {
      logger.error(`GET /api/blog/getAll - Error fetching blogs: ${error.message}`);
      return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
    }
  }