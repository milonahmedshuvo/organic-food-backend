import AppError from "../../error/appError";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const registerFromDB = async (payload:TUser) => {

    const { email } = payload

    if(payload.role === "admin"){
        payload.role = "admin"
    }

   const existingUser = await User.findOne({email})
   if(existingUser){
    throw new AppError(400, 'user already exist')
   }

   const result = await User.create(payload)
   console.log('user:', result)
   return result
}



export const userServices = {
    registerFromDB
}