import jwt, { JwtPayload } from 'jsonwebtoken';
import { updateUserById } from '../models/user';

export const generateSendJWT = async (id: string) => {
  const jwtSecret = process.env.JWT_SECRET || '';
  const token = jwt.sign({ id }, jwtSecret, {
    expiresIn: '3d'
  });

  const refreshToken = jwt.sign({ id }, jwtSecret, {
    expiresIn: '30d'
  });

  await updateUserById(id, { refreshToken });

  return { token, refreshToken };
};

export const verifyJWT = (token: string) => {
  const jwtSecret = process.env.JWT_SECRET || '';
  return jwt.verify(token, jwtSecret) as JwtPayload;
};
