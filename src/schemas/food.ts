import { z } from 'zod';

import validate from '../middlewares/validate';

export const foodSchema = validate(
  z
    .object({
      publiced: z.boolean(),
      verified: z.boolean(),
      name: z.string(),
      brandName: z.string(),
      servingSize: z.object({
        value: z.number(),
        unit: z.string(),
        container: z.number()
      }),
      nutritions: z.object({
        calories: z.number(),
        protein: z.number(),
        fat: z.number(),
        saturatedFat: z.number(),
        transFat: z.number(),
        carbohydrates: z.number(),
        sugar: z.number(),
        sodium: z.number(),
        potassium: z.number(),
        cholesterol: z.number()
      })
    })
    .partial()
);
