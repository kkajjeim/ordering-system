import {IOrder, IProduct, Order} from "../model";
import {NotAcceptableError} from "../common";

const _checkBill = (
    products: IProduct[],
    total: number,
    subtotal: number,
    fees: number
): boolean => {
    let sum = 0;
    products.forEach(p => {
        sum += (p.price * p.quantity)
    });

    const correctSubtotal = sum === subtotal;
    const correctTotal = sum + fees === total;
    return correctSubtotal && correctTotal;
};

export const createOrder = async (
    order: IOrder
) => {
    const isCorrect = _checkBill(
        order.products,
        order.total,
        order.subtotal,
        order.fees
    );

    if (!isCorrect)
        throw new NotAcceptableError('billing error');

    const saved = await Order.create(order);
    return saved.toObject();
};

export const getOrders = async (
    user: string | undefined
) => {
    const orders = await Order.find({user}).exec();
    return orders.map(o => o.toObject());
};

export const cancelOrder = async (
    orderid: string
) => {
    const now = new Date();
    const canceled = await Order.findOneAndUpdate(
        { _id: orderid, canceledAt: null},
        { canceledAt: now },
        { new: true }
    ).exec();

    if (!canceled)
        throw new NotAcceptableError('no order to cancel');

    return canceled.toObject();
};
