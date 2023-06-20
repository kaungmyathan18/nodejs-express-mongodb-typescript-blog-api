import bcryptjs from 'bcryptjs';
import { model, Schema } from 'mongoose';

export interface IUser {
  firstName: string;
  lastName: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  fullName?: string;
  id: string;
}

const UserSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    username: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id; // Exclude _id field
      },
    },
  },
);

UserSchema.virtual('fullName').get(function () {
  return this.firstName + ' ' + this.lastName;
});

UserSchema.pre('save', async function () {
  if (this.password) {
    this.password = await bcryptjs.hash(this.password, 10);
  }
});

export const UserModel = model('User', UserSchema);
