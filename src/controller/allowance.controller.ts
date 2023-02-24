import { NextFunction, Request, Response } from "express";
import { SuccessReponse } from "../config/config";
import { checkRole } from "../middleware/authorize";
import { Allowance } from "../model/allowance.model";


export const getAllAllowancesHandler = [
    checkRole('Admin'),
    async (req : Request, res : Response, next : NextFunction) => {
        try {
            const allowances = await Allowance.findAll();

            const response = {
                code : 200,
                status : 'OK',
                data : allowances
            } as SuccessReponse<Allowance>
            return res.status(response.code).json(response);
        } catch (error) {
            next(error);
        }
    }
]

export const createAllowanceHandler = [
    checkRole('Admin'),
    async (req : Request, res : Response, next : NextFunction) => {
        try {
            const input = req.body;

            const record = new Allowance(input);
            await record.save();

            const response = {
                code : 200,
                status : 'OK',
                data : record
            } as SuccessReponse<Allowance>

            return res.status(response.code).json(response);
        } catch (error) {
            next(error);
        }
    }
]