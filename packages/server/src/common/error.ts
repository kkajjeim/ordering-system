export class BaseError {
    message: string;
    name: string;

    constructor(message: string) {
        this.message = message;
        this.name = this.constructor.name;
    }

    getHttpCode(): number {
        if (this instanceof BadRequestError) return 400;
        if (this instanceof UnauthorizedError) return 401;
        if (this instanceof NotFoundError) return 404;
        if (this instanceof NotAcceptableError) return 406;
        if (this instanceof ConflictError) return 409;
        return 500;
    }
}

export class BadRequestError extends BaseError {}
export class UnauthorizedError extends BaseError {}
export class NotFoundError extends BaseError {}
export class NotAcceptableError extends BaseError {}
export class ConflictError extends BaseError {}


