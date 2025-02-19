import express from "express";
import { userControllers } from "./user.controller";
import validateRequist from "../../middlewares/validateRequist";
import { userValidations } from "./user.validation";
const router = express.Router();



router.post("/register",validateRequist(userValidations.createUserSchema), userControllers.register );  
router.post("/login", validateRequist(userValidations.loginUserSchema),  userControllers.login );        

export const userRouters = router
