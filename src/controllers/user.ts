import { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';

import { getUserById, deleteUserById, updateUserById } from '../models/user';
import { getFoodByUserId } from '../models/food';
import catchAsync from '../helpers/catchAsync';
import AppSuccess from '../helpers/appSuccess';

export const getUser: RequestHandler = catchAsync(async (req, res) => {
  const userId = req.user!.id;

  const user = await getUserById(userId);

  AppSuccess({ res, data: user, message: '取得會員資料成功' });
});

export const deleteUser: RequestHandler = catchAsync(async (req, res) => {
  const userId = req.user!.id;

  await deleteUserById(userId);

  AppSuccess({ res, message: '刪除會員資料成功' });
});

export const updateUser: RequestHandler = catchAsync(async (req, res) => {
  const userId = req.user!.id;
  const { name, gender, birthday, height, weight, sport_level, fitness_level } = req.body;

  await updateUserById(userId, {
    name,
    gender,
    birthday,
    height,
    weight,
    sport_level,
    fitness_level
  });

  AppSuccess({ res, message: '更新會員成功' });
});

export const updateUserPassword: RequestHandler = catchAsync(async (req, res) => {
  const userId = req.user!.id;
  const { password } = req.body;

  const passwordHashed = await bcrypt.hash(password, 12);

  await updateUserById(userId, { password: passwordHashed });

  AppSuccess({ res, message: '更新會員密碼成功' });
});

export const getUserFood: RequestHandler = catchAsync(async (req, res) => {
  const userId = req.user!.id;

  const data = await getFoodByUserId(userId);

  AppSuccess({ res, data, message: '取得會員食品成功' });
});
