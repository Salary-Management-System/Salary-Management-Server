import { QueryResult, QueryConfig } from "pg";
import client from "../../dbconnect/dbconnect";
import { IBonus } from "./bonus.model";
import { IEmployee } from "./employee.model";

export interface IBonusEmployee {
    id? : number,
    bonus_id : IBonus['bonus_id'],
    employee_id : IEmployee['employee_id'],
    created_date : Date,
    paid_date : Date | null,
    amount : number
}

export class BonusEmployee {
    public id?: number | undefined;
    public bonus_id: number;
    public employee_id: string;
    public created_date: Date;
    public paid_date: Date | null;
    public amount: number;
    constructor({ bonus_id, employee_id, created_date, paid_date, amount } : IBonusEmployee) {
        this.bonus_id = bonus_id;
        this.employee_id = employee_id;
        this.created_date = created_date;
        this.paid_date = paid_date || null;
        this.amount = amount;
    }

    save() : Promise<QueryResult<BonusEmployee>> {
        let pros = Object.keys(this);
        let values = Object.values(this);
        pros.shift();
        values.shift();

        const queryConfig = {
            text : `INSERT INTO bonus_empoyees(${[...pros].join(',')} VALUES(${[...values].map((_, index) => '$' + ++index).join(',')}))`,
            values : [...values]
        } as QueryConfig

        return client.query(queryConfig);
    }
}