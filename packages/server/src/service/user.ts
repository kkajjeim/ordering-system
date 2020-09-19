import * as jwt from 'jsonwebtoken';
import {v4 as uuidv4} from 'uuid';
import {IUser, User} from "../model/user";
import {ConflictError, NotFoundError, UnauthorizedError} from "../common";
import {jwtSecret} from "../middleware";

export const signup = async (user: IUser) => {
    return await User.create(user)
        .catch(e => {
            // email duplication issue
            if (e.code === 11000)
                throw new ConflictError('email already exists');
            throw e;
        });
};

export const login = async ({email, password}: IUser) => {
    const user = await User.findOne({email}).exec();

    if(!user)
        throw new NotFoundError('invalid email');

    const isValidPassword = await user.comparePassword(password);

    if(!isValidPassword)
        throw new UnauthorizedError('invalid password');

    const now = new Date();
    const payload = {
        _id: user._id,
        email: user.email,
        iat: now.getTime(),
        exp: now.setDate(now.getDate() + 1),
        jti: uuidv4()
    };

    return jwt.sign(payload, jwtSecret);
};
