import { NextFunction, Request, Response } from "express";
import { SuccessReponse } from "../config/config";
import { checkRole } from "../middleware/authorize";
import { IPosition, Position } from "../model/position.model";

export const getAllPositionsHandler = [
    checkRole('Admin'),
    async (req : Request, res : Response, next : NextFunction) => {
        try {
            const positions = await Position.getAllPositions();
            return res.status(200).json({
                code : 200,
                status : 'OK',
                data : positions
            });
        } catch (error) {
            next(error);
        }
    }
]

export const createPositionHandler = [
    checkRole('Admin'),
    async (req : Request, res : Response, next : NextFunction) => {
        try {
            const input = req.body;

            const record = new Position(input);
            await record.save();

            const response = {
                code : 200,
                status : 'OK',
                data : record
            } as SuccessReponse<Position>

            return res.status(response.code).json(response);
        } catch (error) {
            next(error);
        }
    }
]