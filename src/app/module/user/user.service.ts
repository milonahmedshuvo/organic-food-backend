import config from "../../config";
import AppError from "../../error/appError";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import jwt from 'jsonwebtoken'


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

   const jwtPayload = {
    id : result._id,
    email: result.email,
    role: result.role,
    password: result.password
   }

   const accessToken = jwt.sign(jwtPayload, config.jwt_private_key as string, {expiresIn: '30d'})


   return {
    accessToken,
    result
   }
}



export const userServices = {
    registerFromDB
}