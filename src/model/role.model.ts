import { QueryConfig } from "pg";
import client from "../../dbconnect/dbconnect";

export interface IRole {
    role_id : string,
    role_name : string
}

export class Role {
    public role_id: string;
    public role_name : string;

    constructor({ role_id, role_name } : IRole) {
        this.role_id = role_id;
        this.role_name = role_name;
    }

    async save() {
        const pros = Object.keys(this);
        const queryOptions = {
            text : `INSERT INTO roles(${pros.join(',')}) VALUES(${pros.map((_, index) => '$' + ++index).join(',')})`,
            values : Object.values(this)
        } as QueryConfig

        await client.query<IRole>(queryOptions);
        return;
    }

    static async findAllRoles() {
        try {
            const queryConfig = { 
                text : 'SELECT * FROM roles'
            } as QueryConfig
    
            const result = await client.query<IRole>(queryConfig);
    
            return result['rows'];
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
