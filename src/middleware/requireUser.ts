import { NextFunction, Request, Response } from "express";

export const requireUser = (req : Request, res : Response, next : NextFunction) => {
    // @ts-ignore
    if(!req.user || !req.role) {
        return res.status(403).json({
            code : 403,
            status : 'Unauthorized'
        })
    }

    return next();
}