import { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';

import { getUserByEmail, createUser, getUserById } from '../models/user';
import { generateSendJWT, verifyJWT } from '../helpers/auth';
import AppSuccess from '../helpers/appSuccess';
import AppError from '../helpers/appError';
import errorState from '../helpers/errorState';

export const refreshToken: RequestHandler = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if(!refreshToken) {
      return next(new AppError({ statusCode: 401, message: 'refreshToken not exist' }));
    }

    const decoded = verifyJWT(refreshToken);
    if (!decoded || !decoded.id) {
      return next(new AppError(errorState.DATA_NOT_EXIST));
    }

    const existingUser = await getUserById(decoded.id).select('+_id+refresh_token');
    if (!existingUser) {
      return next(new AppError(errorState.USER_NOT_EXIST));
    }

    const { token } = await generateSendJWT(res, existingUser._id.toString());

    AppSuccess({ res, data: { token }, message: 'refreshToke 更新成功' });
  } catch (error) {
    console.error(error);
  }
}; 

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email).select('+password');
    if (!user) {
      return next(new AppError(errorState.USER_EAMIL_NOT_EXIST));
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return next(new AppError(errorState.USER_PASSWORD_ERROR));
    }

    const { token, refreshToken }  = await generateSendJWT(res, user._id.toString());

    AppSuccess({ res, data: { token, refreshToken }, message: '會員登入成功' });
  } catch (error) {}
};

export const signup: RequestHandler = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userByEmail = await getUserByEmail(email);
    if (userByEmail) {
      return next(new AppError(errorState.USER_EMAIL_EXIST));
    }

    const passwordHashed = await bcrypt.hash(password, 12);

    const user = await createUser({
      name,
      email,
      password: passwordHashed
    });

    const { token, refreshToken } = await generateSendJWT(res, user._id.toString());

    AppSuccess({ res, data: { token, refreshToken },  message: '會員註冊成功' });
  } catch (error) {
    console.error(error);
  }
};
