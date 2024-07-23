import { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

import { getUserById, deleteUserById, updateUserById } from '../models/user';
import { getRecords } from '../models/record';
import { formatedDate, calcCaloriesInTake } from '../helpers';
import { IFood, INutritions } from '../types';
import firebaseAdmin from '../connections/firsebase';
import catchAsync from '../helpers/catchAsync';
import errorState from '../helpers/errorState';
import AppSuccess from '../helpers/appSuccess';
import appError from '../helpers/appError';

const bucket = firebaseAdmin.storage().bucket();

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
  const { name, gender, birthday, height, weight, sportLevel, fitnessLevel } = req.body;

  await updateUserById(userId, {
    name,
    gender,
    birthday,
    height,
    weight,
    sportLevel,
    fitnessLevel
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

export const updateUserAvatar: RequestHandler = catchAsync(async (req, res) => {
  const userId = req.user!.id;
  const { avatar } = req.body;

  const data = await updateUserById(userId, { avatar });

  AppSuccess({ res, data, message: '更新會員頭像成功' });
});

export const updateImage: RequestHandler = catchAsync(async (req, res, next) => {
  const { file } = req;

  if (!file) {
    return appError(errorState.FAIL, next);
  }

  const blob = bucket.file(`images/${uuidv4()}.${file.originalname.split('.').pop()}`);

  const blobStream = blob.createWriteStream();

  blobStream.on('finish', () => {
    // 設定檔案的存取權限
    const config = {
      action: 'read' as any,
      expires: '2500-12-31'
    };

    // 取得檔案的網址
    blob.getSignedUrl(config, (err, imgUrl) => {
      if (err) {
        return appError(errorState.FAIL, next);
      }
      AppSuccess({ res, data: { imgUrl }, message: '上傳圖片成功' });
    });
  });

  blobStream.on('error', () => {
    return appError(errorState.FAIL, next);
  });

  blobStream.end(file.buffer);
});

export const getHealthyReportByDate: RequestHandler = catchAsync(async (req, res, next) => {
  const userId = req.user!.id;
  const date = formatedDate(new Date());

  // 計算每日建議攝取熱量
  const user = await getUserById(userId);

  if (!user) {
    return appError(errorState.DATA_NOT_EXIST, next);
  }

  const { birthday, weight, height, gender, sportLevel, fitnessLevel } = user;

  const caloriesInTake = calcCaloriesInTake(
    birthday,
    weight,
    height,
    gender,
    sportLevel,
    fitnessLevel
  );

  // 當日實際攝取熱量
  const records = await getRecords({ user: userId, recordDate: date })
    .populate({
      path: 'food',
      select: '-bookmarkCollects -createdAt'
    })
    .select('food');

  let foodCaloriesTake = records.reduce((acc, cur) => {
    const food = cur.food as unknown as IFood;
    return acc + food.nutritions.calories || 0;
  }, 0);
  foodCaloriesTake = Math.round(foodCaloriesTake);

  // const sportReduces

  const caloriesBalance = caloriesInTake - foodCaloriesTake;
  const caloriespercent = +((foodCaloriesTake / caloriesInTake) * 100).toFixed(2);

  const data = {
    date,
    caloriesInTake,
    caloriesBalance,
    caloriespercent,
    foodCaloriesTake
  };

  AppSuccess({ res, data, message: '取得每日健康紀錄成功' });
});

export const getAnalyzeResultsByDate: RequestHandler = catchAsync(async (req, res, next) => {
  const userId = req.user!.id;
  const date = formatedDate(new Date());
  function createInitialNutritions(): INutritions {
    return {
      calories: 0,
      protein: 0,
      carbohydrates: 0,
      sugar: 0,
      fat: 0,
      saturatedFat: 0,
      transFat: 0,
      sodium: 0,
      potassium: 0,
      cholesterol: 0
    };
  }

  const dateIntake: INutritions = createInitialNutritions();
  const dateCurrentTake: INutritions = createInitialNutritions();
  const datePercents: INutritions = createInitialNutritions();

  // 計算每日建議攝取熱量
  const user = await getUserById(userId);

  if (!user) {
    return appError(errorState.DATA_NOT_EXIST, next);
  }

  const { birthday, weight, height, gender, sportLevel, fitnessLevel } = user;

  const caloriesInTak = calcCaloriesInTake(
    birthday,
    weight,
    height,
    gender,
    sportLevel,
    fitnessLevel
  );

  // 當日實際攝取營養
  const records = await getRecords({ user: userId, recordDate: date })
    .populate({
      path: 'food',
      select: '-bookmarkCollects -createdAt'
    })
    .select('food');

  records.forEach((record) => {
    const food = record.food as unknown as IFood;
    const nutritions = food.nutritions;

    for (const key in dateCurrentTake) {
      if (Object.prototype.hasOwnProperty.call(dateCurrentTake, key)) {
        dateCurrentTake[key] += nutritions[key as keyof INutritions] || 0;
      }
    }
  });

  for (const key in dateCurrentTake) {
    if (Object.prototype.hasOwnProperty.call(dateCurrentTake, key)) {
      dateCurrentTake[key] = Math.round(dateCurrentTake[key]);
    }
  }

  // 當日建議攝取營養
  dateIntake.calories = caloriesInTak;
  dateIntake.protein = Math.round(caloriesInTak * 0.1);
  dateIntake.carbohydrates = Math.round(caloriesInTak * 0.55);
  dateIntake.sugar = Math.round(caloriesInTak * 0.1);
  dateIntake.fat = Math.round(caloriesInTak * 0.2);
  dateIntake.saturatedFat = Math.round(caloriesInTak * 0.1);
  dateIntake.transFat = Math.round(caloriesInTak * 0.01);
  dateIntake.sodium = 2000;
  dateIntake.potassium = 2.7;
  dateIntake.cholesterol = 300;

  // 當日營養目前攝取百分比
  for (const key in dateCurrentTake) {
    if (Object.prototype.hasOwnProperty.call(dateCurrentTake, key)) {
      datePercents[key] = +((dateCurrentTake[key] / dateIntake[key]) * 100).toFixed(2);
    }
  }

  const data = {
    dateIntake,
    dateCurrentTake,
    datePercents
  };

  AppSuccess({ res, data, message: '取得每日營養分析成功' });
});
