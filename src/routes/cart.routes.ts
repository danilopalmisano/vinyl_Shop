import { Router } from "express";
import {
	addProductToCart,
	emptyCart,
	getCart,
	removeProductFromCart,
} from "../controllers/cart.controller";
import { authMiddleware } from "../middleware/authMiddleware";
import { checkRoleMiddleware } from "../middleware/checkRoleMiddleware";

export const router = Router();

//get User cart
router.get("/", authMiddleware, checkRoleMiddleware(["user"]), getCart);
//add a product to a User cart
router.post(
	"/add/:id",
	authMiddleware,
	checkRoleMiddleware(["user"]),
	addProductToCart
);
//remove a product from a User cart
router.delete(
	"/remove/:id",
	authMiddleware,
	checkRoleMiddleware(["user"]),
	removeProductFromCart
);
//empty a User cart
router.delete(
	"/clear",
	authMiddleware,
	checkRoleMiddleware(["user"]),
	emptyCart
);
