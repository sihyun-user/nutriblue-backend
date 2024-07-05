import { RequestHandler } from 'express';

import { getFoods, getFoodsCount, updateFoodById } from '../models/food';
import AppSuccess from '../helpers/appSuccess';
import AppError from '../helpers/appError';
import errorState from '../helpers/errorState';

export const getBookmarksPage: RequestHandler = async (req, res, next) => {
  const userId = req.user!.id;
  const { query, pageIndex, pageSize } = req.query;

  const queryContent = query ? { name: new RegExp(query as string, 'i') } : {};

  const pageIndexNumber = pageIndex ? parseInt(pageIndex as string) : 1;

  const pageSizeNumber = pageSize ? parseInt(pageSize as string) : 10;

  const content = { ...queryContent, bookmark_collects: { $in: userId } };

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

  AppSuccess({ res, data, message: '取得食品書籤成功' });
};

export const createBookmark: RequestHandler = async (req, res, next) => {
  const userId = req.user!.id;
  const { foodId } = req.params;

  const data = await updateFoodById(foodId, {
    $addToSet: { bookmark_collects: userId }
  })

  if (!data) return next(new AppError(errorState.DATA_NOT_EXIST));

  AppSuccess({ res, data, message: '新增食品書籤成功' });
};

export const deleteBookmark: RequestHandler = async (req, res, next) => {
  const userId = req.user!.id;
  const { foodId } = req.params;

  const data = await updateFoodById(foodId, {
    $pull: { bookmark_collects: userId }
  })

  if (!data) return next(new AppError(errorState.DATA_NOT_EXIST));

  AppSuccess({ res, message: '刪除食品書籤成功' });
};
