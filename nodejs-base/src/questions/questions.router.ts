import express from "express";
import asyncHandler from "express-async-handler";
import {IAuthenticatedRequest} from "../types/IAuthenticatedRequest";
import {Container} from "typedi";
import {QuestionsService} from "./questions.service";
import {validatePayload} from "../validation";
import * as Joi from "joi";

const router = express.Router();

const questionsService = Container.get(QuestionsService)

router.get('/filters', asyncHandler(async (req: express.Request, res) => {
    res.status(200).send(questionsService.getFilters());
}));

router.get('/', asyncHandler(async (req: express.Request, res) => {
    const {topic, chapter} = validatePayload(
        {topic: req.query.topic, chapter: req.query.chapter},
        Joi.object({
            topic: Joi.string().max(100),
            chapter: Joi.string().max(100),
        })
    );
    const questionsList = questionsService.getQuestions(topic, chapter);
    res.status(200).send(questionsList);
}));

router.post('/answer', asyncHandler(async (req: express.Request, res) => {
    const {question, answer} = validatePayload(
        req.body,
        Joi.object({
            question: Joi.string().max(500),
            answer: Joi.string().max(1).lowercase(),
        })
    );
    const correct = questionsService.checkAnswer(question, answer);
    res.status(200).send({correct});
}));

export default router;