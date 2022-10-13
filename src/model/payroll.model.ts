import { QueryConfig } from "pg";
import client from "../../dbconnect/dbconnect";

export interface IPayroll {
    payroll_id : string,
    payroll_name : string,
    payment_date : Date | null,
    created_date : Date
    payroll_type_id : string
}

export class Payroll implements IPayroll {
    public payroll_id: string;
    public payroll_name: string;
    public payment_date: Date | null;
    public payroll_type_id: string;
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
            text : `INSERT INTO payrolls(${pros.join(',')}) VALUES (${pros.map((_, index) => '$' + ++index).join(',')})`,
            values : Object.values(this)
        } as QueryConfig
        
        await client.query<IPayroll>(queryConfig);
        return;
    }
}