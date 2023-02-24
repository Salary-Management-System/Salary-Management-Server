import { NextFunction, Request, Response } from "express";
import { SuccessReponse } from "../config/config";
import { checkRole } from "../middleware/authorize";
import { IJobFunction, JobFunction } from "../model/job_function.model";
import { v4 as generateID } from "uuid";

export const getAllJobHandler = [
    checkRole('Admin'),
    async (req : Request, res : Response, next : NextFunction) => {
        try {
            let data = await JobFunction.getAllJob();
            console.log(data)
            const response = {
                code : 200,
                status : 'OK',
                data : data
            } as SuccessReponse<IJobFunction>;
            return res.status(response.code).json(response);
        } catch (error) {
            next(error);
        }
   }
]

export const createJobHandler = [
    checkRole('Admin'),
    async (req : Request, res : Response, next : NextFunction) => {
        try {
            const body : IJobFunction = req.body;

            let record = new JobFunction(body);
            const idGenerate = generateID()
            record['job_function_id'] = idGenerate;
            await record.save();

            const response = {
                code : 200,
                status : 'OK',
                data : record
            } as SuccessReponse<IJobFunction>
            return res.status(response.code).json(response);
        } catch (error) {
            next(error);
        }
    }
]