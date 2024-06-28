import { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';

import { getUserById, deleteUserById, updateUserById } from '../models/user';
import { getFoods } from '../models/food';
import AppSuccess from '../helpers/appSuccess';

export const getUser: RequestHandler = async (req, res) => {
  try {
    const userId = req.user!.id;

    const user = await getUserById(userId);

    AppSuccess({ res, data: user, message: '取得會員資料成功' });
  } catch (error) {}
};

export const deleteUser: RequestHandler = async (req, res) => {
  try {
    const userId = req.user!.id;

    await deleteUserById(userId);

    AppSuccess({ res, message: '刪除會員資料成功' });
  } catch (error) {}
};

export const updateUser: RequestHandler = async (req, res) => {
  try {
    const userId = req.user!.id;
    const { name, gender, birthday, height, weight, sport_level, fitness_level, bio } = req.body;

    await updateUserById(userId, {
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
    const userId = req.user!.id;
    const { password } = req.body;

    const passwordHashed = await bcrypt.hash(password, 12);

    await updateUserById(userId, { password: passwordHashed });

    AppSuccess({ res, message: '更新會員密碼成功' });
  } catch (error) {}
};

export const getUserFood: RequestHandler = async (req, res) => {
  const userId = req.user!.id;

  const user = await getUserById(userId);

  const data = await getFoods({ _id: { $in: user!.food_collects } });

  AppSuccess({ res, data, message: '取得會員食品成功' });
};

export const addUserFoodCollects: RequestHandler = async (req, res) => {
  const userId = req.user!.id;
  const { foodId } = req.params;

  await updateUserById(userId, {
    $addToSet: { food_collects: foodId }
  })

  AppSuccess({ res, message: '新增會員食品成功' });
};

export const deleteUserFoodCollects: RequestHandler = async (req, res) => {
  const userId = req.user!.id;
  const { foodId } = req.params;

  await updateUserById(userId, {
    $pull: { food_collects: foodId }
  })

  AppSuccess({ res, message: '刪除會員食品成功' });
};
