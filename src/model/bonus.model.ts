import { QueryConfig } from "pg";
import client from "../../dbconnect/dbconnect";

export interface IBonus {
    bonus_id : number,
    bonus_name : string,
    effect_date : Date | null,
    expired_date : Date | null
}

export class Bonus {
    public bonus_id? : number;
    public bonus_name : string;
    public effect_date : Date | null;
    public expired_date : Date | null;

    constructor({ bonus_name, effect_date, expired_date } : Omit<IBonus, 'bonus_id'>) {
        this.bonus_name = bonus_name;
        this.effect_date = effect_date;
        this.expired_date = expired_date;
    }

    async save() {
        let pros = Object.keys(this);
        let values = Object.values(this);
        pros.shift();
        values.shift();

        const queryConfig = {
            text : `INSERT INTO bonus(${pros.join(',')}) VALUES(${pros.map((_, index) => '$' + ++index).join(',')})`,
            values : Object.values(this)
        } as QueryConfig;
        await client.query<IBonus>(queryConfig);
        return;
    }
}