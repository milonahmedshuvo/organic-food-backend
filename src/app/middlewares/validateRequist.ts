import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validateRequist = (zodSchema:AnyZodObject) => {

    return async (req:Request, res:Response, next:NextFunction) => {

        try{
            await zodSchema.parseAsync({
                body: req.body
             })

             next()
             
        }catch(err){
            next(err)
        }
    }

}

export default validateRequist;