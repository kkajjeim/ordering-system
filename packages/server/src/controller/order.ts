import express, {NextFunction, Request, Response} from "express";
import {body, validationResult} from "express-validator";
import {authHandler} from "../middleware";
import {orderService} from "../service";
import {orderEventEmitter} from "../event";
import {OrderAction} from "../common";

const router = express.Router();

const orderValidator = [
    body('products').isArray(),
    body('total').isInt(),
    body('subtotal').isInt(),
    body('fees').isInt(),
];

const cancelValidator = [
    body('orderid').isString()
];

router.post("/order", authHandler, orderValidator, async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json(errors.array());

    try {
        const order = await orderService.createOrder({
            ...req.body,
            user: req._id
        });
        res.json({ order });

        orderEventEmitter.afterOrderProcess(
            order,
            OrderAction.Order
        );
    } catch(e) {
        next(e);
    }
});

router.post("/cancel", authHandler, cancelValidator, async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json(errors.array());

    try {
        const order = await orderService.cancelOrder(
            req.body.orderid
        );
        res.json({ order });

        orderEventEmitter.afterOrderProcess(
            order,
            OrderAction.Cancel
        );
    } catch(e) {
        next(e);
    }
});

router.get("/orders", authHandler, async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const orders = await orderService.getOrders(
            req._id
        );
        res.json({ orders });
    } catch (e) {
        next(e);
    }
});

export default router;
