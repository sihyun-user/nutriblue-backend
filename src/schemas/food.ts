import { z } from 'zod';

import validate from '../middlewares/validate';
import { requiredString, requiredBoolean, numValidator, nutritionsValidator } from './index';

export const foodSchema = validate(
  z.object({
    // publiced: requiredBoolean(),
    // verified: requiredBoolean(),
    name: requiredString(),
    common_name: requiredString(),
    brand_name: requiredString(),
    serving_size: z.object({
      unit: requiredString().regex(/^(g|ml)$/, '單位只能為 g 或 ml'),
      value: numValidator('份量值')
    }),
    nutritions: nutritionsValidator
  })
);
