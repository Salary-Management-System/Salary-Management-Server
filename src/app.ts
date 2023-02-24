import express, { Request, Response } from "express";
import { config, DotenvConfigOptions } from "dotenv";
import path from "path";
import UserRoute from "./route/user.route";
import { authentication } from "./auth/authentication";
import { deserialize } from "./middleware/deserialize";
import { requireUser } from "./middleware/requireUser";
import cookieParser from "cookie-parser"
import EmployeeRouter from "./route/employee.route";
import { Role } from "./model/role.model";
import { errorHandler } from "./middleware/errorHandler";
import { reqLog } from "./middleware/reqLog";
import cors from 'cors';

const app = express();

const envOption : DotenvConfigOptions = {
    path : path.join(__dirname, "../.env")
} 
const port = process.env.PORT || 3000;
// For using env file
config(envOption);

// For parsing cookie data
app.use(cookieParser());

// For Cross-Origin Resource Sharing
app.use(cors({
    origin : ['http://localhost:4200'],
    // Set 'credentials' to true to configure 'Access-Control-Allow-Credentials' header for accessing from other domain follow by orgin array
    credentials : true,
    exposedHeaders : ['set-cookie', 'x-access-token', 'x-access-token-exp']
}));

// Set default header Content-Type to application/json
app.use(express.json());
app.use(express.urlencoded({ extended : false }))

// app.use(reqLog)

app.post('/api/auth', [...authentication])
app.use(deserialize)

app.use('/api/users', requireUser, UserRoute)

app.use(errorHandler)

app.listen(port, async () => {
    console.log(`Server is listening on ${port}`)
})