import {Request} from "express";
import {IUser} from "../auth/types/IUser";

export interface IAuthenticatedRequest extends Request {
    currentUser: IUser;
}