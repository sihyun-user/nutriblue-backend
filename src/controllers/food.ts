import { RequestHandler } from 'express';

import {
  createNewFood,
  getFoods,
  getFoodsCount,
  getFoodById,
  updateFoodById,
  deleteFoodById
} from '../modules/food';
import { updateUserById } from '../modules/user';
import AppSuccess from '../helpers/appSuccess';
import AppError from '../helpers/appError';
import errorState from '../helpers/errorState';

//TODO 只有管理員可以取得全部食品列表
export const getFoodsPage: RequestHandler = async (req, res) => {
  const { pageIndex, pageSize } = req.query;

  const pageIndexNumber =
    pageIndex !== undefined && pageIndex !== '' ? parseInt(pageIndex as string) : 1;

  const pageSizeNumber =
    pageSize !== undefined && pageSize !== '' ? parseInt(pageSize as string) : 10;

  const isPubliced = { publiced: true };

  const [elementCount, elements] = await Promise.all([
    getFoodsCount(isPubliced),
    getFoods(isPubliced)
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
};

export const getFood: RequestHandler = async (req, res, next) => {
  const { food_id } = req.params;

  const data = await getFoodById(food_id);

  if (!data) return next(new AppError(errorState.DATA_NOT_EXIST));

  AppSuccess({ res, data, message: '取得食品成功' });
};

export const updateFood: RequestHandler = async (req, res, next) => {
  const { food_id } = req.params;
  const { publiced, verified, name, common_name, brand_name, serving_size, nutritions } = req.body;

  const data = await updateFoodById(food_id, {
    publiced,
    verified,
    name,
    common_name,
    brand_name,
    serving_size,
    nutritions
  });

  if (!data) return next(new AppError(errorState.DATA_NOT_EXIST));

  AppSuccess({ res, message: '更新食品成功' });
};

export const deleteFood: RequestHandler = async (req, res, next) => {
  const { food_id } = req.params;

  const data = await deleteFoodById(food_id);

  if (!data) return next(new AppError(errorState.DATA_NOT_EXIST));

  AppSuccess({ res, message: '刪除食品成功' });
};

export const createFood: RequestHandler = async (req, res) => {
  const id = req.user!.id;

  const { publiced, verified, name, common_name, brand_name, serving_size, nutritions } = req.body;;

  const data = await createNewFood({
    publiced,
    verified,
    name,
    common_name,
    brand_name,
    serving_size,
    nutritions,
    user_id: id
  });

  await updateUserById(id, {
    $addToSet: { food_collects: data._id }
  });

  AppSuccess({ res, data, message: '新增食品成功' });
};
