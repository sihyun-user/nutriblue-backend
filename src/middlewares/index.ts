import { RequestHandler } from 'express';

import { getUserById } from '../modules/users';
import { verifyJWT } from '../helpers';
import AppError from '../helpers/appError';
import errorState from '../helpers/errorState';

export const isOwner: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const currectUserId = req.user?.userId;

    if (!currectUserId) {
      return next(new AppError(errorState.USER_NOT_EXIST));
    }

    if (currectUserId !== id) {
      return next(new AppError(errorState.USER_NOT_MATCH));
    }

    next();
  } catch (error) {}
};

export const isAuthenticated: RequestHandler = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return next(new AppError(errorState.USER_NOT_LOGIN));
    }

    const decoded = verifyJWT(token);
    if (!decoded || !decoded.userId) {
      return next(new AppError(errorState.DATA_NOT_EXIST));
    }

    const existingUser = await getUserById(decoded.userId).select('+_id+email+username');
    if (!existingUser) {
      return next(new AppError(errorState.USER_NOT_EXIST));
    }

    req.user = {
      userId: existingUser._id.toString(),
      email: existingUser.email,
      username: existingUser.username
    };
    next();
  } catch (error) {}
};
