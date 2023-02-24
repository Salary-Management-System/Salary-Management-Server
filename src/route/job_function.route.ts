import { Router } from "express";
import { createJobHandler, getAllJobHandler } from "../controller/job_function.controller";

const JobFunctionRoute = Router();
JobFunctionRoute.get('/', [...getAllJobHandler])
JobFunctionRoute.post('/', [...createJobHandler])

export default JobFunctionRoute;