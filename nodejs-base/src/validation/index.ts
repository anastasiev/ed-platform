import * as Joi from 'joi';
import {CustomError} from "../errors";

export const validatePayload = (obj: object, schema: Joi.Schema): any => {
    const result = schema.validate(obj, {
        allowUnknown: true,
        presence: 'required',
        abortEarly: false,
        skipFunctions: true,
        stripUnknown: true,
        convert: true
    });
    if(result.error) {
        throw new CustomError(400, result.error.message)
    }
    return result.value
};