import express, {NextFunction, Request, Response} from "express";
import {body, validationResult} from "express-validator";
import {userService} from "../service";

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
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }


    try {
        await userService.signup(req.body);
        return res.sendStatus(200);
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
