import { z } from 'zod';

import validate from '../middlewares/validate';
import { requiredString, strNumValidator, nutritionsValidator } from './index';

export const createFoodSchema = validate(z.object({
  name: requiredString(),
  subName: requiredString(),
  brandCompany: requiredString(),
  unit: requiredString().regex(/^(g|ml)$/, '單位只能為 g 或 ml'),
  unitWeight: strNumValidator('單位重量'),
  nutritions: nutritionsValidator,
}));