import { Router } from "express";
import { createUserHandler, getAllUsersHandler } from "../controller/user.controller";

const UserRoute = Router();


UserRoute.post('/', [...createUserHandler])
UserRoute.get('/', [...getAllUsersHandler])

export default UserRoute;