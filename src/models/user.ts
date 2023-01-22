import {Document, model, Schema} from 'mongoose';

export interface UserInterface extends Document {
  username: string;
  name: string;
  email: string;
  reputation: number;
  password: string;
  created: Date;
}

const UserSchema = new Schema<UserInterface>({
  username: {
    type: String,
    unique: true,
    match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
    required: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    match: [/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, 'is invalid'],
    required: true,
  },
  reputation: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  password: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

export const User = model<UserInterface>('User', UserSchema);