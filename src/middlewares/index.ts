import { RequestHandler } from 'express';

import { getUserById } from '../modules/user';
import { verifyJWT } from '../helpers';
import AppError from '../helpers/appError';
import errorState from '../helpers/errorState';

export const isAuthenticated: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return next(new AppError(errorState.USER_NOT_LOGIN));
    }

    const decoded = verifyJWT(token);
    if (!decoded || !decoded.id) {
      return next(new AppError(errorState.DATA_NOT_EXIST));
    }

    const existingUser = await getUserById(decoded.id).select('+_id+email+name');
    if (!existingUser) {
      return next(new AppError(errorState.USER_NOT_EXIST));
    }

    req.user = {
      id: existingUser._id.toString(),
      email: existingUser.email,
      name: existingUser.name
    };
    next();
  } catch (error) {}
};
