import {Document, HookNextFunction, model, Schema} from "mongoose";
import {validateEmail} from "../common";
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
    timestamps: true
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

const User = model<IUserDocument>("User", UserSchema);
export default User;



// 이메일 이상하면 에러
// 패스워드 해시 잘 되는지 확인
