import { IEmployee } from "./employee.model";
import { IPayroll } from "./payroll.model";

export interface ISalary {
    salary_id : string,
    employee_id : IEmployee['employee_id'],
    payroll_id : IPayroll['payroll_id'],
    basic_salary : number,
    total_salary : number | null,
    real_take : number | null
}


export class Salary {
    public salary_id : string;
    public empolyee_id : IEmployee['employee_id'];
    public payroll_id :  IPayroll['payroll_id'];
    public basic_salary : number;
    public total_salary : number | null;
    public real_take : number | null;
    constructor({ salary_id, employee_id, payroll_id, basic_salary } : ISalary) {
        this.salary_id = salary_id;
        this.empolyee_id = employee_id;
        this.payroll_id = payroll_id;
        this.basic_salary = basic_salary;
        this.total_salary = null;
        this.real_take = null;
    }
}