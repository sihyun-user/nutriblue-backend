import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

import AppError from '../helpers/appError';
import errorState from '../helpers/errorState';

export const validate =
  (schema: z.ZodObject<any>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req.body);
      if (result.success) {
        next();
      } else {
        const message = result.error.errors[0].message || '資料驗證錯誤';
        next(new AppError({ statusCode: 400, message }));
      }
    } catch (error) {
      next(new AppError(errorState.FAIL));
    }
  };
