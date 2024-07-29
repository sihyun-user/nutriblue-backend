import { z } from 'zod';

import validate from '../middlewares/validate';
import { requiredString, requiredNumber, dateValidator } from './index';

export const getSportRecordDateSchema = validate(
  z.object({
    dateId: dateValidator('recordId')
  })
);

export const newSportRecordSchema = validate(
  z.object({
    sportName: requiredString(),
    sportTime: z.string(),
    sportValue: requiredNumber(),
    recordDate: dateValidator('recordDate')
  })
);
