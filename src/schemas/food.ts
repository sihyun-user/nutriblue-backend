import { z } from 'zod';

import validate from '../middlewares/validate';
import { required, strNumValidator, nutritionsValidator } from './index';

export const createFoodSchema = validate(z.object({
  name: z.string({ required_error: required('名稱') }),
  subName: z.string({ required_error: required('副名稱') }),
  brandCompany: z.string({ required_error: required('品牌') }),
  unit: z.string({ required_error: required('單位') }).regex(/^(g|ml)$/, '單位只能為 g 或 ml'),
  unitWeight: strNumValidator('單位重量', 0),
  nutritions: nutritionsValidator,
}));