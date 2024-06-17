import { z } from 'zod';

import validate from '../middlewares/validate';
import { requiredString, numValidator, nutritionsValidator } from './index';

export const createFoodSchema = validate(z.object({
  public: z.boolean(),
  verified: z.boolean(),
  name: requiredString(),
  common_name: requiredString(),
  brand_name: requiredString(),
  serving_size: z.object({
    nutrition_multiplier: numValidator('份量倍數', 1),
    unit: requiredString().regex(/^(g|ml)$/, '單位只能為 g 或 ml'),
    value: numValidator('份量值'),
  }),
  nutritions: nutritionsValidator,
}));