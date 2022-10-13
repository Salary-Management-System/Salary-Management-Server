import { QueryConfig, QueryResult } from "pg";
import client from "../../dbconnect/dbconnect";

export interface IShift {
    shift_id : string,
    shift_name : string,
    s_type : ShiftType,
    start_time : string,
    end_time : string
}

export enum ShiftType {
    FullTime = 0,
    PartTime = 1
}

export class Shift {
    public shift_id: string;
    public shift_name: string;
    public s_type: ShiftType;
    public start_time: string;
    public end_time: string;
    constructor({ shift_id, shift_name, s_type, start_time, end_time} : IShift) {
        this.shift_id = shift_id;
        this.shift_name = shift_name;
        this.start_time = start_time;
        this.end_time = end_time;
        this.s_type = s_type || ShiftType.FullTime
    }

    save() : Promise<QueryResult<Shift>> {
        const pros = Object.keys(this);
        const values = Object.values(this);

        const queryConfig = {
            text : `INSERT INTO shifts(${[...pros].join(',')} VALUES(${[...values].map((_, index) => '$' + ++index).join(',')}))`,
            values : [...values]
        } as QueryConfig

        return client.query(queryConfig);
    }

    get hours() {
        const start = this.start_time.split(':').map(el => parseInt(el)).reduce((hour, minute) => hour + minute/60);
        const end = this.end_time.split(':').map(el => parseInt(el)).reduce((hour, minute) => hour + minute/60);
        return Math.floor(start - end);
    }
}