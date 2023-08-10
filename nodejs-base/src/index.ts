import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import {AuthRouter} from "./auth";
import {QuestionRouter} from "./questions";
import {errorHandler} from "./middlewares/error-handler";
import {getLoggerMiddleware} from "./middlewares/get-logger-middleware";
import {HealthRouter} from "./health";
import {Container} from "typedi";
import ConfigReader from "./config/config.reader";
import {jwtVerificationMiddleware} from "./auth/jwt.middlware";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const mainRouter = express.Router();
const { SERVICE_PORT } = Container.get(ConfigReader).getAppConfig();
// add routers here
mainRouter.use(AuthRouter);
mainRouter.use('/questions', jwtVerificationMiddleware, QuestionRouter);
mainRouter.use(HealthRouter);

app.use(getLoggerMiddleware());
app.use('/api', mainRouter);
app.use(errorHandler);
app.listen(SERVICE_PORT, function() {
    console.log('Express server listening on port ' + SERVICE_PORT);
});

