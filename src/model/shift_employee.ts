import { QueryResult, QueryConfig } from "pg";
import client from "../../dbconnect/dbconnect";
import { IEmployee } from "./employee.model";
import { IShift } from "./shift.model";

export interface IEmployeeShift {
    id? : number,
    employee_id : IEmployee['employee_id'],
    shift_id : IShift['shift_id'],
    num_hours : number,
    checkin: Date | null,
    checkout : Date | null
}

export class EmployeeShift {
    public id?: number | undefined;
    public employee_id: IEmployee['employee_id'];
    public shift_id: IShift['shift_id'];
    public num_hours: number;
    public checkin: Date | null;
    public checkout: Date | null;
    constructor({ employee_id, shift_id, num_hours, checkin, checkout } : IEmployeeShift) {
        this.employee_id = employee_id;
        this.shift_id = shift_id;
        this.num_hours = num_hours;
        this.checkin = checkin || null;
        this.checkout = checkout || null;
    }

    save() : Promise<QueryResult<EmployeeShift>> {
        let pros = Object.keys(this);
        let values = Object.values(this);
        pros.shift();
        values.shift();

        const queryConfig = {
            text : `INSERT INTO employee_shifts(${[...pros].join(',')} VALUES(${[...values].map((_, index) => '$' + ++index).join(',')}))`,
            values : [...values]
        } as QueryConfig

        return client.query(queryConfig);
    }
}