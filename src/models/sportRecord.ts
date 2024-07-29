import mongoose from 'mongoose';

const SportRecordSchema = new mongoose.Schema(
  {
    user: { type: String, required: true, ref: 'User' },
    sportName: { type: String, required: true },
    sportTime: { type: String, required: true, default: '0' },
    sportValue: { type: Number, required: true },
    recordDate: { type: String, required: true } // yyyy-MM-dd
  },
  {
    versionKey: false
  }
);

SportRecordSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    return ret;
  }
});

export const SportRecord = mongoose.model('sportRecord', SportRecordSchema);

export const getSportRecords = (values: Record<string, any> = {}) => SportRecord.find(values);
export const getSportRecordById = (id: string) => SportRecord.findById(id);
export const createNewSportRecord = (values: Record<string, any>) => SportRecord.create(values);
export const deleteSportRecordById = (id: string) => SportRecord.findByIdAndDelete(id);
export const updateSportRecordById = (id: string, values: Record<string, any>) =>
  SportRecord.findByIdAndUpdate(id, values, { new: true, runValidators: true });
