import { QueryConfig } from "pg";
import client from "../../dbconnect/dbconnect";

export interface IUserRole {
    user_id : string;
    role_id : string
}

export class UserRole {
    public user_id : string;
    public role_id : string;
    constructor({ user_id, role_id } : IUserRole) {
        this.user_id = user_id;
        this.role_id = role_id;
    }

   async save() {
        const pros = Object.keys(this);
        const queryConfig = {
            text : `INSERT INTO user_roles(${[...pros].join(',')}) VALUES(${pros.map((pro, index) => '$' + ++index).join(',')})`,
            values : Object.values(this)            
        } as QueryConfig

        await client.query<IUserRole>(queryConfig);
        return;
   }
}