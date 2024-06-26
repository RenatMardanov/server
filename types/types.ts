import { Model, Types } from "mongoose";

export interface IUser {
    _id?: string;
    email: string;
    password: string;
    isActivated: boolean;
    activationLink: string;
}

export interface IItem {
    _id?: string;
    article: number;
    name: string;
    quantity: number;
    date: Date;
    pricePerUnit: number;
    sellerId: number;
    country: string;
}

export interface ITransaction {
    product: Types.ObjectId;
    quantity: number;
    date: Date;
    pricePerUnit: number;
    sellerId?: number;
    country?: string;
}
export type TUserModel = Model<IUser, {}, {}>;
export type TItemModel = Model<IItem, {}, {}>;
export type TTransModel = Model<ITransaction, {}, {}>;

export interface IToken {
    userId: Types.ObjectId;
    refreshToken: string;
}

export type DtoUserModel = Omit<IUser, "password" | "activationLink">;
