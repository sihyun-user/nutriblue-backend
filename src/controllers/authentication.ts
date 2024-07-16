import { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';

import { getUserByEmail, createUser, getUserById } from '../models/user';
import { generateSendJWT, verifyJWT } from '../helpers/auth';
import catchAsync from '../helpers/catchAsync';
import errorState from '../helpers/errorState';
import AppSuccess from '../helpers/appSuccess';
import appError from '../helpers/appError';

export const refreshToken: RequestHandler = catchAsync(async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return appError({ statusCode: 401, message: 'refreshToken not exist' }, next);
  }

  const decoded = verifyJWT(refreshToken);

  if (!decoded || !decoded.id) {
    return appError(errorState.DATA_NOT_EXIST, next);
  }

  const existingUser = await getUserById(decoded.id).select('+_id+refreshToken');

  if (!existingUser) {
    return appError(errorState.USER_NOT_EXIST, next);
  }

  const { token } = await generateSendJWT(res, existingUser._id.toString());

  AppSuccess({ res, data: { token }, message: 'refreshToke 更新成功' });
});

export const login: RequestHandler = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await getUserByEmail(email).select('+password');

  if (!user) {
    return appError(errorState.USER_EAMIL_NOT_EXIST, next);
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return appError(errorState.USER_PASSWORD_ERROR, next);
  }

  const { token, refreshToken } = await generateSendJWT(res, user._id.toString());

  AppSuccess({ res, data: { token, refreshToken }, message: '會員登入成功' });
});

export const signup: RequestHandler = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const userByEmail = await getUserByEmail(email);

  if (userByEmail) {
    return appError(errorState.USER_EMAIL_EXIST, next);
  }

  const passwordHashed = await bcrypt.hash(password, 12);

  const user = await createUser({
    name,
    email,
    password: passwordHashed
  });

  const { token, refreshToken } = await generateSendJWT(res, user._id.toString());

  AppSuccess({ res, data: { token, refreshToken }, message: '會員註冊成功' });
});
