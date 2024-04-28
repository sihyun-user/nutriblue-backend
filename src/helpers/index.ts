import { Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const generateSendJWT = (res: Response, userId: string) => {
  const jwtSecret = process.env.JWT_SECRET || '';
  const token = jwt.sign({ userId }, jwtSecret, {
    expiresIn: '3d'
  });

  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 3 * 24 * 60 * 60 * 1000
  });
};

export const verifyJWT = (token: string) => {
  const jwtSecret = process.env.JWT_SECRET || '';
  return jwt.verify(token, jwtSecret) as JwtPayload;
};

export const clearToken = (res: Response) => {
  res.cookie('token', '', {
    httpOnly: true,
    maxAge: 0
  });
};
