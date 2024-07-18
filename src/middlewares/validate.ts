import { RequestHandler } from 'express';
import { ZodSchema } from 'zod';

import appError from '../helpers/appError';
import errorState from '../helpers/errorState';

const validate =
  (schema: ZodSchema<any>): RequestHandler =>
  async (req, res, next) => {
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
