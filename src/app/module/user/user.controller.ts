import { NextFunction, Request, Response } from "express";
import { userServices } from "./user.service";


const register = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const user = await userServices.registerFromDB(req.body)
      res.status(200).json({
        status: true,
        message: 'User registered successfully',
        data: user
      });
    } catch (error) {
      next(error);
    }
  };


export const userControllers = {
    register
}