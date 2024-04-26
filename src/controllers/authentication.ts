import { RequestHandler } from 'express';

import { authentication, random } from '../helpers';
import { getUserByEmail, createUser } from '../modules/users';
import { appSuccess, appError } from '../helpers/appResponses';
import { errHandle } from '../helpers/response';
import apiState from '../helpers/apiState';

export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return appError({ res, apiState: apiState.DATA_MISSING });
    }

    const user = await getUserByEmail(email).select(
      '+authentication.salt +authentication.password'
    );

    if (!user) {
      return appError({ res, apiState: apiState.USER_EAMIL_NOT_EXIST });
    }

    const expectedHash = authentication(user.authentication?.salt ?? '', password);

    if (user.authentication?.password !== expectedHash) {
      return appError({ res, apiState: apiState.USER_PASSWORD_ERROR });
    }

    const newSalt = random();
    user.authentication.sessionToken = authentication(newSalt, user._id.toString());

    await user.save();

    res.cookie('ORANGELIFE-AUTH', user.authentication.sessionToken, {
      domain: 'localhost',
      path: '/'
    });
    appSuccess({ res, message: '會員登入成功' });
  } catch (error) {}
};

export const register: RequestHandler = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return next(errHandle(apiState.DATA_MISSING));
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return appError({ res, apiState: apiState.USER_EMAIL_EXIST });
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

    return appSuccess({ res, message: '會員註冊成功' });
  } catch (error) {
    next(error);
  }
};
