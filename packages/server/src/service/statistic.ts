import {OrderAction} from "../common";
import {IOrderDocument, Statistic} from "../model";

export const updateStatistic = async (
    order: IOrderDocument,
    action: OrderAction
): Promise<void> => {
    let paid: number = 0;

    if (action === OrderAction.Order)
        paid = order.total;
    else if (action === OrderAction.Cancel)
        paid = order.total * -1;

    const statistic = await Statistic.findOneAndUpdate(
        { user: order.user },
        { $inc: { totalPaid: paid }},
        { upsert: true, new: true }
    ).exec();

    return statistic.toObject()
};
