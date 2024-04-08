import { Router } from "express";

export const router = Router();

router.post("/register", registerUser);
router.post("/admin/register", registerAdmin);
router.post("/login", logIn);
router.get("/logout", logOut);
router.get("/user", authInfo);
