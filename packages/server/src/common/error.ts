export class BaseError extends Error {
    constructor(message: string) {
        super();
        this.message = message;
    }

    getHttpCode(): number {
        if (this instanceof BadRequestError) return 400;
        if (this instanceof UnauthorizedError) return 401;
        if (this instanceof NotFoundError) return 404;
        if (this instanceof ConflictError) return 409;
        return 500;
    }
}

export class BadRequestError extends BaseError {}
export class UnauthorizedError extends BaseError {}
export class NotFoundError extends BaseError {}
export class ConflictError extends BaseError {}

