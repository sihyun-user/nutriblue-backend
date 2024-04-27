import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    authentication: {
      password: { type: String, select: false },
      salt: { type: String, select: false },
      sessionToken: { type: String, select: false }
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

export const Users = mongoose.model('User', UserSchema);

export const getUsers = () => Users.find();
export const getUserByEmail = (email: string) => Users.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) =>
  Users.findOne({
    'authentication.sessionToken': sessionToken
  });
export const getUserById = (id: string) => Users.findById(id);
export const createUser = (values: Record<string, any>) => Users.create(values);
export const deleteUserById = (id: string) => Users.findByIdAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) =>
  Users.findByIdAndUpdate(id, values);
