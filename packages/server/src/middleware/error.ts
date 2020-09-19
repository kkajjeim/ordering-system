import {NextFunction, Request, Response} from "express";
import {BaseError} from "../common";

export const errorHanlder = (
    e: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (e instanceof BaseError) {
        return res.status(e.getHttpCode()).json({
            status: 'error',
            message: e.message
        })
    }
    return res.status(500).json({
        status: 'error',
        message: e.message
    });
};
