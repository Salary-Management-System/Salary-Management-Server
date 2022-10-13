import { object, ref, string } from "yup";

export const schema_create = object({
    body : object({
        username : string().required('Username is required'),
        password : string()
            .required('Password is required')
            .min(8, 'Password is required to be 8 characters at least'),
        employee_id : string().uuid('Invalid ID'),
        refresh_token : string(),
        passwordConfirm: string().oneOf(
            [ref("password"), null],
            "Password musts match"
          ),
    })
})

export const schema_authenticate = object({
    body : object({
        username : string().required('Username is required'),
        password : string()
            .required('Password is required')
            .min(8, 'Password is required to be 8 characters at least')
    })
})
