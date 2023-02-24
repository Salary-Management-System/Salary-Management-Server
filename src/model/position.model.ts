import { QueryConfig } from "pg";
import client from "../../dbconnect/dbconnect";
import { Department, IDepartment } from "./department.model";

const table = 'positions';
export interface IPosition {
    position_id : string,
    position_name : string,
    job_description : string,
    department_id : string,
    department? : IDepartment
}
export interface IPositionNested extends IPosition {
    department : IDepartment;
}
export class Position {
    public position_id : string;
    public position_name : string;
    public job_description : string;
    public department_id : string;
    constructor({ position_id, position_name, job_description, department_id } : IPosition) {
        this.position_id = position_id;
        this.position_name = position_name;
        this.job_description = job_description;
        this.department_id = department_id;
    }
    
    async save() {
        const pros = Object.keys(this);
        const queryConfig = {
            text : `INSERT INTO ${table}(${pros.join(',')}) VALUES(${pros.map((pro, index) => '$' + ++index).join(',')})`,
            values : Object.values(this)
        } as QueryConfig;

        await client.query<IPosition>(queryConfig);
        return;
    }

    static async getAllPositions() {
        const queryConfig = {
            text : `SELECT * FROM ${table} pos INNER JOIN departments dep ON dep.department_id=pos.department_id`
        } as QueryConfig
        let { rows } = await client.query(queryConfig);
        let result = Promise.all(
            rows.map(async rec => {
                const department = await Department.findByID(rec.department_id);
                const pos = {
                    ...rec,
                    department : department
                } as IPositionNested;
                return pos;
            })
        )
        return result;
    }

    static async findByID(id : string) {
        try {
            const queryConfig = {
                text : `SELECT * FROM ${table} WHERE position_id=$1`,
                values : [id]
            } as QueryConfig
            const { rows } = await client.query<IPosition>(queryConfig);
            let [result] = rows;
            const department = await Department.findByID(result.department_id)

            result = {
                ...result,
                department : department
            } as IPositionNested
            return result || null
        } catch (error) {
            throw error;
        }
    }
}