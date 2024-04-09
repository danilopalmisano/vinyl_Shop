import { authMiddleware } from "./../middleware/authMiddleware";
import { Router } from "express";
import {
	register,
	logIn,
	logOut,
	authInfo,
} from "../controllers/user.controller";

export const router = Router();

router.post("/register", register);
router.post("/admin/register", register);
router.post("/login", logIn);
router.get("/logout", authMiddleware, logOut);
router.get("/user", authMiddleware, authInfo);
