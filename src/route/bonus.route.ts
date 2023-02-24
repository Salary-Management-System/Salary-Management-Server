import { Router } from "express";
import { getAllBonusesHandler, createBonusHandler } from "../controller/bonus.controller";

const BonusRoute = Router();

BonusRoute.get('/', [...getAllBonusesHandler])
BonusRoute.post('/', [...createBonusHandler])

export default BonusRoute;