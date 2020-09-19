import {Document, model, Schema, Types} from "mongoose";
import {IProduct, ProductSchema} from "./product";
import {DefaultToObjectOption} from "../common";

export interface IOrder {
    products: IProduct[];
    total: number;
    subtotal: number;
    fees: number;
    user: Types.ObjectId;
    canceledAt: Date | null;
}

export interface IOrderDocument extends IOrder, Document {}

export const OrderSchema: Schema = new Schema({
    products: {
        type: [ProductSchema],
        default: [],
    },
    total: {
        type: Number,
        required: true,
        min: 0
    },
    subtotal: {
        type: Number,
        required: true,
        min: 0
    },
    fees: {
        type: Number,
        required: true,
        min: 0
    },
    user: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },
    canceledAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true,
    toObject: DefaultToObjectOption
});

export const Order = model<IOrderDocument>("Order", OrderSchema);
