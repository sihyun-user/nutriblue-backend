import { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';

import { getUserById, deleteUserById, updateUserById } from '../modules/user';
import AppSuccess from '../helpers/appSuccess';

export const getUser: RequestHandler = async (req, res) => {
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

export const updateUser: RequestHandler = async (req, res) => {
  try {
    const id = req.user!.id;
    const { name, gender, birthday, height, weight, sport_level, fitness_level, bio } = req.body;

    await updateUserById(id, {
      name,
      gender,
      birthday,
      height,
      weight,
      sport_level,
      fitness_level,
      bio
    });

    AppSuccess({ res, message: '更新會員成功' });
  } catch (error) {}
};

export const updateUserPassword: RequestHandler = async (req, res) => {
  try {
    const id = req.user!.id;
    const { password } = req.body;

    const passwordHashed = await bcrypt.hash(password, 12);

    await updateUserById(id, { password: passwordHashed });

    AppSuccess({ res, message: '更新會員密碼成功' });
  } catch (error) {}
};
