import { NextFunction, Request, Response } from "express";
import { SuccessReponse } from "../config/config";
import { checkRole } from "../middleware/authorize";
import { Department } from "../model/department.model";

export const getAllDepartmentsHandler = [
    checkRole('Admin'),
    async (req : Request, res : Response, next : NextFunction) => {
        try {
            const departments = await Department.getAllDepartments();

            const response = {
                code : 200,
                status : 'OK',
                data : departments
            } as SuccessReponse<Department>
            return res.status(response.code).json(response);
        } catch (error) {
            next(error);
        }
    }
]

export const createDepartmentHandler = [
    checkRole('Admin'),
    async (req : Request, res : Response, next : NextFunction) => {
        try {
            const input = req.body;

            const record = new Department(input);
            await record.save();

            const response = {
                code : 200,
                status : 'OK',
                data : record
            } as SuccessReponse<Department>

            return res.status(response.code).json(response);
        } catch (error) {
            next(error);
        }
    }
]