import { Router } from "express";
import { createUserHandler, getAllUsersHandler } from "../controller/user.controller";
import AllowanceRoute from "./allowance.route";
import BonusRoute from "./bonus.route";
import DeductionRoute from "./deduction.route";
import DepartmentRoute from "./department.route";
import EmployeeRouter from "./employee.route";
import JobFunctionRoute from "./job_function.route";
import LevelRoute from "./level.route";
import PayrollTypeRoute from "./payroll-type.route";
import PositionRoute from "./position.route";

const UserRoute = Router();

// Define allowance route
UserRoute.use('/:username/allowances', AllowanceRoute)
UserRoute.use('/:username/bonuses', BonusRoute)
UserRoute.use('/:username/departments', DepartmentRoute)
UserRoute.use('/:username/deductions', DeductionRoute)
UserRoute.use('/:username/positions', PositionRoute)
UserRoute.use('/:username/levels', LevelRoute)
UserRoute.use('/:username/job-function', JobFunctionRoute)
UserRoute.use('/:username/employees', EmployeeRouter)
UserRoute.use('/:username/payroll-types', PayrollTypeRoute)
UserRoute.post('/', [...createUserHandler])
UserRoute.get('/:username', [...getAllUsersHandler])


export default UserRoute;