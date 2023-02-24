import { NextFunction, Request, Response } from "express";
import { SuccessReponse } from "../config/config";
import { checkRole } from "../middleware/authorize";
import { ILevel, Level } from "../model/level.model";

export const getAllLevelsHandler = [
    checkRole('Admin'),
   async (_ : Request, res : Response, next : NextFunction) => {
        try {
            const levels = await Level.getAllLevels();

            const response = {
                code : 200,
                status : 'OK',
                data : levels
            } as SuccessReponse<ILevel>;

            return res.status(response.code).json(response);
        } catch (error) {
            next(error);
        }
   }
]

export const createLevelHandler = [
    checkRole('Admin'),
    async (req : Request, res : Response, next : NextFunction) => {
        try {
            const body : ILevel = req.body;
            const record = new Level(body);
            await record.save();

            const response = {
                code : 200,
                status : 'OK',
                data : record
            } as SuccessReponse<ILevel>;
            return res.status(response.code).json(response);
        } catch (error) {
            next(error);
        }
   }
]