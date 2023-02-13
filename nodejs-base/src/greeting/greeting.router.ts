import express from "express";
import * as Joi from 'joi';
import asyncHandler from "express-async-handler";
import {GreetingService} from "./greeting.service";
import {Container} from "typedi";
import {validatePayload} from "../validation";

const router = express.Router();
const greetingService = Container.get(GreetingService);

router.get('/greeting', asyncHandler(async (req, res) => {
    validatePayload(
        {name: req.query.name},
        Joi.object({
            name: Joi.string().optional()
        })
    )
    const responseBody = greetingService.getGreetingContent(req.query.name as string);
    res.status(200).send(responseBody);
}));

export default router;
