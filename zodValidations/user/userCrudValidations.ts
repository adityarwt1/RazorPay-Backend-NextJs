import z from 'zod'
export const userRegistrationValidation = z.object({
    fullName:z.string().min(4, "Name length must be greater than 4."),
    phoneNumber:z.number().min(10, "enter valid phone number!"),
    email:z.email("enter valid email address!"),
    password:z.string().min(6 , "password length must be greater than 6!"),
    
})
