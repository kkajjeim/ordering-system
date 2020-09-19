import {Document, HookNextFunction, model, Schema} from "mongoose";
import {DefaultToObjectOption, validateEmail} from "../common";
import * as bcrypt from "bcrypt";

export interface IUser {
    email: string;
    password: string;
    username?: string;
}

export interface IUserDocument extends IUser, Document {
    comparePassword(candidatePassword: string): Promise<boolean>
}

export const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
        validate: { validator: validateEmail }
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    toObject: DefaultToObjectOption
});

UserSchema.pre<IUserDocument>("save", async function (
    next: HookNextFunction
) {
    if (!this.isModified("password"))
        return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.methods.comparePassword = async function(
    candidatePassword: string
): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
};

export const User = model<IUserDocument>("User", UserSchema);
