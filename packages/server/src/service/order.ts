import {IOrder, IProduct, Order} from "../model";
import {BadRequestError} from "../common";

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
        throw new BadRequestError('billing error');

    const saved = await Order.create(order);
    return saved.toObject();
};

export const getOrders = async (
    user: string | undefined
) => {
    const orders = await Order.find({user}).exec();
    return orders.map(o => o.toObject());
};
