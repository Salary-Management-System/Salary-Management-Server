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
    current_salary : number,
    job_id : string
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
    public job_id : string;
    public current_salary : number;

    constructor(
        { employee_id, address, phone, firstname, lastname, payment_type, hire_date, job_id, current_salary  } : Required<IEmployee>
    ) {
        this.employee_id = employee_id;
        this.address = address;
        this.phone = phone;
        this.firstname = firstname;
        this.lastname = lastname;
        this.payment_type = payment_type ? payment_type : PaymentType.Gross;
        this.hire_date = hire_date;
        this.job_id = job_id;
        this.current_salary = current_salary
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
    async getJob() {
        let queryConfig = {
            text : 'SELECT * FROM job_function WHERE job_function_id=$1',
            values : [this.job_id]
        } as QueryConfig
        const { rows } = await client.query(queryConfig);
        console.log('Job : ', rows[0])
        let result = rows[0];
        if(result) {
            // Find position
            queryConfig.text = 'SELECT * FROM positions WHERE position_id=$1'
            queryConfig.values = [result.position_id];
            const position = await client.query(queryConfig);
            result['position'] = position.rows[0];
            console.log('Pos : ', position)
            // Find level
            queryConfig.text = 'SELECT * FROM levels WHERE level_id=$1'
            queryConfig.values = [result.level_id];
            const level = await client.query(queryConfig);
            result['level'] = level.rows[0];
            console.log('Lev : ', level)
        }
        return result;
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

        const { rows } = await client.query<IEmployee>(queryConfig)

        return rows || null;
    }

    static async findByName(name : string) {
        try {
            const [firstname, lastname] = name.split(' ');
            const queryConfig = {
                text : 'SELECT * FROM employees WHERE firstname=$1 AND lastname=$2',
                values : [firstname, lastname]
            } as QueryConfig
    
            const { rows } = await client.query<Employee>(queryConfig)
    
            return rows || null;
        } catch (error) {
            throw error;
        }
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