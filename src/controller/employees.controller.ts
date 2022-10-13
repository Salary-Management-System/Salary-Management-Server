import { Request, Response } from "express";
import { validateInput } from "../middleware/validateReq";
import { schema_create } from "../schema/employee.schema";
import { checkRole } from "../middleware/authorize";
import { v4 as generateUUID } from "uuid";
import Employee, { IEmployee } from "../model/employee.model";

export const createEmployeesHandler = [
    checkRole('HR', 'Admin'),
    validateInput(schema_create),
    async (req : Request, res : Response) => {
        try {
            let { address, phone, firstname, lastname, payment_type } = req.body;
            const employee_id = generateUUID();
            const hire_date = new Date();

            const body = {
                employee_id,
                address,
                phone,
                lastname,
                firstname,
                payment_type,
                hire_date
            } as Required<IEmployee>;

            const employee = new Employee(body);
            await employee.save();
    
            return res.status(200).json({
                code : 200,
                status : 'Successfully',
                data : employee
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                code : 500,
                status : 'Internal Server Error',
                msg : (error as Error).message,
            })
        }
    }
]