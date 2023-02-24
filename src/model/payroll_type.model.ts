import { QueryConfig } from "pg";
import client from "../../dbconnect/dbconnect";
const table = 'payroll_types';
export interface IPayrollType {
    payroll_type_id : number,
    type_name : string,
    properties : string[] | string,
    formula : string,
    effect_date : Date | null,
    expired_date : Date | null
    applicable_object : string[] | string
}

export class PayrollType {
    payroll_type_id? : number;
    properties : string[] | string;
    formula : string;
    effect_date : Date | null;
    applicable_object : string[] | string;
    type_name : string;
    expired_date : Date | null;
    constructor({ type_name ,properties, formula, effect_date, applicable_object, expired_date } : IPayrollType) {
        this.type_name = type_name;
        this.properties = properties;
        this.formula = formula;
        this.effect_date = effect_date;
        this.applicable_object = applicable_object;
        this.expired_date = expired_date
    }

    save() {
        let pros = Object.keys(this);
        let values = Object.values(this);
        pros.forEach((pro, index) => {
            if(pro == 'proterties' || pro == 'applicable_object') {
                values[index] = JSON.stringify(values[index])
            }
        })
        const queryConfig = {
            text : `INSERT INTO ${table}(${pros.join(',')}) VALUES (${pros.map((_, index) => '$' + ++index).join(',')})`,
            values : values
        } as QueryConfig
        
        return client.query<IPayrollType>(queryConfig);
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
            text : `SELECT * FROM ${table} WHERE payroll_type_id=$1`,
            values : [id]
        } as QueryConfig
        const { rows } = await client.query(queryConfig);
        const [result] = rows;

        return result || null;
    }
}