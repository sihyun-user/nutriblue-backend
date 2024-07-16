import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

import appError from '../helpers/appError';
import errorState from '../helpers/errorState';

const validate =
  (schema: ZodSchema<any>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req.body);
      if (result.success) {
        next();
      } else {
        const message = result.error.errors[0].message || '資料驗證錯誤';
        appError({ statusCode: 400, message }, next);
      }
    } catch (error) {
      appError(errorState.FAIL, next);
    }
  };

export default validate;
