import { RequestHandler } from 'express';

import {
  createNewFood,
  getFoods,
  getFoodsCount,
  updateFoodById,
  deleteFoodById
} from '../models/food';
import { updateUserById } from '../models/user';
import catchAsync from '../helpers/catchAsync';
import errorState from '../helpers/errorState';
import AppSuccess from '../helpers/appSuccess';
import appError from '../helpers/appError';

export const getFoodsPage: RequestHandler = catchAsync(async (req, res) => {
  const { query, publiced, pageIndex, pageSize } = req.query;

  const queryContent = query ? { name: new RegExp(query as string, 'i') } : {};

  const pageIndexNumber = pageIndex ? parseInt(pageIndex as string) : 1;

  const pageSizeNumber = pageSize ? parseInt(pageSize as string) : 10;

  const isPubliced = publiced ? { publiced } : { publiced: true };

  const content = { ...queryContent, ...isPubliced };

  const [elementCount, elements] = await Promise.all([
    getFoodsCount(content),
    getFoods(content)
      .sort({ createdAt: -1 })
      .skip((pageIndexNumber - 1) * pageSizeNumber)
      .limit(pageSizeNumber)
  ]);

  const firstPage = pageIndexNumber === 1;
  const lastPage = elementCount <= pageIndexNumber * pageSizeNumber;
  const empty = elementCount === 0;
  const totalPages = Math.ceil(elementCount / pageSizeNumber);
  const data = {
    elements,
    firstPage,
    lastPage,
    empty,
    elementCount,
    totalPages,
    targetPage: pageIndexNumber
  };
  AppSuccess({ res, data, message: '取得食物列表成功' });
});

export const getUserFoodsPage: RequestHandler = catchAsync(async (req, res) => {
  const userId = req.user!.id;
  const { query, pageIndex, pageSize } = req.query;

  const queryContent = query ? { name: new RegExp(query as string, 'i') } : {};

  const pageIndexNumber = pageIndex ? parseInt(pageIndex as string) : 1;

  const pageSizeNumber = pageSize ? parseInt(pageSize as string) : 10;

  const content = { ...queryContent, userId };

  const [elementCount, elements] = await Promise.all([
    getFoodsCount(content),
    getFoods(content)
      .sort({ createdAt: -1 })
      .skip((pageIndexNumber - 1) * pageSizeNumber)
      .limit(pageSizeNumber)
  ]);

  const firstPage = pageIndexNumber === 1;
  const lastPage = elementCount <= pageIndexNumber * pageSizeNumber;
  const empty = elementCount === 0;
  const totalPages = Math.ceil(elementCount / pageSizeNumber);
  const data = {
    elements,
    firstPage,
    lastPage,
    empty,
    elementCount,
    totalPages,
    targetPage: pageIndexNumber
  };
  AppSuccess({ res, data, message: '取得使用者食物列表成功' });
});

export const updateFood: RequestHandler = catchAsync(async (req, res, next) => {
  const { foodId } = req.params;
  const { publiced, verified, name, brandName, servingSize, nutritions } = req.body;

  const data = await updateFoodById(foodId, {
    publiced,
    verified,
    name,
    brandName,
    servingSize,
    nutritions
  });

  if (!data) {
    return appError(errorState.DATA_NOT_EXIST, next);
  }

  AppSuccess({ res, message: '更新食品成功' });
});

export const deleteFood: RequestHandler = catchAsync(async (req, res, next) => {
  const { foodId } = req.params;

  const data = await deleteFoodById(foodId);

  if (!data) {
    return appError(errorState.DATA_NOT_EXIST, next);
  }

  AppSuccess({ res, message: '刪除食品成功' });
});

export const createFood: RequestHandler = catchAsync(async (req, res) => {
  const userId = req.user!.id;

  const { publiced, verified, name, brandName, servingSize, nutritions } = req.body;

  const data = await createNewFood({
    publiced,
    verified,
    name,
    brandName,
    servingSize,
    nutritions,
    userId
  });

  await updateUserById(userId, {
    $addToSet: { foodCollects: data._id }
  });

  AppSuccess({ res, data, message: '新增食品成功' });
});
