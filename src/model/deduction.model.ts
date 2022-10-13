import { QueryConfig } from "pg";
import { v4 } from "uuid";
import client from "../../dbconnect/dbconnect";

export enum Resource {
    Salary,
    Bussiness
}

export interface IDeduction {
    deduction_id : number;
    deduction_name : string;
    amount : number;
    unit : string
    resource : Resource;
    effect_date : Date | null;
}

export class Deduction {
    public deduction_id? : string;
    public deduction_name : string;
    public unit : string
    public amount : number;
    public resource : Resource;
    public effect_date : Date | null;

    constructor({ deduction_name, amount, unit, resource, effect_date } : IDeduction) {
        this.deduction_name = deduction_name;
        this.amount = amount;
        this.resource = resource;
        this.unit = unit;
        this.effect_date = effect_date;
    }

    async save() {
        const pros = Object.keys(this);
        const queryConfig = {
            text : `INSERT INTO employees(${pros.join(',')}) VALUES (${pros.map((_, index) => '$' + ++index).join(',')})`,
            values : Object.values(this)
        } as QueryConfig
        
        await client.query<IDeduction>(queryConfig);
        return;
    }
}