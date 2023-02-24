export interface ISalary {
    salary_id : string,
    employee_id : string,
    payroll_id : string,
    basic_salary : number,
    total_salary : number | null,
    real_take : number | null
}


export class Salary {
    public salary_id : string;
    public empolyee_id : string;
    public payroll_id :  string;
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