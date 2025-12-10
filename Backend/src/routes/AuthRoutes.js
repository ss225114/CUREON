import express from "express"
import { forget_password, login, refreshToken, register, reset_password, verifyEmail } from "../controller/AuthController.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify-mail", verifyEmail);
router.post("/login", login);

router.post("/forget-password", forget_password);

router.get("/reset-password", reset_password);

router.post("/refresh", refreshToken);

export default router;