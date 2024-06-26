import { Schema, model } from "mongoose";
import { IUser, TUserModel } from "../types/types";

const UserSchema = new Schema<IUser, TUserModel, {}>({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String },
});

export const userModel = model<IUser, TUserModel>("User", UserSchema);
