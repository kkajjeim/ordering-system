import express, {NextFunction, Request, Response} from "express";
import {orderService } from "../service";
import {body, validationResult} from "express-validator";
import {auth} from "../middlewares";

const router = express.Router();

const postOrderValidator = [
    body('products').isArray(),
    body('total').isInt(),
    body('subtotal').isInt(),
    body('fees').isInt(),
];

router.post("/order", auth, postOrderValidator, async (
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
    } catch(e) {
        next(e);
    }
});

router.get("/orders", auth, async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const orders = await orderService.getOrders(req._id);
        res.json({ orders });
    } catch (e) {
        next(e);
    }
});

export default router;
