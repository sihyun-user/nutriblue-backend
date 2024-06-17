import { RequestHandler } from 'express';

import { createFood, getFoods, getFoodsCount, getFoodById } from '../modules/food';
import AppSuccess from '../helpers/appSuccess';
import AppError from '../helpers/appError';
import errorState from '../helpers/errorState';

export const getFoodsPage: RequestHandler = async (req, res) => {
  const { pageIndex, pageSize } = req.query;

  const pageIndexNumber = pageIndex !== undefined && pageIndex !== ''
    ? parseInt(pageIndex as string)
    : 1;

  const pageSizeNumber = pageSize !== undefined && pageSize !== ''
    ? parseInt(pageSize as string)
    : 10;

  const [elementCount, elements] = await Promise.all([
    getFoodsCount(),
    getFoods()
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
    targetPage: pageIndexNumber,
  };
  AppSuccess({ res, data, message: '取得食物列表成功' });
};

export const getFood: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  const data = await getFoodById(id);

  if (!data) return next(new AppError(errorState.DATA_NOT_EXIST));

  AppSuccess({ res, data, message: '取得食品成功' });
}

export const createNewFood: RequestHandler = async (req, res) => {
  const { publiced, verified, name, common_name, brand_name, serving_size, nutritions } = req.body;

  const data = await createFood({
    publiced,
    verified,
    name,
    common_name,
    brand_name,
    serving_size,
    nutritions
  });

  AppSuccess({ res, data, message: '新增食物成功' });
}