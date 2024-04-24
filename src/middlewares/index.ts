import express from 'express';
import _, { get, merge } from 'lodash';

import { getUserBySessionToken } from '../modules/users';
import { appError } from '../helpers/appResponses';

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const currectUserId = (get(req, 'identity._id') ?? '') as string;

    if (!currectUserId)
      return appError({ res, apiState: { statusCode: 403, message: '未提供授權憑證，請先登入' } });

    if (currectUserId !== id)
      return appError({ res, apiState: { statusCode: 403, message: '無權限執行此操作' } });

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

    if (!sessionToken)
      return appError({ res, apiState: { statusCode: 403, message: '未提供授權憑證，請先登入' } });

    const existingUser = await getUserBySessionToken(sessionToken);
    if (!existingUser)
      return appError({
        res,
        apiState: { statusCode: 403, message: '授權憑證無效或已過期，請重新登入' }
      });

    merge(req, {
      identity: {
        ...existingUser,
        _id: existingUser._id.toString()
      }
    });

    next();
  } catch (error) {}
};
