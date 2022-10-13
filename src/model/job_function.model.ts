import { QueryConfig } from "pg";
import client from "../../dbconnect/dbconnect";


export interface IJobFunction {
    level_id : string,
    position_id : string,
    requirements : string,
    maximum_salary : number,
    minimum_salary : number
}

export class JobFunction {
    level_id : string;
    position_id : string;
    requirements : string;
    maximum_salary : number;
    minimum_salary : number;

    constructor({ level_id, position_id, requirements, maximum_salary, minimum_salary } : IJobFunction) {
        this.level_id = level_id;
        this.position_id = position_id;
        this.requirements = requirements;
        this.maximum_salary = maximum_salary;
        this.minimum_salary = minimum_salary;
    }

    async save() {
        const pros = Object.keys(this);
        const queryConfig = {
            text : `INSERT INTO job_functions(${pros.join(',')}) VALUES(${pros.map((pro, index) => '$' + ++index).join(',')})`,
            values : Object.values(this)
        } as QueryConfig;
        await client.query<IJobFunction>(queryConfig);
        return;
    }
}