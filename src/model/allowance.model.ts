import { QueryConfig } from "pg";
import client from "../../dbconnect/dbconnect";
const table = 'allowances';

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

        const queryConfig = {
            text : `INSERT INTO ${table}(${pros.join(',')}) VALUES(${pros.map((_, index) => '$' + ++index).join(',')})`,
            values : values
        } as QueryConfig;
        await client.query<Required<IAllowance>>(queryConfig);
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
            text : `SELECT * FROM ${table} WHERE allowance_id=$1`,
            values : [id]
        } as QueryConfig
        const { rows } = await client.query(queryConfig);
        const [result] = rows;

        return result || null;
    }
}