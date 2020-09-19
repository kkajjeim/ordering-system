import {Document, model, Schema, Types} from "mongoose";

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
    timestamps: true
});

const Statistic = model<IStatisticDocument>("Statistic", StatisticSchema);
export default Statistic;
