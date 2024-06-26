import { Schema, model } from "mongoose";
import { IItem, TItemModel } from "../types/types";

const ItemSchema = new Schema<IItem, TItemModel, {}>({
    article: { type: Number, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    date: { type: Date, required: true },
    pricePerUnit: { type: Number, required: true },
    sellerId: { type: Number, required: false },
    country: { type: String, required: false },
});

export const itemModel = model<IItem, TItemModel>("Item", ItemSchema);
