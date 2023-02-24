import { Router } from "express";
import { createPositionHandler, getAllPositionsHandler } from "../controller/position.controller";

const PositionRoute = Router();
PositionRoute.get('/', [...getAllPositionsHandler]);
PositionRoute.post('/', [...createPositionHandler]);

export default PositionRoute;