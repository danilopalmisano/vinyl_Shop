import { authMiddleware } from "./../middleware/authMiddleware";
import { Router } from "express";
import {
	showOrders,
	getOrderById,
	createOrder,
	updateOrderStatus,
	deletedOrderStatus,
} from "../controllers/order.controller";

export const router = Router();

router.get("/", showOrders); //to implement con layout
router.get("/:id", getOrderById);
router.post("/", authMiddleware, createOrder);
router.put("/:id", updateOrderStatus); // by Admin
router.delete("/:id", deletedOrderStatus); //by Admin
