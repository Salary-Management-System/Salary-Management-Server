import { QueryConfig } from "pg";
import client from "../../dbconnect/dbconnect";
import { IDepartment } from "./department.model";
import { ILevel, Level } from "./level.model";
import { IPosition, Position } from "./position.model";


export interface IJobFunction {
    job_function_id : string,
    level_id : ILevel['level_id'],
    position_id : IPosition['position_id'],
    job_requirement : string,
    maximum_salary : number,
    minimum_salary : number,
}

export interface IJobFunctionNested extends IJobFunction {
    position : IPosition,
    level : ILevel
}

export class JobFunction {
    job_function_id? : string;
    level_id : ILevel['level_id'];
    position_id : IPosition['position_id'];
    job_requirement : string;
    maximum_salary : number;
    minimum_salary : number;

    constructor({ level_id, position_id, job_requirement, maximum_salary, minimum_salary } : IJobFunction) {
        this.level_id = level_id;
        this.position_id = position_id;
        this.job_requirement = job_requirement;
        this.maximum_salary = maximum_salary;
        this.minimum_salary = minimum_salary;
    }

    async save() {
        const pros = Object.keys(this);
        const queryConfig = {
            text : `INSERT INTO job_function(${pros.join(',')}) VALUES(${pros.map((pro, index) => '$' + ++index).join(',')})`,
            values : Object.values(this)
        } as QueryConfig;
        await client.query<IJobFunction>(queryConfig);
        return;
    }

    static async getAllJob() {
        try {
            const queryString = 'SELECT * FROM job_function job INNER JOIN positions pos ON job.position_id=pos.position_id INNER JOIN levels lev ON job.level_id=lev.level_id'
            const queryConfig = {
                text : queryString
            } as QueryConfig
            let { rows } = await client.query<IJobFunction>(queryConfig);
            let result = Promise.all(
                rows.map(async (rec) => {
                    const position = await Position.findByID(rec.position_id);
                    const level = await Level.findByID(rec.level_id);
                    const job : IJobFunctionNested = {
                        ...rec,
                        position : position,
                        level : level
                    }
                    return job;
                })
            )

            return result;
        } catch (error) {
            console.log(error)
        }
    }
}