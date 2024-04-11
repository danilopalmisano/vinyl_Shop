import { authMiddleware } from "./../middleware/authMiddleware";
import { Router } from "express";
import {
	register,
	logIn,
	logOut,
	authInfo,
} from "../controllers/user.controller";
import { checkRoleMiddleware } from "../middleware/checkRoleMiddleware";

export const router = Router();

router.post("/register", register);
router.post("/admin/register", register);
router.post("/login", checkRoleMiddleware(["admin", "user"]), logIn);
router.get(
	"/logout",
	authMiddleware,
	checkRoleMiddleware(["admin", "user"]),
	logOut
);
router.get(
	"/user",
	authMiddleware,
	checkRoleMiddleware(["admin", "user"]),
	authInfo
);
