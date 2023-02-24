import { NextFunction, Request, Response } from "express";
import { checkRole } from "../middleware/authorize";
import { validateInput } from "../middleware/validateReq";
import { User } from "../model/user.model";
import { schema_create } from "../schema/user.schema";

import { ErrorResponse, SuccessReponse } from "../config/config";
import userService from "../services/user.service";

export const createUserHandler = [
    checkRole('Manager', 'HR', 'Admin'),
    validateInput(schema_create),
    async (req : Request, res : Response, next : NextFunction) => {
        try {
            const reponseFromService = await userService.createUser(req.body);
            if(reponseFromService && (reponseFromService instanceof Error) ) {
                const errorResponse = {
                    code : 403,
                    status : 'Forbidden',
                    msg : reponseFromService.message
                } as ErrorResponse;

                // @ts-ignore
                res.error = errorResponse;
                return next(reponseFromService);
            }

            const user = reponseFromService;
            const response = {
                code : 200,
                status : 'OK',
                data : user
            } as SuccessReponse<User>

            return res.status(response.code).json(response);
        } catch (error) {
            next(error);
        }
    }
]

export const getAllUsersHandler = [
    checkRole('Manager', 'HR', 'Admin'),
    async ( req : Request, res : Response, next : NextFunction) => {
        try {
            const { username } = req.params;
            const listUsers = await userService.getAllUsers();
            const result = listUsers.filter(user => {
                return user.username !== username
            })
            const response = {
                code : 200,
                status : 'OK',
                data : result
            } as SuccessReponse<User>

            return res.status(response.code).json(response)
        } catch (error) {
            next(error);
        }
    }
]