import { RequestHandler } from 'express';
import { get, merge } from 'lodash';

import { getUserBySessionToken } from '../modules/users';
import AppError from '../helpers/appError';
import errorState from '../helpers/errorState';

export const isOwner: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const currectUserId = (get(req, 'identity._id') ?? '') as string;

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
    const sessionToken = req.cookies['ORANGELIFE-AUTH'];

    if (!sessionToken) {
      return next(new AppError(errorState.AUTH_NOT_EXIST));
    }

    const existingUser = await getUserBySessionToken(sessionToken);
    if (!existingUser) {
      return next(new AppError(errorState.AUTH_NOT_VALID));
    }

    merge(req, {
      identity: {
        ...existingUser,
        _id: existingUser._id.toString()
      }
    });

    next();
  } catch (error) {}
};
