import { Router } from "express";

export const router = Router();

router.get("/", showOrders); //to implement con layout
router.get("/:id", getOrderById);
router.post("/", createOrder);
router.put("/:id", updateOrderStatus); // by Admin
router.delete("/:id", deletedOrderStatus); //by Admin
