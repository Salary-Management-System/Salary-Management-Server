import { QueryConfig } from "pg";
import client from "../../dbconnect/dbconnect";

export interface IAllowance {
    allowance_id? : number,
    allowance_name : string,
    effect_date : Date,
    expired_date : Date | null,
    basic_amount : number
}

export class Allowance {
    public allowance_id? : number;
    public allowance_name : string
    public effect_date : Date;
    public expired_date : Date | null;
    public basic_amount : number
    constructor({ allowance_name, effect_date, expired_date, basic_amount } : Omit<IAllowance, 'allowance_id'>) {
        this.allowance_name = allowance_name;
        this.effect_date = effect_date;
        this.expired_date = expired_date || null;
        this.basic_amount = basic_amount;
    }

    async save() {
        const pros = Object.keys(this);
        const values = Object.values(this);
        pros.shift();
        values.shift();

        const queryConfig = {
            text : `INSERT INTO allowances(${pros.join(',')}) VALUES(${pros.map((_, index) => '$' + ++index).join(',')})`,
            values : values
        } as QueryConfig;
        await client.query<Required<IAllowance>>(queryConfig);
        return;
    }
}