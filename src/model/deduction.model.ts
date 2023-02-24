import { QueryConfig } from "pg";
import client from "../../dbconnect/dbconnect";
const table = 'deductions';
export enum Resource {
    Salary,
    Bussiness
}

export interface IDeduction {
    deduction_id : string;
    deduction_name : string;
    from_resource : Resource;
    effect_date : Date | null;
    by_percentage : number;
}

export class Deduction {
    public deduction_id : string;
    public deduction_name : string;
    public from_resource : Resource;
    public by_percentage : number;
    public effect_date : Date | null;

    constructor({ deduction_id ,deduction_name, from_resource, effect_date,  by_percentage } : IDeduction) {
        this.deduction_id = deduction_id;
        this.deduction_name = deduction_name;
        this.from_resource = from_resource;
        this.effect_date = effect_date;
        this.by_percentage = by_percentage;
    }

    async save() {
        const pros = Object.keys(this);
        const queryConfig = {
            text : `INSERT INTO ${table}(${pros.join(',')}) VALUES (${pros.map((_, index) => '$' + ++index).join(',')})`,
            values : Object.values(this)
        } as QueryConfig
        
        await client.query<IDeduction>(queryConfig);
        return;
    }

    static async findAll() {
        const queryConfig = {
            text : `SELECT * FROM ${table}`
        } as QueryConfig
        const { rows } = await client.query(queryConfig);
        const result = rows;

        return result || null;
    }
    static async findByID(id : string) {
        const queryConfig = {
            text : `SELECT * FROM ${table} WHERE bonus_id=$1`,
            values : [id]
        } as QueryConfig
        const { rows } = await client.query(queryConfig);
        const [result] = rows;

        return result || null;
    }
}