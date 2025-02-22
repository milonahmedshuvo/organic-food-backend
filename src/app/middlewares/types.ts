export const user_role = {
    admin : "admin",
    customer : "customer", 
} as const  
export type TUserRole = keyof typeof user_role