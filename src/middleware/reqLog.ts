import { NextFunction, Request, response, Response } from "express";
import log from "../../logger/logger";
import { LogConfig } from "../config/log.config";
import axios from "axios"

export const reqLog = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const reponseFromAPI = await axios.get(`http://ip-api.com/json/${req.ip}`);
        const { timezone, country, countryCode, query } = reponseFromAPI.data;
        const userAgent = req.get('User-Agent');
    
        const reqConfig = {
            METHOD : req.method,
            IP : query,
            PATH : req.path,
            HOST : req.hostname,
            CURRENT_TIME : new Date().toLocaleString(),
            TIMEZONE : timezone,
            COUNTRY : country,
            COUNTRY_CODE : countryCode,
            USER_AGENT : userAgent
        } as LogConfig
    
        Object.keys(reqConfig).forEach(key => {
            //@ts-ignore
            log.info(`${key} : ${reqConfig[key]}`);
        })
        log.info('---')
        next();
    } catch (error) {
        next(error);
    }
}