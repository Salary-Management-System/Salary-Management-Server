import express from "express";
import { config, DotenvConfigOptions } from "dotenv";
import path from "path";

const app = express();

const envOption : DotenvConfigOptions = {
    path : path.join(__dirname, "../.env")
} 
// For using env file
config(envOption);

const port = process.env.PORT || 3000;

app.listen(port, () =>{
    console.log(`Server is listening on ${port}`)
})