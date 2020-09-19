import express, {NextFunction, Request, Response} from "express";
import { userService } from "../service";
import {body, validationResult} from "express-validator";

const router = express.Router();

const signupValidator = [
    body('email').isEmail(),
    body('password').isLength({ min: 5}),
    body('username').isString()
];

const loginValidator = [
    body('email').isEmail(),
    body('password').isLength({ min: 5})
];

router.post("/signup", signupValidator, async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json(errors.array());

    try {
        await userService.signup(req.body);
        res.sendStatus(200);
    } catch(e) {
        next(e);
    }
});

router.post("/login", loginValidator, async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json(errors.array());

    try {
        const accessToken = await userService.login(req.body);
        res.json({ accessToken });
    } catch (e) {
        next(e);
    }
});

export default router;
