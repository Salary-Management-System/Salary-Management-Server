import { QueryConfig } from "pg";
import client from "../../dbconnect/dbconnect";

export interface IPayrollType {
    payroll_type_id : string,
    properties : string[] | string,
    formula : string,
    effect_date : Date | null,
    applicable_object : string[] | string
}

export class PayrollType {
    payroll_type_id? : string;
    properties : string[] | string;
    formula : string;
    effect_date : Date | null;
    applicable_object : string[] | string;
    constructor({ properties, formula, effect_date, applicable_object } : IPayrollType) {
        this.properties = properties;
        this.formula = formula;
        this.effect_date = effect_date;
        this.applicable_object = applicable_object;
    }

    save() {
        let pros = Object.keys(this);
        let values = Object.values(this);
        pros.shift();
        values.shift();

        const queryConfig = {
            text : `INSERT INTO payroll_types(${pros.join(',')}) VALUES (${pros.map((_, index) => '$' + ++index).join(',')})`,
            values : pros.forEach((pro, index) => {
                if(pro == 'proterties' || pro == 'applicable_object') {
                    values[index] = JSON.stringify(values[index])
                }
            })
        } as QueryConfig

        
        return client.query<IPayrollType>(queryConfig);
        
    }
}