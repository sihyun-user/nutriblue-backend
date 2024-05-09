import { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';

import { getUserByUsername, getUserByEmail, createUser } from '../modules/users';
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

export const register: RequestHandler = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;

    const userByUsername = await getUserByUsername(username);
    if (userByUsername) {
      return next(new AppError(errorState.USER_USERNAME_EXIST));
    }

    const userByEmail = await getUserByEmail(email);
    if (userByEmail) {
      return next(new AppError(errorState.USER_EMAIL_EXIST));
    }

    const passwordHashed = await bcrypt.hash(password, 12);

    await createUser({
      name,
      username,
      email,
      password: passwordHashed
    });

    AppSuccess({ res, message: '會員註冊成功' });
  } catch (error) {
    console.error(error);
  }
};
