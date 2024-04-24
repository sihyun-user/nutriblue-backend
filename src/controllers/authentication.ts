import express from 'express';

import { authentication, random } from '../helpers';
import { getUserByEmail, createUser } from '../modules/users';
import { appSuccess, appError } from '../helpers/appResponses';
import apiState from '../helpers/apiState';

const authController = {
  login: async (req: express.Request, res: express.Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) return appError({ res, apiState: apiState.DATA_MISSING });

      const user = await getUserByEmail(email).select(
        '+authentication.salt +authentication.password'
      );

      if (!user) return appError({ res, apiState: { statusCode: 400, message: 'Email錯誤' } });

      const expectedHash = authentication(user.authentication?.salt ?? '', password);

      if (user.authentication?.password !== expectedHash)
        return appError({ res, apiState: { statusCode: 400, message: '密碼錯誤' } });

      const newSalt = random();
      user.authentication.sessionToken = authentication(newSalt, user._id.toString());

      await user.save();

      res.cookie('ORANGELIFE-AUTH', user.authentication.sessionToken, {
        domain: 'localhost',
        path: '/'
      });
      appSuccess({ res, data: user, message: '會員登入成功' });
    } catch (error) {}
  },
  register: async (req: express.Request, res: express.Response) => {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password)
        return appError({ res, apiState: apiState.DATA_MISSING });

      const existingUser = await getUserByEmail(email);

      if (existingUser)
        return appError({ res, apiState: { statusCode: 400, message: 'Email已存在' } });

      const salt = random();
      const user = await createUser({
        username,
        email,
        authentication: {
          salt,
          password: authentication(salt, password)
        }
      });

      return appSuccess({ res, data: user, message: '會員註冊成功' });
    } catch (error) {}
  }
};

export default authController;
