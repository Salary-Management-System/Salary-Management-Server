import { Router} from "express";
import { createEmployeesHandler, getAllEmployeesHandler } from "../controller/employees.controller";


const EmployeeRouter = Router();
EmployeeRouter.get('/', [...getAllEmployeesHandler])
EmployeeRouter.post('/', [...createEmployeesHandler])

export default EmployeeRouter;