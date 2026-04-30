'use server';

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Blog from '@/models/Blog';
import logger from '@/lib/logger';

export async function PUT(req:NextRequest) {
    await dbConnect();
    try {
      const body = await req.json();
      const { id, ...updateData } = body;
  
      if (!id) {
        logger.warn('PUT /api/blog/update - Blog ID is required for updating');
        return NextResponse.json({ error: 'Blog ID is required' }, { status: 400 });
      }
  
      const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedBlog) {
        logger.warn(`PUT /api/blog/update - Blog with ID ${id} not found`);
        return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
      }
      logger.info(`PUT /api/blog/update - Blog with ID ${id} updated successfully`);
      return NextResponse.json(updatedBlog);
    } catch (error) {
      logger.error(`PUT /api/blog/update - Error updating blog: ${error.message}`);
      return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
    }
  }