import { RequestHandler } from 'express';

import { getUserById, getUsers, deleteUserById, updateUserById } from '../modules/users';
import AppSuccess from '../helpers/appSuccess';

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
    const { name, username, gender, birthday, height, weight, sportLevel, fitnessLevel, bio } =
      req.body;

    await updateUserById(id, {
      name,
      username,
      gender,
      birthday,
      height,
      weight,
      sportLevel,
      fitnessLevel,
      bio
    });

    AppSuccess({ res, message: '更新會員成功' });
  } catch (error) {}
};

export const updateUserPassword: RequestHandler = async (req, res, next) => {
  try {
    AppSuccess({ res, message: '更新會員密碼成功' });
  } catch (error) {}
};
