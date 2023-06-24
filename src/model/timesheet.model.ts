import { QueryConfig, QueryResult } from "pg";
import client from "../../dbconnect/dbconnect";
import { IEmployee } from "./employee.model"

export interface ITimeSheet {
    timesheet_id : string,
    name : string
    created_at : Date,
    creator : IEmployee['employee_id']
    censor : IEmployee['employee_id'] | null
    censored_at : Date | null
    updated_at : Date
}

export class TimeSheet {
    public timesheet_id: string;
    public name: string;
    public created_at: Date;
    public censor: IEmployee['employee_id'] | null;
    public creator : IEmployee['employee_id'];
    public censored_at : Date | null;
    public updated_at : Date;
    constructor({ timesheet_id, name, created_at, censor, creator, updated_at, censored_at } : ITimeSheet) {
        this.censor = censor;
        this.timesheet_id = timesheet_id;
        this.created_at = created_at;
        this.name = name;
        this.creator = creator;
        this.updated_at = updated_at;
        this.censored_at = censored_at;
    }

    save() : Promise<QueryResult<TimeSheet>> {
        const pros = Object.keys(this);
        const values = Object.values(this);

        const queryConfig = {
            text : `INSERT INTO timesheets(${[...pros].join(',')} VALUES(${[...values].map((_, index) => '$' + ++index).join(',')}))`,
            values : [...values]
        } as QueryConfig

        return client.query(queryConfig);
    }

    get month() {
        return this.created_at.getMonth();
    }
    get year() {
        return this.created_at.getFullYear();
    }
}