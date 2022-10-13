import { QueryConfig } from "pg";
import client from "../../dbconnect/dbconnect";

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
            text : `INSERT INTO departments(${pros.join(',')}) VALUES(${pros.map((pro, index) => '$' + ++index).join(',')})`,
            values : Object.values(this)
        } as QueryConfig;
        await client.query<IDepartment>(queryConfig);
        return;
    }
}