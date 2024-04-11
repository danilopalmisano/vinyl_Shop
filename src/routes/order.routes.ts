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

router.get("/", checkRoleMiddleware(["admin", "user"]), showOrders);
router.get("/:id", checkRoleMiddleware(["admin", "user"]), getOrderById);
router.post("/", authMiddleware, checkRoleMiddleware(["user"]), createOrder);
router.put("/:id", checkRoleMiddleware(["admin"]), updateOrderStatus); //to implement
router.delete("/:id", checkRoleMiddleware(["admin"]), deletedOrderStatus); //to implement
