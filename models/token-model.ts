import { Schema, model } from "mongoose";
import { IToken } from "../types/types";

const TokenSchema = new Schema<IToken>({
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    refreshToken: { type: String, required: true },
});

export const tokenModel = model("Token", TokenSchema);
