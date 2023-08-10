import {IUser} from "./IUser";

export interface IUserInfo extends IUser {
    passwordHash: string;
}