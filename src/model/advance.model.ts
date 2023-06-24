import { QueryConfig, QueryResult } from "pg";
import client from "../../dbconnect/dbconnect";
import { IEmployee } from "./employee.model";

export interface IAdvance {
    advance_id? : number,
    employee_id : IEmployee['employee_id'],
    amount : number,
    reason : string,
    payment_time : Date
}

export class Advance implements IAdvance {
    public advance_id?: number;
    public employee_id: IEmployee['employee_id'];
    public amount: number;
    public reason: string;
    public payment_time: Date;
    constructor({ employee_id, amount, reason, payment_time } : IAdvance) {
        this.amount = amount;
        this.reason = reason;
        this.employee_id = employee_id;
        this.payment_time = payment_time;
    }

    save() : Promise<QueryResult<Advance>> {
        let pros = Object.keys(this);
        let values = Object.values(this);
        pros.shift();
        values.shift();

        const queryConfig = {
            text : `INSERT INTO advances(${[...pros].join(',')} VALUES(${[...values].map((_, index) => '$' + ++index).join(',')}))`,
            values : [...values]
        } as QueryConfig

        return client.query(queryConfig);
    }
}