import { NextFunction, Request, Response } from "express";
import { SuccessReponse } from "../config/config";
import { checkRole } from "../middleware/authorize";
import { IPayrollType, PayrollType } from "../model/payroll_type.model";

export const createPayrollTypeHandler = [
    checkRole('Admin'),
    async (req : Request, res : Response, next : NextFunction) => {
        try {
            const body = req.body as IPayrollType;
            const record = new PayrollType(body);
            await record.save();
            const response = {
                code : 200,
                status : 'OK',
                data : record
            } as SuccessReponse<IPayrollType>
            return res.status(response.code).json(response);
        } catch (error) {
            next(error);
        }
    }
]

export const getAllPayrollType = [
    checkRole('Admin'),
    async (_:Request, res : Response, next : NextFunction) => {
        try {
            const data = await PayrollType.findAll();

            const response = {
                code : 200,
                status : 'OK',
                data : data
            } as SuccessReponse<IPayrollType>
            return res.status(response.code).json(response);
        } catch (error) {
            next(error);
        }
    }
]