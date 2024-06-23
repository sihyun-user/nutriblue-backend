import mongoose from 'mongoose';

const NutritionSchema = new mongoose.Schema(
  {
    calories: { type: Number, default: 0 },
    protein: { type: Number, default: 0 },
    fat: { type: Number, default: 0 },
    saturated_fat: { type: Number, default: 0 },
    trans_fat: { type: Number, default: 0 },
    carbohydrates: { type: Number, default: 0 },
    sugar: { type: Number, default: 0 },
    sodium: { type: Number, default: 0 },
    potassium: { type: Number, default: 0 },
    calcium: { type: Number, default: 0 },
    iron: { type: Number, default: 0 },
    cholesterol: { type: Number, default: 0 }
  },
  { _id: false }
);

export default NutritionSchema;
