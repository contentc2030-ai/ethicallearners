import { NextResponse } from 'next/server';
import logger from '@/lib/logger';

export async function GET(req: Request) {
  return handleRequest(req);
}

export async function POST(req: Request) {
  return handleRequest(req);
}

export async function DELETE(req: Request) {
  return handleRequest(req);
}
export async function PUT(req: Request) {
  return handleRequest(req);
}

async function handleRequest(req: Request) {
  const url = new URL(req.url);
  logger.info(`Unhandled API call: ${url.pathname} [${req.method}]`);

  return NextResponse.json({ message: 'API route not found', path: url.pathname }, { status: 404 });
}
