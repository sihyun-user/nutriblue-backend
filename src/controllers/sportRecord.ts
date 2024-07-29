import { RequestHandler } from 'express';

import {
  getSportRecords,
  createNewSportRecord,
  updateSportRecordById,
  deleteSportRecordById
} from '../models/sportRecord';
import catchAsync from '../helpers/catchAsync';
import errorState from '../helpers/errorState';
import AppSuccess from '../helpers/appSuccess';
import appError from '../helpers/appError';

export const getSportRecordByDate: RequestHandler = catchAsync(async (req, res, next) => {
  const userId = req.user!.id;
  const { dateId } = req.body;

  const data = await getSportRecords({ user: userId, recordDate: dateId }).select('-user');

  AppSuccess({ res, data, message: '取得使用者運動紀錄成功' });
});

export const createSportRecord: RequestHandler = catchAsync(async (req, res, next) => {
  const userId = req.user!.id;

  const { sportName, sportValue, sportTime, recordDate } = req.body;

  const data = await createNewSportRecord({
    user: userId,
    sportName,
    sportTime,
    sportValue,
    recordDate
  });

  AppSuccess({ res, data, message: '新增運動紀錄成功' });
});

export const updateSportRecord: RequestHandler = catchAsync(async (req, res, next) => {
  const { sportRecordId } = req.params;

  const { sportName, sportValue, sportTime, recordDate } = req.body;

  const data = await updateSportRecordById(sportRecordId, {
    sportName,
    sportTime,
    sportValue,
    recordDate
  });

  if (!data) {
    return appError(errorState.DATA_NOT_EXIST, next);
  }

  AppSuccess({ res, message: '更新運動紀錄成功' });
});

export const deleteSportRecord: RequestHandler = catchAsync(async (req, res, next) => {
  const { sportRecordId } = req.params;

  const data = await deleteSportRecordById(sportRecordId);

  if (!data) {
    return appError(errorState.DATA_NOT_EXIST, next);
  }

  AppSuccess({ res, message: '刪除運動紀錄成功' });
});
