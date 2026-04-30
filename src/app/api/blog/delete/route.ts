'use server';

import { NextRequest, NextResponse } from 'next/server';
import Blog from '@/models/Blog';
import logger from '@/lib/logger';
import dbConnect from '@/lib/dbConnect';


export async function DELETE(req:NextRequest) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
  
    if (!id) {
      logger.warn('DELETE /api/blog/delete - Blog ID is required for deletion');
      return NextResponse.json({ error: 'Blog ID is required' }, { status: 400 });
    }
  
    try {
      const deletedBlog = await Blog.findByIdAndDelete(id);
      if (!deletedBlog) {
        logger.warn(`DELETE /api/blog/delete - Blog with ID ${id} not found`);
        return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
      }
      logger.info(`DELETE /api/blog/delete - Blog with ID ${id} deleted successfully`);
      return NextResponse.json({ message: 'Blog deleted successfully' });
    } catch (error) {
      logger.error(`DELETE /api/blog/delete - Error deleting blog: ${error.message}`);
      return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
    }
  }
  