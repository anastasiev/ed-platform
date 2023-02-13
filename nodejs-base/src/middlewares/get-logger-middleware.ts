import {CustomLogger} from "../logger/CustomLogger";
import {Container} from "typedi";
import {NextFunction, Request, Response} from "express";

export const getLoggerMiddleware = () => {
    const logger = Container.get(CustomLogger);
    return async (req: Request, res: Response, next: NextFunction) => {
        next();
        logger.info(`HTTP ${req.method} ${req.url} ${res.statusCode}`);
    }
}