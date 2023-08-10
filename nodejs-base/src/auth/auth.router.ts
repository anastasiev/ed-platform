import express from "express";
import {Container} from "typedi";
import {AuthService} from "./auth.service";
import asyncHandler from "express-async-handler";
import {validatePayload} from "../validation";
import * as Joi from "joi";
import {CustomError} from "../errors";
import {JWT_SECRET} from "./auth.constants";
import {sign} from "jsonwebtoken";

const router = express.Router();
const authService = Container.get(AuthService);

router.post('/login', asyncHandler(async (req, res) => {
    validatePayload(
        req.body,
        Joi.object({
            email: Joi.string().max(100),
            password: Joi.string().max(100),
        })
    );
    const {email, password} = req.body;

    const user = authService.getUserByEmail(email);

    if (!user) {
        throw new CustomError(401, 'Wrong password')
    }

    let isPasswordValid = await authService.checkPassword(email, password);

    if (!isPasswordValid) {
        throw new CustomError(401, 'Wrong password');
    }
    const { name } = user;
    const token = sign({ user: {email, name} }, JWT_SECRET);
    res.status(200).send({token, user: {email, name} });
}));

router.post('/register', asyncHandler(async (req, res) => {
    validatePayload(
        req.body,
        Joi.object({
            email: Joi.string().max(100),
            password: Joi.string().max(100),
            name: Joi.string().max(100),
        })
    );
    const {email, password, name} = req.body;
    const existedUser = authService.getUserByEmail(email);
    if (existedUser) {
        throw new CustomError(409, `User with email ${email} already exist`);
    }
    await authService.saveUser(email, password, name);
    const token = sign({ user: {email, name} }, JWT_SECRET);
    res.status(200).send({token, user: {email, name} });
}));

export default router;