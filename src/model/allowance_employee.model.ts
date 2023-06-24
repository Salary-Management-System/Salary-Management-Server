import { QueryConfig } from "pg"
import client from "../../dbconnect/dbconnect"
import { IEmployee } from "./employee.model"

export interface IAllowanceEmployee {
    allowance_id : number
    employee_id : IEmployee['employee_id']
    created_at : Date
    amount : number
}


// @ts-ignore
class AllowanceEmployee implements IAllowanceEmployee {
    public allowance_id : number
    public employee_id : IEmployee['employee_id']
    public created_at : Date
    public amount : number

    constructor(
        { allowance_id, employee_id, created_at, amount } : Required<IAllowanceEmployee>
    ) {
        this.allowance_id = allowance_id
        this.employee_id = employee_id
        this.created_at = created_at
        this.amount = amount
    }

    async save() {
        const pros = Object.keys(this)
        const queryConfig = {
            text : `INSERT INTO allowance_employee(${pros.join(',')}) VALUES(${pros.map((_, index) => '$' + ++index).join(',')})`,
            values : Object.values(this)
        } as QueryConfig
        client.query(queryConfig)
    }
}

export default AllowanceEmployee;