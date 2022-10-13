import { config } from "dotenv";
import { verify, SignOptions, sign } from "jsonwebtoken"

config();
const PRIVATE_KEY = process.env.PRIVATE_KEY as string;

export const encode = (object : Object, option? : SignOptions | undefined) => {
    return sign(object, PRIVATE_KEY, option);
}

export const decode = (token : string) => {
    try {
        const decoded = verify(token, PRIVATE_KEY);

        return { valid : true, expired : false, decoded };
    } catch (error) {
        // console.log(error);
        return {
            valid : false,
            expired : true,
            decoded : null
        };
    }
}