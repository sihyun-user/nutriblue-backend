import { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

import { getUserById, deleteUserById, updateUserById } from '../models/user';
import { getFoodByUserId } from '../models/food';
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

export const getUserFood: RequestHandler = catchAsync(async (req, res) => {
  const userId = req.user!.id;

  const data = await getFoodByUserId(userId);

  AppSuccess({ res, data, message: '取得會員食品成功' });
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
