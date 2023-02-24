import { Router } from "express";
import { getAllLevelsHandler, createLevelHandler } from "../controller/level.controller";

const LevelRoute = Router();
LevelRoute.get('/', [...getAllLevelsHandler]);
LevelRoute.post('/', [...createLevelHandler])

export default LevelRoute;