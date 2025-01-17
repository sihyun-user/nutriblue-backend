import mongoose from 'mongoose';

import NutritionSchema from './nutrition';

const FoodSchema = new mongoose.Schema(
  {
    publiced: { type: Boolean, default: false },
    verified: { type: Boolean, default: false },
    name: { type: String, required: true },
    brandName: { type: String, default: '' },
    servingSize: {
      value: { type: Number, default: 0 }, // 每一份量數值
      unit: { type: String, default: 'g' }, // 每一份量單位
      container: { type: Number, default: 1 } // 每包裝份數
    },
    nutritions: { type: NutritionSchema },
    userId: { type: String, required: true },
    bookmarkCollects: [{ type: String }],
    createdAt: { type: Date, default: Date.now }
  },
  {
    versionKey: false
  }
);

FoodSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    return ret;
  }
});

export const Food = mongoose.model('Food', FoodSchema);

export const getFoodsCount = (values: Record<string, any> = {}) => Food.countDocuments(values);
export const getFoods = (values: Record<string, any> = {}) => Food.find(values);
export const getFoodById = (id: string) => Food.findById(id);
export const createNewFood = (values: Record<string, any>) => Food.create(values);
export const deleteFoodById = (id: string) => Food.findByIdAndDelete(id);
export const updateFoodById = (id: string, values: Record<string, any>) =>
  Food.findByIdAndUpdate(id, values, { new: true, runValidators: true });
export const getFoodByUserId = (id: string) => Food.find({ userId: id });
