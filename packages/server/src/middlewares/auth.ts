import {NextFunction, Request, Response} from "express";
import * as jwt from 'jsonwebtoken';
import {UnauthorizedError} from "../common";

const authenticate = async (
    token: string
) => {
    const secret = process.env.JWT_SECRET;
    // @ts-ignore
    return jwt.verify(token, secret, {algorithms: ['RS256']});
};

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers['x-access-token'];
    if (!token) throw new UnauthorizedError('Auth header required!');

    const payload = await authenticate(token as string)
        .catch(e => {
            throw new UnauthorizedError(e.message)
        });

    Object.assign(req, payload);
    next();
};

export interface AuthenticatedRequest extends Request {
    userid: string
}

