import 'dotenv/config';
import {NextFunction, Request, Response} from "express";
import * as jwt from 'jsonwebtoken';
import {UnauthorizedError} from "../common";

export const jwtSecret = process.env.JWT_SECRET || "";

const authenticate = async (
    token: string
) => {
    // @ts-ignore
    return jwt.verify(token, jwtSecret);
};

export const auth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers['x-access-token'];
    if (!token)
        return res.status(401).send('Auth header required!');

    const payload = await authenticate(token as string)
        .catch(e => {
            return res.status(401).send('invalid token');
        });

    Object.assign(req, payload);
    next();
};

declare global {
    namespace Express {
        interface Request {
            _id?: string;
            email?: string;
        }
    }
}
