import { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';

import { getUserByEmail, createUser } from '../modules/user';
import { generateSendJWT } from '../helpers';
import AppSuccess from '../helpers/appSuccess';
import AppError from '../helpers/appError';
import errorState from '../helpers/errorState';

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email).select('+password');
    if (!user) {
      return new AppError(errorState.USER_EAMIL_NOT_EXIST);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return next(new AppError(errorState.USER_PASSWORD_ERROR));
    }

    const token = generateSendJWT(res, user._id.toString());

    AppSuccess({ res, data: { token }, message: '會員登入成功' });
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

    const token = generateSendJWT(res, user._id.toString());

    AppSuccess({ res, data: { token },  message: '會員註冊成功' });
  } catch (error) {
    console.error(error);
  }
};
