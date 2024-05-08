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
    const id = req.user!.id;

    const user = await getUserById(id);
    if (!user) {
      return next(new AppError(errorState.USER_NOT_EXIST));
    }

    AppSuccess({ res, data: user, message: '取得會員資料成功' });
  } catch (error) {}
};

export const deleteUser: RequestHandler = async (req, res) => {
  try {
    const id = req.user!.id;

    await deleteUserById(id);

    AppSuccess({ res, message: '刪除會員資料成功' });
  } catch (error) {}
};

export const updateUser: RequestHandler = async (req, res, next) => {
  try {
    const id = req.user!.id;
    const { username } = req.body;

    const user = await getUserById(id);
    if (!user) {
      return next(new AppError(errorState.USER_NOT_EXIST));
    }

    user.username = username;
    await user.save();

    AppSuccess({ res, message: '更新會員成功' });
  } catch (error) {}
};

export const updateUserPassword: RequestHandler = async (req, res, next) => {
  try {
    AppSuccess({ res, message: '更新會員密碼成功' });
  } catch (error) {}
};
