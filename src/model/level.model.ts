import { QueryConfig } from "pg";
import { v4 } from "uuid";
import client from "../../dbconnect/dbconnect";
const table = 'levels';
export interface ILevel {
    level_id : string,
    level_name : string,
    yoe_required : number
}

export class Level {
    public level_id: string;
    public level_name : string;
    public yoe_required : number;

    constructor({ level_id, level_name, yoe_required } : ILevel) {
        this.level_id = level_id;
        this.level_name = level_name;
        this.yoe_required = yoe_required;
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

    static async getAllLevels() {
        const queryConfig = {
            text : 'SELECT * FROM levels'
        } as QueryConfig
        const { rows } = await client.query(queryConfig);
        const result = rows;

        return result;
    }

    static async findByID(id : string) {
        try {
            const queryConfig = {
                text : `SELECT * FROM ${table} WHERE level_id=$1`,
                values : [id]
            } as QueryConfig
            const { rows } = await client.query(queryConfig);
            const [result] = rows;

            return result || null
        } catch (error) {
            throw error;
        }
    }
}