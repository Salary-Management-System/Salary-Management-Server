import { NextFunction, Request, ErrorRequestHandler, Response } from "express";
import log from "../../logger/logger";
import { ErrorResponse } from "../config/config";

export const errorHandler = (error : Error, _ : Request, res : Response, next : NextFunction) : Omit<ErrorRequestHandler, 'next'> => {
    log.error(error.message);
    //@ts-ignore
    const response = res.error ? res.error : {
        code : 500,
        status : 'Internal System Error',
        msg : 'Something went wrong'
    } as ErrorResponse

    return res.status(response.code).json(response)
}