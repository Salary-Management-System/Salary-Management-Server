import { QueryConfig } from "pg";
import client from "../../dbconnect/dbconnect";

export interface IPosition {
    position_id : string,
    position_name : string,
    description : string
}

export class Position {
    public position_id : string;
    public position_name : string;
    public description : string;
    constructor({ position_id, position_name, description } : IPosition) {
        this.position_id = position_id;
        this.position_name = position_name;
        this.description = description
    }
    
    async save() {
        const pros = Object.keys(this);
        const queryConfig = {
            text : `INSERT INTO positions(${pros.join(',')}) VALUES(${pros.map((pro, index) => '$' + ++index).join(',')})`,
            values : Object.values(this)
        } as QueryConfig;

        await client.query<IPosition>(queryConfig);
        return;
    }
}