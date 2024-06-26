import { Schema, model, Types } from "mongoose";
import { ITransaction, TTransModel } from "../types/types";

const TransactionSchema = new Schema<ITransaction, TTransModel, {}>({
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    date: { type: Date, required: true },
    pricePerUnit: { type: Number, required: true },
    sellerId: { type: Number },
    country: { type: String },
});

export const transactionModel = model<ITransaction, TTransModel>("Transaction", TransactionSchema);
