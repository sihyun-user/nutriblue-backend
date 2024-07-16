import { RequestHandler } from 'express';
import { startOfMonth, endOfMonth } from 'date-fns';

import { createNewRecord, deleteRecordById, getRecords, updateRecordById } from '../models/record';
import { getFoodById } from '../models/food';
import { formatedDate } from '../helpers'
import catchAsync from '../helpers/catchAsync';
import AppSuccess from '../helpers/appSuccess';
import AppError from '../helpers/appError';
import errorState from '../helpers/errorState';

export const gerRecordsByDate: RequestHandler = catchAsync(async (req, res, next) => {
  const userId = req.user!.id;
  const { dateId } = req.body;

  if (!dateId) return next(new AppError(errorState.DATA_NOT_EXIST));

  const data = await getRecords({ user: userId, record_date: dateId })
    .populate({ 
      path: 'food', 
      select: '-bookmark_collects' 
    })
    .select('-user');

  AppSuccess({ res, data, message: '取得使用者食品紀錄成功' });
});

export const createRecord: RequestHandler = catchAsync(async (req, res, next) => {
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
});

export const updateRecord: RequestHandler = catchAsync(async (req, res, next) => {
  const { recordId } = req.params;
  const { multiplier, meal_name, record_date } = req.body;

  const data = await updateRecordById(recordId, {
    multiplier,
    meal_name,
    record_date
  });

  if (!data) return next(new AppError(errorState.DATA_NOT_EXIST));

  AppSuccess({ res, message: '更新食品紀錄成功' });
});

export const deleteRecord: RequestHandler = catchAsync(async (req, res, next) => {
  try {
    const { recordId } = req.params;

    const data = await deleteRecordById(recordId);

    if (!data) return next(new AppError(errorState.DATA_NOT_EXIST));

    AppSuccess({ res, message: '刪除食品紀錄成功' });
  } catch (error) {
    console.error(error);
  }
});

export const getRecordForCalendar: RequestHandler = catchAsync(async (req, res, next) => {
  const userId = req.user!.id;
  const { calendarId } = req.body;

  if (!calendarId) return next(new AppError(errorState.DATA_NOT_EXIST));
  
  const [year, month] = calendarId.split('-');
  const currentDate = new Date(year, month - 1, 1);
  const firstDayOfMonth = formatedDate(startOfMonth(currentDate));
  const lastDaysOfMonth = formatedDate(endOfMonth(currentDate));

  const records = await getRecords({ 
    user: userId, 
    record_date: {
      $gte: firstDayOfMonth,
      $lte: lastDaysOfMonth
    }
  }).select('record_date');

  const getTimeStamp = (date: string) => new Date(date).getTime();
  const data = [...new Set(records.map(record => record.record_date))]
    .sort((a, b) => getTimeStamp(a) - getTimeStamp(b));
  
  AppSuccess({ res, data, message: '取得當月紀錄成功' })
});
