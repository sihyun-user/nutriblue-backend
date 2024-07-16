import { RequestHandler } from 'express';

import { getUserById } from '../models/user';
import { verifyJWT } from '../helpers/auth';
import catchAsync from '../helpers/catchAsync';
import appError from '../helpers/appError';
import errorState from '../helpers/errorState';

export const isAuthenticated: RequestHandler = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return appError(errorState.USER_NOT_LOGIN, next);
  }

  const decoded = verifyJWT(token);

  if (!decoded || !decoded.id) {
    return appError(errorState.DATA_NOT_EXIST, next);
  }

  const existingUser = await getUserById(decoded.id).select('+_id+email+name');

  if (!existingUser) {
    return appError(errorState.USER_NOT_EXIST, next);
  }

  req.user = {
    id: existingUser._id.toString(),
    email: existingUser.email,
    name: existingUser.name
  };
  next();
});
