import { QueryConfig } from "pg";
import client from "../../dbconnect/dbconnect";
import { IDeduction } from "./deduction.model";
import { IEmployee } from "./employee.model";

export interface IDeductionEmployee {
    deduction_id : IDeduction['deduction_id']
    employee_id : IEmployee['employee_id']
    amount : number
    unit : string
}


class DeductionEmployee implements IDeductionEmployee {
    deduction_id: IDeduction['deduction_id'];
    employee_id: IEmployee['employee_id'];
    amount: number;
    unit: string;

    constructor(
        { deduction_id, employee_id, amount, unit } : IDeductionEmployee
    ) {
        this.deduction_id = deduction_id
        this.employee_id = employee_id
        this.amount = amount
        this.unit = unit
    }

    async save() {
        const pros = Object.keys(this)
        const queryConfig = {
            text : `INSERT INTO deduction_employee(${pros.join(',')}) VALUES(${pros.map((_, index) => '$' + ++index).join(',')})`,
            values : Object.values(this)
        } as QueryConfig

        client.query(queryConfig)
    }
}

export default DeductionEmployee;