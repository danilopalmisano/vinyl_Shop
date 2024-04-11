import { Router } from "express";
import {
	addProduct,
	deleteProduct,
	showProducts,
	showSpecificProduct,
	updateProduct,
} from "../controllers/product.controller";
import { checkRoleMiddleware } from "../middleware/checkRoleMiddleware";
import { authMiddleware } from "../middleware/authMiddleware";

export const router = Router();

router.get("/", showProducts);
router.get("/:id", showSpecificProduct);
router.post("/", authMiddleware, checkRoleMiddleware(["admin"]), addProduct);
router.put(
	"/:id",
	authMiddleware,
	checkRoleMiddleware(["admin"]),
	updateProduct
);
router.delete(
	"/:id",
	authMiddleware,
	checkRoleMiddleware(["admin"]),
	deleteProduct
);
