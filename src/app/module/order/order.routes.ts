import express from "express";
import { orderController } from "./order.controller";

const router = express.Router();

router.post("/create", orderController.createOrder);      // Create Order
router.get("/all", orderController.getOrders);     // Get All Orders (Admin)
router.get("/single/:id", orderController.getOrderById);      // Get Single Order
router.put("/:id/status", orderController.updateOrderStatus); // Update Order Status (Admin)

export const orderRoute = router;
