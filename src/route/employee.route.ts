import { Router} from "express";
import { createEmployeesHandler } from "../controller/employees.controller";


const EmployeeRouter = Router();

EmployeeRouter.post('/', [...createEmployeesHandler])

export default EmployeeRouter;