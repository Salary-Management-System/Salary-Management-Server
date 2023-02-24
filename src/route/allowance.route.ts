import { Router } from "express";
import { createAllowanceHandler, getAllAllowancesHandler } from "../controller/allowance.controller";

const AllowanceRoute = Router();

AllowanceRoute.get('/', [...getAllAllowancesHandler])
AllowanceRoute.post('/',[...createAllowanceHandler])

export default AllowanceRoute;