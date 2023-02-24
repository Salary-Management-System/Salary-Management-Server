import { NextFunction, Request, Response } from "express";
import { SuccessReponse } from "../config/config";
import { checkRole } from "../middleware/authorize";
import { Bonus } from "../model/bonus.model";

export const getAllBonusesHandler = [
    checkRole('Admin'),
    async (req : Request, res : Response, next : NextFunction) => {
        try {
            const bonuses = await Bonus.findAll();

            const response = {
                code : 200,
                status : 'OK',
                data : bonuses
            } as SuccessReponse<Bonus>
            return res.status(response.code).json(response);
        } catch (error) {
            next(error);
        }
    }
]

export const createBonusHandler = [
    checkRole('Admin'),
    async (req : Request, res : Response, next : NextFunction) => {
        try {
            const input = req.body;
            
            const record = new Bonus(input);
            await record.save();

            const response = {
                code : 200,
                status : 'OK',
                data : record
            } as SuccessReponse<Bonus>

            return res.status(response.code).json(response);
        } catch (error) {
            next(error);
        }
    }
]