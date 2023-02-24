import { NextFunction, Request, Response } from "express";
import { validateInput } from "../middleware/validateReq";
import { schema_create } from "../schema/employee.schema";
import { checkRole } from "../middleware/authorize";
import Employee from "../model/employee.model";
import employeeService from "../services/employee.service";
import { ErrorResponse, SuccessReponse } from "../config/config";

export const createEmployeesHandler = [
    checkRole('HR', 'Admin'),
    validateInput(schema_create),
    async (req : Request, res : Response, next : NextFunction) => {
        try {
            const reponseFromService = await employeeService.createEmployee(req.body);
            if(reponseFromService && reponseFromService instanceof Error) {
                const errorResponse = {
                    code : 403,
                    status : 'Forbidden',
                    msg : reponseFromService.message
                } as ErrorResponse;

                // @ts-ignore
                res.error = errorResponse;
                return next(reponseFromService);
            }
    
            const employee = reponseFromService;
            const response = {
                code : 200,
                status : 'Successfully',
                data : employee
            } as SuccessReponse<Employee>;

            return res.status(response.code).json(response)
        } catch (error) {
            // This place catches errors from functions of the model
            // Pass the error to the middleware which have error handle responsibility
            next(error);
        }
    }
]


export const getAllEmployeesHandler = [
    checkRole('Admin'),
    async (req : Request, res : Response, next : NextFunction) => {
        try {
            let data = await Employee.findAll();
            let result : any[];
            if(data) {
                result = data.map(async rec => {
                    if(rec.job_id) {
                        const record = new Employee(rec);
                        // @ts-ignore
                        const job = await record.getJob();
                        return {...record, job_function : job};
                    } else {
                        return rec;
                    }
                })
                result = await Promise.all(result);
                const response = {
                    code : 200,
                    status : 'OK',
                    data : result
                } as SuccessReponse<Employee>
                return res.status(response.code).json(response);
            }
        } catch (error) {
            next(error);
        }
    }
]