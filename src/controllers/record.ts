import { RequestHandler } from 'express';
import { startOfMonth, endOfMonth } from 'date-fns';

import { createNewRecord, deleteRecordById, getRecords, updateRecordById } from '../models/record';
import { getFoodById } from '../models/food';
import { formatedDate } from '../helpers';
import catchAsync from '../helpers/catchAsync';
import errorState from '../helpers/errorState';
import AppSuccess from '../helpers/appSuccess';
import appError from '../helpers/appError';

export const getRecordForCalendar: RequestHandler = catchAsync(async (req, res, next) => {
  const userId = req.user!.id;
  const { calendarId } = req.body;

  const [year, month] = calendarId.split('-');
  const currentDate = new Date(year, month - 1, 1);
  const firstDayOfMonth = formatedDate(startOfMonth(currentDate));
  const lastDaysOfMonth = formatedDate(endOfMonth(currentDate));

  const records = await getRecords({
    user: userId,
    recordDate: {
      $gte: firstDayOfMonth,
      $lte: lastDaysOfMonth
    }
  }).select('recordDate');

  const getTimeStamp = (date: string) => new Date(date).getTime();
  const data = [...new Set(records.map((record) => record.recordDate))].sort(
    (a, b) => getTimeStamp(a) - getTimeStamp(b)
  );

  AppSuccess({ res, data, message: '取得當月紀錄成功' });
});

export const getRecordsByDate: RequestHandler = catchAsync(async (req, res, next) => {
  const userId = req.user!.id;
  const { dateId } = req.body;

  const data = await getRecords({ user: userId, recordDate: dateId })
    .populate({
      path: 'food',
      select: '-bookmarkCollects'
    })
    .select('-user');

  AppSuccess({ res, data, message: '取得使用者食品紀錄成功' });
});

export const createRecord: RequestHandler = catchAsync(async (req, res, next) => {
  const userId = req.user!.id;

  const { foodId, multiplier, mealName, recordDate } = req.body;

  const food = await getFoodById(foodId);

  if (!food) {
    return appError(errorState.DATA_NOT_EXIST, next);
  }

  const data = await createNewRecord({
    user: userId,
    food: foodId,
    multiplier,
    mealName,
    recordDate
  });

  AppSuccess({ res, data, message: '新增食品紀錄成功' });
});

export const updateRecord: RequestHandler = catchAsync(async (req, res, next) => {
  const { recordId } = req.params;
  const { multiplier, mealName, recordDate } = req.body;

  const data = await updateRecordById(recordId, {
    multiplier,
    mealName,
    recordDate
  });

  if (!data) {
    return appError(errorState.DATA_NOT_EXIST, next);
  }

  AppSuccess({ res, message: '更新食品紀錄成功' });
});

export const deleteRecord: RequestHandler = catchAsync(async (req, res, next) => {
  const { recordId } = req.params;

  const data = await deleteRecordById(recordId);

  if (!data) {
    return appError(errorState.DATA_NOT_EXIST, next);
  }

  AppSuccess({ res, message: '刪除食品紀錄成功' });
});
