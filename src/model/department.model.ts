import { QueryConfig } from "pg";
import client from "../../dbconnect/dbconnect";

const table = 'departments';
export interface IDepartment {
    department_id : string,
    department_name : string
}

export class Department {
    public department_id : string;
    public department_name : string;

    constructor({ department_id, department_name } : IDepartment) {
        this.department_id = department_id;
        this.department_name = department_name;
    }

    async save() {
        const pros = Object.keys(this);
        const queryConfig = {
            text : `INSERT INTO ${table}(${pros.join(',')}) VALUES(${pros.map((pro, index) => '$' + ++index).join(',')})`,
            values : Object.values(this)
        } as QueryConfig;
        await client.query<IDepartment>(queryConfig);
        return;
    }

    static async getAllDepartments() {
        const queryConfig = {
            text : `SELECT * FROM ${table}`
        } as QueryConfig
        const { rows } = await client.query(queryConfig);
        const result = rows;

        return result;
    }

    static async findByID(id : string) {
        try {
            const queryConfig = {
                text : `SELECT * FROM ${table} WHERE department_id=$1`,
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