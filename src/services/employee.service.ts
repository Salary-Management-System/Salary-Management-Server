import Employee, { IEmployee } from "../model/employee.model";
import { v4 as generateUUID } from "uuid";

class EmployeeService {
    async createEmployee(input : IEmployee) {
        let body = input;

        // Check the existence of employee
        const foundEmployee = await Employee.findByName(body.firstname + body.lastname);
        if(foundEmployee) {
            return new Error('Employee already existed')
        }

        const employee_id = generateUUID(); // return string
        const hire_date = new Date();

        body['hire_date'] = hire_date;
        body['employee_id'] = employee_id;

        const employee = new Employee(body);
        await employee.save();
        return employee;
    }
}

// Apply Singleton Pattern to guarantee every places in the app just use the only one instance of the service
const employeeService = new EmployeeService();
export default employeeService;