import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/User';  // Import IUser from your models
import { config } from '../config';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];  // Extract token from Authorization header
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    // Verify token and decode the payload
    const decoded = jwt.verify(token, config.TOKEN_SECRET_KEY ) as jwt.JwtPayload & IUser;

    // Now, `decoded` is typed as `JwtPayload` and `IUser` so we can safely assign it to `req.user`
    req.user = decoded;
    next();  // Proceed to the next middleware or controller
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;
