import { RequestHandler } from 'express';

import { deleteUserById, getUserById, getUsers } from '../modules/users';
import AppSuccess from '../helpers/appSuccess';
import AppError from '../helpers/appError';
import errorState from '../helpers/errorState';

export const getAllUser: RequestHandler = async (req, res) => {
  try {
    const users = await getUsers();

    AppSuccess({ res, data: users, message: '取得所有會員資料成功' });
  } catch (error) {}
};

export const getUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await getUserById(id);
    if (!user) {
      return next(new AppError(errorState.USER_NOT_EXIST));
    }

    AppSuccess({ res, data: user, message: '取得會員資料成功' });
  } catch (error) {}
};

export const deleteUser: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteUserById(id);

    AppSuccess({ res, message: '刪除會員成功' });
  } catch (error) {}
};

export const updateUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    if (!username) {
      return next(new AppError(errorState.DATA_MISSING));
    }

    const user = await getUserById(id);
    if (!user) {
      return next(new AppError(errorState.USER_NOT_EXIST));
    }

    user.username = username;
    await user.save();

    AppSuccess({ res, message: '更新會員成功' });
  } catch (error) {}
};
