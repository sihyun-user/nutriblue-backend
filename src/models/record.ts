import mongoose from 'mongoose';

const RecordSchema = new mongoose.Schema(
  {
    user: { type: String, required: true, ref: 'User' },
    food: { type: String, required: true, ref: 'Food' },
    multiplier: { type: Number, default: 1 },
    mealName: { type: String, default: 'breakfast' },
    recordDate: { type: String, required: true } // yyyy-MM-dd
  },
  {
    versionKey: false
  }
);

RecordSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    return ret;
  }
});

export const Record = mongoose.model('Record', RecordSchema);

export const getRecords = (values: Record<string, any> = {}) => Record.find(values);
export const getRecordById = (id: string) => Record.findById(id);
export const createNewRecord = (values: Record<string, any>) => Record.create(values);
export const deleteRecordById = (id: string) => Record.findByIdAndDelete(id);
export const updateRecordById = (id: string, values: Record<string, any>) =>
  Record.findByIdAndUpdate(id, values, { new: true, runValidators: true });
