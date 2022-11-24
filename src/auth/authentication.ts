import { compare } from "bcrypt";
import { Request, Response } from "express"
import { sign, SignOptions } from "jsonwebtoken";
import { User, UserNest } from "../model/user.model"
import { config, DotenvConfigOptions } from "dotenv";
import path from "path";
import { validateInput } from "../middleware/validateReq";
import { schema_authenticate } from "../schema/user.schema";


const envOption = {
    path : path.join(__dirname, "../../.env")
} as DotenvConfigOptions

config(envOption);

export const authentication = [
    validateInput(schema_authenticate),
    async (req : Request, res : Response) => {
        const { username, password } = req.body
        // Get User from DB
        const foundedUser = await User.findByUsername(username, true);
    
        if(!foundedUser) return res.status(404).json({
            code : 404,
            status : 'No content',
            msg : 'User not found'
        })
    
        // Check password
        const matchPassword = await compare(password, foundedUser.password);
    
        if(!matchPassword) return res.status(403).json({
            code : 403,
            status : 'Fobbiden',
            msg : 'Wrong password'
        });
    
        // Create Access Token
        // @ts-ignore
        const accessToken = sign(foundedUser, process.env.PRIVATE_KEY, { expiresIn : '20s' });
        
        // Create Refresh Token
        // @ts-ignore
        const refreshToken = sign(foundedUser, process.env.PRIVATE_KEY, { expiresIn : '7d' })
    
        // Save refresh token to cookie
        res.cookie('refreshToken', refreshToken, { httpOnly : true, maxAge : 60 * 1000 * 60 * 24 * 7 });

        const roles = await User.getAllRoles(foundedUser.user_id);
    
        return res.status(200).json({
            code : 200,
            status : 'OK',
            data : {
                accessToken,
                refreshToken,
                user : {...foundedUser, roles : roles} as UserNest
            }
        })
    }
]