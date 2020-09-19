import {Document, model, Schema, Types} from "mongoose";
import {DefaultToObjectOption} from "../common";

export interface IStatistic {
    totalPaid: number;
    user: Types.ObjectId;
}

export interface IStatisticDocument extends IStatistic, Document {}

export const StatisticSchema: Schema = new Schema({
    totalPaid: {
        type: Number,
        default: 0,
        min: 0
    },
    user: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true,
    toObject: DefaultToObjectOption
});

export const Statistic = model<IStatisticDocument>("Statistic", StatisticSchema);
