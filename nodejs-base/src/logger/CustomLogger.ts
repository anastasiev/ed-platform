import {Service} from "typedi";
import {transports, format, createLogger, Logger} from 'winston';

@Service()
export class CustomLogger {
    private logger: Logger;

    constructor() {
        this.logger = createLogger({
            transports: [
                new transports.Console(),
                new transports.File({filename: 'backend.log'})
            ],
            format: format.combine(
                format.splat(),
                format.simple()
            )
        });
    }

    public info(message: string): void {
        this.logger.log({
            level: 'info',
            message
        })
    }

    public error(message: string): void {
        this.logger.log({
            level: 'error',
            message
        })
    }
}