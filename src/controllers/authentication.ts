import express from 'express';
import apiState from 'helpers/apiState';
import { authentication, random } from 'helpers';
import { appSuccess, appError } from 'helpers/appResponses';
import { getUserByEmail, createUser } from 'modules/users';

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) return appError({ res, apiState: apiState.DATA_MISSING });

    const existingUser = await getUserByEmail(email);

    if (!existingUser) return appError({ res, apiState: apiState.USER_NOT_EXIST });

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
};
