import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/verifyJWT';
import logger from '@/lib/logger';

export function withAuth(handler: (req: NextRequest) => Promise<NextResponse>, isProtected = false): (req: NextRequest) => Promise<NextResponse> {
    return async (req: NextRequest): Promise<NextResponse> => {
        try {
            if (isProtected) {
                const token = req.cookies.get('token')?.value;

                if (!token) {
                    logger.warn('Authentication failed: No token provided');
                    return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
                }

                const decoded = verifyToken(token);

                // Attach user info to request headers for downstream use
                req.headers.set('x-user-id', decoded.id);
                req.headers.set('x-user-email', decoded.email);
            }

            return await handler(req);
        } catch (error) {
            logger.error(`Error in protected route: ${error.message}`);
            return NextResponse.json({ message: error.message }, { status: 403 });
        }
    };
}