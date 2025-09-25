import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret-key';

// Extend the Express Request type to include our user payload
interface AuthenticatedRequest extends Request {
  user?: { id: string; role: string };
}

export const protect = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization;

    if (!bearer || !bearer.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = bearer.split(' ')[1];

    try {
        const user = jwt.verify(token, JWT_SECRET) as { id: string; role: string };
        req.user = user;
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};
