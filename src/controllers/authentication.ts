import { RequestHandler } from 'express';

import { authentication, random } from '../helpers';
import { getUserByEmail, createUser } from '../modules/users';
import AppSuccess from '../helpers/appSuccess';
import AppError from '../helpers/appError';
import errorState from '../helpers/errorState';

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError(errorState.DATA_MISSING));
    }

    const user = await getUserByEmail(email).select(
      '+authentication.salt +authentication.password'
    );

    if (!user) {
      return new AppError(errorState.USER_EAMIL_NOT_EXIST);
    }

    const expectedHash = authentication(user.authentication?.salt ?? '', password);

    if (user.authentication?.password !== expectedHash) {
      return next(new AppError(errorState.USER_PASSWORD_ERROR));
    }

    const newSalt = random();
    user.authentication.sessionToken = authentication(newSalt, user._id.toString());

    await user.save();

    res.cookie('ORANGELIFE-AUTH', user.authentication.sessionToken, {
      domain: 'localhost',
      path: '/'
    });
    AppSuccess({ res, message: '會員登入成功' });
  } catch (error) {}
};

export const register: RequestHandler = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return next(new AppError(errorState.DATA_MISSING));
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return next(new AppError(errorState.USER_EMAIL_EXIST));
    }

    const salt = random();
    await createUser({
      username,
      email,
      authentication: {
        salt,
        password: authentication(salt, password)
      }
    });

    AppSuccess({ res, message: '會員註冊成功' });
  } catch (error) {
    console.log('Caught an error:', error);
    next(error);
  }
};
