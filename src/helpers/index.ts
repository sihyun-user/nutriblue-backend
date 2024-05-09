import { Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const generateSendJWT = (res: Response, id: string) => {
  const jwtSecret = process.env.JWT_SECRET || '';
  const token = jwt.sign({ id }, jwtSecret, {
    expiresIn: '3d'
  });

  return token;
};

export const verifyJWT = (token: string) => {
  const jwtSecret = process.env.JWT_SECRET || '';
  return jwt.verify(token, jwtSecret) as JwtPayload;
};
