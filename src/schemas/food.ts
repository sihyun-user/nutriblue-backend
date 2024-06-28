import { z } from 'zod';

import validate from '../middlewares/validate';
import { requiredString, requiredBoolean, numValidator } from './index';

export const foodSchema = validate(
  z.object({
    publiced: z.boolean(),
    verified: z.boolean(),
    name: z.string(),
    brand_name: z.string(),
    serving_size: z.object({
      value: z.number(),
      unit: z.string(),
      container: z.number()
    }),
    nutritions: z.object({
      calories: z.number(),
      protein: z.number(),
      fat: z.number(),
      saturated_fat: z.number(),
      trans_fat: z.number(),
      carbohydrates: z.number(),
      sugar: z.number(),
      sodium: z.number(),
      potassium: z.number(),
      cholesterol: z.number()
    })
  }).partial()
);
