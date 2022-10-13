import { AnySchema } from "yup";
import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from "../config/config";

export const validateInput = (schema : AnySchema) => async (req : Request, res : Response, next : NextFunction) => {
    try {
        await schema.validate({
            body : req.body,
            query : req.query,
            params : req.params
        })

        return next();
    } catch (error) {
        return res.status(400).json({
            code : 400,
            status : 'Bad Request',
            msg : (error as Error).message
        } as ErrorResponse)
    }
}