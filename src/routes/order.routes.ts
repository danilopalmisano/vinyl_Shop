import { authMiddleware } from "./../middleware/authMiddleware";
import { Router } from "express";
import {
	showOrders,
	getOrderById,
	createOrder,
	updateOrderStatus,
	deletedOrderStatus,
} from "../controllers/order.controller";
import { checkRoleMiddleware } from "../middleware/checkRoleMiddleware";

export const router = Router();

router.get(
	"/",
	authMiddleware,
	checkRoleMiddleware(["user", "admin"]),
	showOrders,
);
router.get(
	'/:id',
	authMiddleware,
	checkRoleMiddleware(['admin', 'user']),
	getOrderById
);
router.post("/", authMiddleware, checkRoleMiddleware(["user"]), createOrder);
router.put(
	'/:id',
	authMiddleware,
	checkRoleMiddleware(['admin']),
	updateOrderStatus
);
router.delete(
	'/:id',
	authMiddleware,
	checkRoleMiddleware(['admin']),
	deletedOrderStatus
);