import {Document, Schema} from "mongoose";

export interface IProduct {
    name: string;
    price: number;
    quantity: number;
}

export interface IProductDocument extends IProduct, Document {}

export const ProductSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        index: true,
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
}, { _id: false });
