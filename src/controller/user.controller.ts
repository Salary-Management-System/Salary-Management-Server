import { genSalt, hash } from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { checkRole } from "../middleware/authorize";
import { validateInput } from "../middleware/validateReq";
import { IUser, User } from "../model/user.model";
import { schema_create } from "../schema/user.schema";
import { v4 as generateUUID } from "uuid";
import Employee from "../model/employee.model";
import { ErrorResponse, SuccessReponse } from "../config/config";

export const createUserHandler = [
    checkRole('Manager', 'HR', 'Admin'),
    validateInput(schema_create),
    async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { username, password, employee_id } = req.body;

            const user_id = generateUUID();
            const salt = await genSalt(10)
            const hashPwd = await hash(password, salt)
    
            if(employee_id && await Employee.isExist(employee_id)) {
                return res.status(403).json({
                    code : 403,
                    status : 'Forbidden',
                    msg : 'Invalid or not found employee code'
                } as ErrorResponse) 
            }
    
            const body = {
                user_id,
                username,
                password : hashPwd,
                created_at : new Date(),
                employee_id : employee_id ? employee_id : null
            } as IUser;
    
            const user = new User(body);
            await user.save();

            const response = {
                code : 200,
                status : 'OK',
                data : user
            } as SuccessReponse<User>

            return res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }
]

export const getAllUsersHandler = [
    checkRole('Manager', 'HR', 'Admin'),
    async ( _ : Request, res : Response, next : NextFunction) => {
        try {
            const listUsers = await User.findAllUsers();

            const response = {
                code : 200,
                status : 'OK',
                data : listUsers
            } as SuccessReponse<User>

            return res.status(response.code).json(response)
        } catch (error) {
            next(error);
        }
    }
]