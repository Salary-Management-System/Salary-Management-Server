import { Router } from "express";
import { createDeductionHandler, getAllDeductionsHandler } from "../controller/deduction.controller";


const DeductionRoute = Router();
DeductionRoute.get('/', [...getAllDeductionsHandler]);
DeductionRoute.post('/', [...createDeductionHandler])

export default DeductionRoute;