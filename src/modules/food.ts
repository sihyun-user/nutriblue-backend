import mongoose from 'mongoose';

import NutritionSchema from './nutrition';

const FoodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    subName: { type: String, default: '' },
    brandCompany: { type: String, default: '' },
    unit: { type: String, default: 'g', enum: ['g', 'ml'] },
    unitWeight: { type: String, default: '0' },
    nutritions: { type: NutritionSchema },
    createdAt: { type: Date, default: Date.now, select: false }
  },
  {
    versionKey: false
  }
)

FoodSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    return ret;
  }
});

export const Food = mongoose.model('Food', FoodSchema);

export const createFood = (values: Record<string, any>) => Food.create(values);