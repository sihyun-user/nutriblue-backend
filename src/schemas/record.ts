import { z } from 'zod';

import validate from '../middlewares/validate';
import { requiredString, requiredNumber, dateValidator } from './index';

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
    multiplier: requiredNumber(),
    mealName: requiredString(),
    recordDate: dateValidator('recordDate')
  })
);
