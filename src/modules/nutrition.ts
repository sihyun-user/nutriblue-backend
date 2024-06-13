import mongoose from 'mongoose';

const NutritionSchema = new mongoose.Schema({
  calories: { type: String, default: '0' },
  carbohydrates: { type: String, default: '0' },
  protein: { type: String, default: '0' },
  fat: { type: String, default: '0' },
  saturatedFat: { type: String, default: '0' },
  transFat: { type: String, default: '0' },
  sodium: { type: String, default: '0' },
  sugar: { type: String, default: '0' },
}, { _id: false });

export default NutritionSchema;