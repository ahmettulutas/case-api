import mongoose from "mongoose";
import { NextRequest } from "next/server";

export type UserRoles = "admin" | "user";
export type NewUserRequest = NextRequest & {
  json(): NewUserRequest | PromiseLike<NewUserRequest>;
  email:string;
  code:string;
}
export type UserType = {
  email:string;
  code:string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  expireDate: string;
  role: UserRoles
}

const { Schema } = mongoose;
const userSchema = new Schema<UserType>(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    code: {
      type: String,
      required: true
    },
    expireDate: {
      type: String,
      required: true
    },
    role: { type: String, enum: ["admin", "user"], default: "user" }
  },
  { timestamps: true }
);

export default mongoose.models?.Users || mongoose.model("Users", userSchema);