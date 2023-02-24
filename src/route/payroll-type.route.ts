import { Router } from "express";
import { createPayrollTypeHandler, getAllPayrollType } from "../controller/payroll-type.controller";

const PayrollTypeRoute = Router();
PayrollTypeRoute.get('/', [...getAllPayrollType])
PayrollTypeRoute.post('/', [...createPayrollTypeHandler])
export default PayrollTypeRoute;