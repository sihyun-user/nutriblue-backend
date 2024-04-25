import express from 'express';

import { deleteUserById, getUserById, getUsers } from '../modules/users';
import { appSuccess, appError } from '../helpers/appResponses';
import apiState from '../helpers/apiState';

const usersController = {
  getAllUser: async (req: express.Request, res: express.Response) => {
    try {
      const users = await getUsers();

      return appSuccess({ res, data: users, message: '取得所有會員成功' });
    } catch (error) {}
  },
  deleteUser: async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;

      await deleteUserById(id);

      return appSuccess({ res, message: '刪除會員成功' });
    } catch (error) {}
  },
  updateUser: async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      const { username } = req.body;

      if (!username) {
        return appError({ res, apiState: apiState.DATA_MISSING });
      }

      const user = await getUserById(id);
      if (!user) {
        return appError({ res, apiState: apiState.USER_NOT_EXIST });
      }

      user.username = username;
      await user.save();

      return appSuccess({ res, message: '更新會員成功' });
    } catch (error) {}
  }
};

export default usersController;
