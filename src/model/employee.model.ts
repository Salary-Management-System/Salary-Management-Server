import { QueryConfig } from "pg";
import client from "../../dbconnect/dbconnect";

export interface IEmployee {
    employee_id : string,
    address : string,
    phone : string,
    firstname : string,
    lastname : string,
    payment_type : PaymentType,
    hire_date : Date | null,
    current_salary : number
}

export enum PaymentType {
    Gross = "gross",
    Net = "net"
}

//@ts-ignore
class Employee {
    public employee_id: string;
    public address: string;
    public phone: string;
    public firstname: string;
    public lastname: string;
    public payment_type: PaymentType;
    public hire_date: Date | null;

    constructor(
        { employee_id, address, phone, firstname, lastname, payment_type, hire_date } : Required<IEmployee>
    ) {
        this.employee_id = employee_id;
        this.address = address;
        this.phone = phone;
        this.firstname = firstname;
        this.lastname = lastname;
        this.payment_type = payment_type ? payment_type : PaymentType.Gross;
        this.hire_date = hire_date;
    }

    get fullname() {
        return this.firstname + this.lastname;
    }

    get numYOE() {
        return this.hire_date ? new Date(Date.now()).getFullYear() - this.hire_date.getFullYear() : 0;
    }

    async save() {
        const pros = Object.keys(this);
        const queryConfig = {
            text : `INSERT INTO employees(${pros.join(',')}) VALUES (${pros.map((_, index) => '$' + ++index).join(',')})`,
            values : Object.values(this)
        } as QueryConfig
        
        await client.query(queryConfig);
        return;
    }
    static async findById(id : IEmployee['employee_id']) {
        const queryConfig = {
            text : `SELECT * FROM employees WHERE employee_id=$1`,
            values : [id]
        } as QueryConfig
        const { rows } = await client.query<Employee>(queryConfig);

        return rows[0] || null;
    }

    static async findAll() {
        const queryConfig = {
            text : 'SELECT * FROM employees'
        } as QueryConfig

        const { rows } = await client.query<Employee>(queryConfig)

        return rows || null;
    }

    static async isExist(id : IEmployee['employee_id']) {
        const queryConfig = {
            text : `SELECT * FROM employees WHERE employee_id=$1`,
            values : [id]
        } as QueryConfig
        const { rows } = await client.query<Employee>(queryConfig);

        return rows ? true : false;
    }
}

export default Employee;