import mongoose, { Schema, Document } from "mongoose";

export interface IAdmin extends Document {
  username: string;
  email: string;
  password: string;
}

const adminScheme: Schema<IAdmin> = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Admin =
  mongoose.models.Admin || mongoose.model<IAdmin>("Admin", adminScheme);

export default Admin;
