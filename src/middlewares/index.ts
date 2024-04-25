import express from 'express';
import { get, merge } from 'lodash';

import { getUserBySessionToken } from '../modules/users';
import { appError } from '../helpers/appResponses';
import apiState from '../helpers/apiState';

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const currectUserId = (get(req, 'identity._id') ?? '') as string;

    if (!currectUserId) {
      return appError({ res, apiState: apiState.AUTH_NOT_EXIST });
    }

    if (currectUserId !== id) {
      return appError({ res, apiState: apiState.AUTH_NOT_MATCH });
    }

    next();
  } catch (error) {}
};

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies['ORANGELIFE-AUTH'];

    if (!sessionToken) {
      return appError({ res, apiState: apiState.AUTH_NOT_EXIST });
    }

    const existingUser = await getUserBySessionToken(sessionToken);
    if (!existingUser) {
      return appError({ res, apiState: apiState.AUTH_NOT_VALID });
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
