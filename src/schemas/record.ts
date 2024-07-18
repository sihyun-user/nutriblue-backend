import { z } from 'zod';

import validate from '../middlewares/validate';
import { requiredString, requiredNumber, dateValidator } from './index';

export const getCalendarDateSchema = validate(
  z.object({
    calendarId: requiredString().regex(
      /^(\d{4})-(\d{2})$/,
      'calendarId 格式錯誤，請輸入 yyyy-MM-dd 格式'
    )
  })
);

export const getRecordDateSchema = validate(
  z.object({
    dateId: dateValidator('recordId')
  })
);

export const createRecordSchema = validate(
  z.object({
    foodId: requiredString(),
    multiplier: requiredNumber(),
    mealName: requiredString(),
    recordDate: dateValidator('recordDate')
  })
);

export const updateRecordSchema = validate(
  z.object({
    recordId: dateValidator('recordId'),
    multiplier: requiredNumber(),
    mealName: requiredString(),
    recordDate: dateValidator('recordDate')
  })
);
