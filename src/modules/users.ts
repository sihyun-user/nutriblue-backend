import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    createdAt: { type: Date, default: Date.now, select: false }
  },
  {
    versionKey: false
  }
);

export const Users = mongoose.model('User', UserSchema);

export const getUsers = () => Users.find();
export const getUserByEmail = (email: string) => Users.findOne({ email });
export const getUserById = (id: string) => Users.findById(id);
export const createUser = (values: Record<string, any>) => Users.create(values);
export const deleteUserById = (id: string) => Users.findByIdAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) =>
  Users.findByIdAndUpdate(id, values);
