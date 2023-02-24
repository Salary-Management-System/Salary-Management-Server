import { QueryConfig } from "pg";
import client from "../../dbconnect/dbconnect";

const table = 'bonus_policy';
export interface IBonus {
    bonus_id : string,
    bonus_name : string,
    effect_date : Date | null,
    expired_date : Date | null,
    basic_amount : number
}

export class Bonus {
    public bonus_id : string;
    public bonus_name : string;
    public effect_date : Date | null;
    public expired_date : Date | null;
    public basic_amount : number;

    constructor({ bonus_id ,bonus_name, effect_date, expired_date, basic_amount } : IBonus) {
        this.bonus_id = bonus_id
        this.bonus_name = bonus_name;
        this.effect_date = effect_date;
        this.expired_date = expired_date;
        this.basic_amount = basic_amount
    }

    async save() {
        let pros = Object.keys(this);
        let values = Object.values(this);

        const queryConfig = {
            text : `INSERT INTO ${table}(${pros.join(',')}) VALUES(${pros.map((_, index) => '$' + ++index).join(',')})`,
            values : values
        } as QueryConfig;
        await client.query<IBonus>(queryConfig);
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
            text : `SELECT * FROM ${table} WHERE bonus_id=$1`,
            values : [id]
        } as QueryConfig
        const { rows } = await client.query(queryConfig);
        const [result] = rows;

        return result || null;
    }
}