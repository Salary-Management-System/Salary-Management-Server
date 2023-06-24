import { QueryConfig, QueryResult } from "pg";
import client from "../../dbconnect/dbconnect";
import { IEmployee } from "./employee.model";

export interface ITimekeeping {
    timekeeping_id? : number,
    employee_id : IEmployee['employee_id'],
    time_in? : Date,
    time_out? : Date,
    timesheet_id : string,
    date_check : Date
}

export class Timekeeping {
    public timekeeping_id? : number;
    public employee_id: IEmployee['employee_id'];
    public time_in : Date | null;
    public time_out: Date | null;
    public timesheet_id : string;
    public date_check: Date;
    constructor({ employee_id, timesheet_id, time_in, time_out, date_check } : ITimekeeping) {
        this.date_check = date_check;
        this.employee_id = employee_id;
        this.time_in = time_in || null;
        this.time_out = time_out || null;
        this.timesheet_id = timesheet_id
    }

    save() : Promise<QueryResult<Timekeeping>> {
        let pros = Object.keys(this);
        let values = Object.values(this);
        pros.shift();
        values.shift();

        const queryConfig = {
            text : `INSERT INTO timekeepings(${[...pros].join(',')} VALUES(${[...values].map((_, index) => '$' + ++index).join(',')}))`,
            values : [...values]
        } as QueryConfig

        return client.query(queryConfig);
    }
}