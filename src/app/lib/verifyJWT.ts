import jwt from 'jsonwebtoken';
import logger from '@/lib/logger';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function verifyToken(token: string) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string };
        logger.info(`JWT verified successfully for user ID: ${decoded.id}`);
        return decoded;
    } catch (error) {
        logger.error(`JWT verification failed: ${error.message}`);
        throw new Error('Invalid or expired token');
    }
}
