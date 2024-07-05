import { RequestHandler } from 'express';
import { format, startOfMonth, endOfMonth } from 'date-fns';

import { createNewRecord, deleteRecordById, getRecordsCount, getRecords, updateRecordById } from '../models/record';
import { getFoodById } from '../models/food';
import { isValidDate, formatedDate } from '../helpers'
import AppSuccess from '../helpers/appSuccess';
import AppError from '../helpers/appError';
import errorState from '../helpers/errorState';

export const getRecordsPage: RequestHandler = async (req, res) => {
  try {
    const userId = req.user!.id;
    const { pageIndex, pageSize } = req.query;

    const pageIndexNumber = pageIndex ? parseInt(pageIndex as string) : 1;

    const pageSizeNumber = pageSize ? parseInt(pageSize as string) : 10;

      const [elementCount, elements] = await Promise.all([
        getRecordsCount({ user: userId }),
        getRecords({ user: userId })
        .populate({ path: 'food' })
          .sort({ createdAt: -1 })
          .skip((pageIndexNumber - 1) * pageSizeNumber)
          .limit(pageSizeNumber)
          .select('-user')
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
      AppSuccess({ res, data, message: '取得使用者食品紀錄成功' });  


  } catch (error) {
    console.error(error);
  }
};

export const createRecord: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user!.id;

    const { food_id, multiplier, meal_name, record_date } = req.body;

    const food = await getFoodById(food_id);
    if (!food) return next(new AppError(errorState.DATA_NOT_EXIST));

    const data = await createNewRecord({
      user: userId,
      food: food_id,
      multiplier,
      meal_name,
      record_date
    });

    AppSuccess({ res, data, message: '新增食品紀錄成功' });
  } catch (error) {
    console.error(error);
  }
};

export const updateRecord: RequestHandler = async (req, res, next) => {
  try {
    const { recordId } = req.params;
    const { multiplier, meal_name, record_date } = req.body;

    const data = await updateRecordById(recordId, {
      multiplier,
      meal_name,
      record_date
    });

    if (!data) return next(new AppError(errorState.DATA_NOT_EXIST));

    AppSuccess({ res, message: '更新食品紀錄成功' });
  } catch (error) {
    console.error(error);
  }
};

export const deleteRecord: RequestHandler = async (req, res, next) => {
  try {
    const { recordId } = req.params;

    const data = await deleteRecordById(recordId);

    if (!data) return next(new AppError(errorState.DATA_NOT_EXIST));

    AppSuccess({ res, message: '刪除食品紀錄成功' });
  } catch (error) {
    console.error(error);
  }
};

export const getRecordForCalendar: RequestHandler = async (req, res, next) => {
  const userId = req.user!.id;
  const { date } = req.query;

  if (date && (typeof date !== 'string' || !isValidDate(date))) {
    return next(new AppError(errorState.QUERY_ERROR));
  }
  
  const currentDate: Date = date ? new Date(date) : new Date();
  const firstDayOfMonth = formatedDate(startOfMonth(currentDate));
  const lastDaysOfMonth = formatedDate(endOfMonth(currentDate));

  const data = await getRecords({ 
    user: userId, 
    record_date: {
      $gte: firstDayOfMonth,
      $lte: lastDaysOfMonth
    }
  });

  AppSuccess({ res, data, message: '取得當月紀錄成功' })
}
