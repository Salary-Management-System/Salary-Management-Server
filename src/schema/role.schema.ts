import { object, string } from "yup";

export const schema_create = object({
    body : object({
        role_name : string().required('Role must have a name')
    })
})