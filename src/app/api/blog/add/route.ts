'use server';

import { NextRequest, NextResponse } from 'next/server';

import Blog from '@/models/Blog';
import logger from '@/lib/logger';
import dbConnect from '@/lib/dbConnect';
export async function POST(req:NextRequest) {
    try {
      const body = await req.json();
      logger.info(`POST /api/blog/add - Request received with payload: ${JSON.stringify(body)}`);
      await dbConnect();
      const { title, description, content, posterImage, backgroundImage, author, date, tags } = body;
  
      if (!title || !description || !content || !posterImage || !backgroundImage || !author || !date || !tags) {
        logger.error('POST /api/blog/add - Missing required fields');
        return NextResponse.json(
          { message: 'All required fields must be provided' },
          { status: 400 }
        );
      }
  
      const newBlog = new Blog(body);
      await newBlog.save();
      logger.info(`POST /api/blog/add - Blog added successfully: ${JSON.stringify(newBlog)}`);
      return NextResponse.json(newBlog, { status: 201 });
    } catch (error) {
      logger.error(`POST /api/blog/add - Error adding blog: ${error.message}`);
      return NextResponse.json(
        { message: 'Error adding blog', error: error.message },
        { status: 500 }
      );
    }
  }