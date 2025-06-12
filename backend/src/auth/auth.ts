// src/middleware/authenticateToken.ts

import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Define user data interface (based on what your JWT contains)
interface DecodedUser extends JwtPayload {
  id: number;
  name: string;
  email: string;
}

// Extend the Express Request interface
declare module 'express-serve-static-core' {
  interface Request {
    user?: DecodedUser;
  }
}

// Create a 256-bit key for AES encryption
const secretKey = crypto
  .createHash('sha256')
  .update(String('your-secret-key'))
  .digest('base64')
  .substr(0, 32);

// Middleware to authenticate token
const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  console.log("Authenticating token...", req.headers);

  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: "Access denied. No token provided." });
    return;
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err || typeof decoded !== 'object') {
      return res.status(403).json({ message: "Invalid or expired token." });
    }

    req.user = decoded as DecodedUser; // Attach decoded user to req
    next();
  });
};

export { authenticateToken };
