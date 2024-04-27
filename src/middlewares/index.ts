import { RequestHandler } from 'express';

import { getUserById } from '../modules/users';
import AppError from '../helpers/appError';
import errorState from '../helpers/errorState';

export const isOwner: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const currectUserId = req.session.userId?.toString();

    if (!currectUserId) {
      return next(new AppError(errorState.AUTH_NOT_EXIST));
    }

    if (currectUserId !== id) {
      return next(new AppError(errorState.AUTH_NOT_MATCH));
    }

    next();
  } catch (error) {}
};

export const isAuthenticated: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.session.userId?.toString();

    if (!userId) {
      return next(new AppError(errorState.AUTH_NOT_EXIST));
    }

    const existingUser = await getUserById(userId);
    if (!existingUser) {
      return next(new AppError(errorState.AUTH_NOT_VALID));
    }

    next();
  } catch (error) {}
};
