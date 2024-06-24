import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    image: { type: String, default: '' },
    gender: { type: Number, default: 1, enum: [0, 1], required: true },
    birthday: { type: String, default: '2000-01-01', required: true },
    height: { type: Number, default: 0, required: true },
    weight: { type: Number, default: 0, required: true },
    sport_level: {
      type: String,
      default: 'underSport',
      enum: ['underSport', 'normalSport', 'moderateSport', 'severeSport', 'overSport'],
      required: true
    },
    fitness_level: {
      type: String,
      default: 'keepWeight',
      enum: ['loseFat', 'gentleLoseFat', 'keepWeight', 'gentleAddFat', 'addFat'],
      required: true
    },
    bio: { type: String, default: '', maxlength: 100 },
    bookmark_collects: [{ type: String, ref: 'Food' }],
    food_collects: [{ type: String, ref: 'Food' }],
    refresh_token: { type: String, select: false },
    createdAt: { type: Date, default: Date.now, select: false }
  },
  {
    versionKey: false
  }
);

UserSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    return ret;
  }
});

export const User = mongoose.model('User', UserSchema);

export const getUserById = (id: string) => User.findById(id);
export const getUserByEmail = (email: string) => User.findOne({ email });
export const createUser = (values: Record<string, any>) => User.create(values);
export const deleteUserById = (id: string) => User.findByIdAndDelete(id);
export const updateUserById = (id: string, values: Record<string, any>) =>
  User.findByIdAndUpdate(id, values);
