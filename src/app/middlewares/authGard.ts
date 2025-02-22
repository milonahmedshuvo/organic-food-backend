import { NextFunction, Request, Response } from "express"
import jwt, { JwtHeader, JwtPayload } from 'jsonwebtoken'
import config from "../config"
import catchAsync from "../utils/catchAsync"
import AppError from "../error/appError"
import { TUserRole } from "./types"


const auth = (...requistUserRole:TUserRole[]) => {

    return catchAsync(async (req:Request, res:Response, next:NextFunction ) => {

        const token = req.headers.authorization
        console.log({token})

        if(!token) {
            throw new AppError(400, 'Authentication token is unvalid!!')
        }



       const decoded = jwt.verify(token, config.jwt_private_key as string,)as JwtPayload
       
       const { role } = decoded;

       console.log({role}) 
       
       
       // check role such customer and admin 
      //  const role = (decoded as JwtPayload).role 
        //   const role = decoded.role 
       
     

       if(requistUserRole && !requistUserRole.includes(role)) {      
           throw new AppError(401, 'Unauthorized access')
       }

       req.user = decoded as JwtHeader
       next()
    })
}



export default auth