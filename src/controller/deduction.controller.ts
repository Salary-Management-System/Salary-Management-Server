import { Response, Request, NextFunction } from 'express';
import { SuccessReponse } from '../config/config';
import { checkRole } from '../middleware/authorize';
import { Deduction } from '../model/deduction.model';

const permission = checkRole('Admin');

export const createDeductionHandler = [
    permission,
    async (req : Request, res : Response, next : NextFunction) => {
        try {
            const input = req.body;
            
            const record = new Deduction(input);
            await record.save();

            const response = {
                code : 200,
                status : 'OK',
                data : record
            } as SuccessReponse<Deduction>

            return res.status(response.code).json(response);
        } catch (error) {
            next(error);
        }
    }
]

export const getAllDeductionsHandler = [
    permission,
    async (req : Request, res : Response, next : NextFunction) => {
        try {
            const deductions = await Deduction.findAll();

            const response = {
                code : 200,
                status : 'OK',
                data : deductions
            } as SuccessReponse<Deduction>
            return res.status(response.code).json(response);
        } catch (error) {
            next(error);
        }
    }
]