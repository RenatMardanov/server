import { Schema, model, Types } from "mongoose";

interface IProduct {
    article: number;
    name: string;
}

const ProductSchema = new Schema<IProduct>({
    article: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
});

export const productModel = model<IProduct>("Product", ProductSchema);
