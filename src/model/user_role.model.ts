import { QueryConfig } from "pg";
import client from "../../dbconnect/dbconnect";
import { IUser } from "./user.model";
import { IRole } from "./role.model";

export interface IUserRole {
    user_id : IUser['user_id'];
    role_id : IRole['role_id'];
}

export class UserRole {
    public user_id : IUser['user_id'];
    public role_id : IRole['role_id'];
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