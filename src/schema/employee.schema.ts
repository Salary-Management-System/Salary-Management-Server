import { object, string } from "yup";

export const schema_create = object({
    body : object({
        firstname : string().required("Firstname is required"),
        lastname : string().required('Lastname is required'),
        address : string().required('Address is required'),
        phone : string().required('Phone is required').matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, { excludeEmptyString : true, message : 'Invalid phone number' })
    })
})