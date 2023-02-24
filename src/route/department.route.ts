import { Router } from "express";
import { createDepartmentHandler, getAllDepartmentsHandler } from "../controller/department.controller";

const DepartmentRoute = Router();
DepartmentRoute.get('/', [...getAllDepartmentsHandler])
DepartmentRoute.post('/', [...createDepartmentHandler])

export default DepartmentRoute;