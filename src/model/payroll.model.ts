import { QueryConfig } from "pg";
import client from "../../dbconnect/dbconnect";
import { IPayrollType, PayrollType } from "./payroll_type.model";

const table = 'payrolls';
export interface IPayroll {
    payroll_id : string,
    payroll_name : string,
    payment_date : Date | null,
    created_date : Date
    payroll_type_id : IPayrollType['payroll_type_id']
}

export interface IPayrollNested extends IPayroll {
    payroll_type : IPayrollType
}

export class Payroll implements IPayroll {
    public payroll_id: string;
    public payroll_name: string;
    public payment_date: Date | null;
    public payroll_type_id: IPayrollType['payroll_type_id'];
    public created_date: Date;

    constructor({ payroll_id, payroll_name, payment_date, payroll_type_id, created_date } : IPayroll) {
        this.payroll_id = payroll_id;
        this.payroll_name = payroll_name;
        this.payment_date = payment_date;
        this.payroll_type_id = payroll_type_id;
        this.created_date = created_date;
    }

    async save() {
        const pros = Object.keys(this);
        const queryConfig = {
            text : `INSERT INTO ${table}(${pros.join(',')}) VALUES (${pros.map((_, index) => '$' + ++index).join(',')})`,
            values : Object.values(this)
        } as QueryConfig
        
        await client.query<IPayroll>(queryConfig);
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
            text : `SELECT * FROM ${table} WHERE payroll_id=$1`,
            values : [id]
        } as QueryConfig
        const { rows } = await client.query<IPayroll>(queryConfig);
        let [result] = rows;
        const type = await PayrollType.findByID(result.payroll_type_id);
        result = {
            ...result,
            payroll_type : type
        } as IPayrollNested

        return result || null;
    }
}