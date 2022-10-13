import { config } from "dotenv";
import { Client } from "pg";
import log from "../logger/logger";

config();

const client = new Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: Number(process.env.DB_PORT),
})


client.connect((err) => {
    if(err) {
        log.error(err.stack)
        log.info('Having troubles connecting database');
        return;
    }
    log.info('Connected Successfully');
})

export default client;