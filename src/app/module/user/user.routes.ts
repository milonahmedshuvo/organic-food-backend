import express from "express";
import { userControllers } from "./user.controller";
const router = express.Router();



router.post("/register",userControllers.register );  
router.post("/login", );        

export const userRouters = router
