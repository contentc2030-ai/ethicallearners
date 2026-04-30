'use server';

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Blog from '@/models/Blog';
import logger from '@/lib/logger';

export async function GET(req:NextRequest) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
  
    if (!id) {
      logger.warn('GET /api/blog/getById - Blog ID is missing in the request');
      return NextResponse.json({ error: 'Blog ID is required' }, { status: 400 });
    }
  
    try {
      const blog = await Blog.findById(id);
      if (!blog) {
        logger.warn(`GET /api/blog/getById - Blog with ID ${id} not found`);
        return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
      }
      logger.info(`GET /api/blog/getById - Fetched blog with ID ${id}`);
      return NextResponse.json(blog);
    } catch (error) {
      logger.error(`GET /api/blog/getById - Error fetching blog: ${error.message}`);
      return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
    }
  }