import {Request, Response, NextFunction} from "express";
import {CustomError} from "../errors";
import {CustomLogger} from "../logger/CustomLogger";
import {Container} from "typedi";

const logger = Container.get(CustomLogger);
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message);
    if (err instanceof CustomError) {
        res.status(err.code).send({message: err.message});
    } else {
        res.status(500).send({message: `Unexpected error: ${err.message}`});
    }
}