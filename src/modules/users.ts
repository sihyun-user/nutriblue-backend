import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    image: { type: String, default: '' },
    gender: { type: String, default: '1', enum: ['0', '1'], required: true },
    birthday: { type: String, default: '2000-01-01', required: true },
    height: { type: String, default: '0', required: true },
    weight: { type: String, default: '0', required: true },
    sportLevel: {
      type: String,
      default: 'underSport',
      enum: ['underSport', 'normalSport', 'moderateSport', 'severeSport', 'overSport'],
      required: true
    },
    fitnessLevel: {
      type: String,
      default: 'keepWeight',
      enum: ['loseFat', 'gentleLoseFat', 'keepWeight', 'gentleAddFat', 'addFat'],
      required: true
    },
    bio: { type: String, default: '', maxlength: 100 },
    createdAt: { type: Date, default: Date.now, select: false }
  },
  {
    versionKey: false
  }
);

export const Users = mongoose.model('User', UserSchema);

export const getUsers = () => Users.find();
export const getUserById = (id: string) => Users.findById(id);
export const getUserByEmail = (email: string) => Users.findOne({ email });
export const getUserByUsername = (username: string) => Users.findOne({ username });
export const createUser = (values: Record<string, any>) => Users.create(values);
export const deleteUserById = (id: string) => Users.findByIdAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) =>
  Users.findByIdAndUpdate(id, values);
