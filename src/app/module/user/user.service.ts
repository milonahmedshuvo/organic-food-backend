import config from "../../config";
import AppError from "../../error/appError";
import { TUser, TUserLogin } from "./user.interface";
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


const loginFromDB = async (payload:TUserLogin) => {

    const user = await User.findOne({email: payload.email})
    if(!user){
        throw new AppError(400, 'user credential not valid')
    }

    const jwtPayload = {
        id: user._id,
        email: user.email,
        password: user.password,
        role: user.role
    }

    const accessToken = jwt.sign(jwtPayload, config.jwt_private_key as string, {expiresIn:"30d"})

    return {
        accessToken,
        user
    }
}



const allCustomerFromDB = async () => {
    const users = await User.find({role : "customer"})
    return users
}

export const userServices = {
    registerFromDB,
    loginFromDB,
    allCustomerFromDB
}