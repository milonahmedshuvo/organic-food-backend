import express from "express";
import { orderController } from "./order.controller";
import auth from "../../middlewares/authGard";
import { user_role } from "../../middlewares/types";

const router = express.Router();

router.post("/create", auth(user_role.customer),  orderController.createOrder);      // Create Order
router.get("/all", auth(user_role.admin), orderController.getOrders);     // Get All Orders (Admin)
router.get("/single/:id", orderController.getOrderById);      // Get Single Order
router.put("/:id/status", orderController.updateOrderStatus); // Update Order Status (Admin)

export const orderRoute = router;
