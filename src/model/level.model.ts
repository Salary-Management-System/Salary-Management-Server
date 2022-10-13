import { QueryConfig } from "pg";
import { v4 } from "uuid";
import client from "../../dbconnect/dbconnect";

export interface ILevel {
    level_id : string,
    level_name : string
}

export class Level {
    public level_id: string;
    public level_name : string

    constructor({ level_id, level_name } : ILevel) {
        this.level_id = level_id;
        this.level_name = level_name;
    }

    async save() {
        const pros = Object.keys(this);
        const queryConfig = {
            text : `INSERT INTO levels(${pros.join(',')}) VALUES(${pros.map((pro, index) => '$' + ++index).join(',')})`,
            values : Object.values(this)
        } as QueryConfig;
        await client.query(queryConfig);
        return;
    }
}