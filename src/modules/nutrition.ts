import mongoose from 'mongoose';

const NutritionSchema = new mongoose.Schema({
  calories: { type: Number, default: 0 },
  carbohydrates: { type: Number, default: 0 },
  protein: { type: Number, default: 0 },
  fat: { type: Number, default: 0 },
  saturatedFat: { type: Number, default: 0 },
  transFat: { type: Number, default: 0 },
  sodium: { type: Number, default: 0 },
  sugar: { type: Number, default: 0 },
}, { _id: false });

export default NutritionSchema;