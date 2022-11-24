
import { QueryConfig } from "pg";
import client from "../../dbconnect/dbconnect";
import Employee, { IEmployee } from "./employee.model";


export interface IUser {
    user_id : string,
    username : string,
    password : string,
    employee_id : IEmployee['employee_id'] | null,
    created_at : Date
}

export interface UserNest extends User {
    employee : Employee,
    roles : string[]
};

export type UserResult = Omit<User, 'password'>
export class User {
    public user_id : string;
    public username: string;
    public password : string;
    public employee_id : IEmployee['employee_id'] | null;
    public created_at : Date;

    constructor({ user_id ,username, password, employee_id, created_at } : Required<IUser>) {
        this.user_id = user_id;
        this.username = username;
        this.password = password;
        this.employee_id = employee_id;
        this.created_at = created_at;
    }

    async save() {
        try {
            const pros = Object.keys(this);
            const queryConfig = {
                text : `INSERT INTO users(${pros.join(',')}) VALUES(${pros.map((_, index) => '$' + ++index).join(',')})`,
                values : Object.values(this)
            } as QueryConfig

            return client.query<IUser>(queryConfig);
        } catch (error) {
            throw error;
        }
    }
    static async getAllRoles(user_id : string) {
        try {
            const queryConfig = {
                text : 'SELECT role_name FROM roles WHERE role_id IN (SELECT role_id FROM user_roles WHERE user_id=$1)',
                values : [user_id]
            } as QueryConfig;
            const { rows } = await client.query(queryConfig);
    
            return rows ? rows.map<string>(row => row.role_name) : null;
        } catch (error) {
            throw error;
        }
    }

    static async findByUsername(username : string, option : boolean = false) {
        try {
            let textQuery = `SELECT * FROM users WHERE username=$1;`;
            const queryConfig = {
                text : textQuery,
                values : [username]
            } as QueryConfig
            const { rows } = await client.query<User>(queryConfig);

            let results = rows[0];

            if(option && rows[0].employee_id != null) {
                const employee = await Employee.findById(rows[0].employee_id);
                // @ts
                results = {...results, employee} as UserNest;
            }
            // Return the first element because of finding one
            return results;
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

    static async findAllUsers() {
        try {
            const queryConfig = {
                text : 'SELECT * FROM users'
            } as QueryConfig
    
            const { rows } = await client.query<User>(queryConfig);
            
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async getUserById(id : string) {
        try {
            const queryConfig = {
                text : 'SELECT * FROM users WHERE user_id=$1',
                values : [id]
            } as QueryConfig
    
            const { rows } = await client.query<User>(queryConfig);
            
            // Return the first element because of finding one
            return rows[0];
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}