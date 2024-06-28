import mongoose from 'mongoose';

const RecordSchema = new mongoose.Schema(
  {
    user: { type: String, required: true, ref: 'User' },
    food: { type: String, required: true, ref: 'Food' },
    multiplier: { type: Number, default: 1 },
    meal_name: { type: String, default: 'breakfast' },
    record_date: { type: String, required: true } // MM/dd/yyyy
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

export const getRecordsCount = (values: Record<string, any> = {}) => Record.countDocuments(values);
export const getRecords = (values: Record<string, any> = {}) => Record.find(values);
export const getRecordById = (id: string) => Record.findById(id);
export const createNewRecord = (values: Record<string, any>) => Record.create(values);
export const deleteRecordById = (id: string) => Record.findByIdAndDelete(id);
export const updateRecordById = (id: string, values: Record<string, any>) =>
  Record.findByIdAndUpdate(id, values);