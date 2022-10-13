import { NextFunction, Request, Response } from "express"
export const checkRole = (...roles : string[]) => async (req : Request, res : Response, next : NextFunction) => {
    {
        // @ts-ignore
        let ROLE = req.role as string[];
        // Check list roles of the user whether they are in required roles for access
        if(roles.some(roleReq => ROLE.some(role => role === roleReq))) {
            return next()
        } else {
            return res.status(403).json({
                code : 403,
                status : 'Forbidden',
                msg : "User don't have permission"
            })
        }
    }
}