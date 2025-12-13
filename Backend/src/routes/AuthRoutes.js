import express from "express";
import {
  forget_password,
  login,
  refreshToken,
  register,
  resendOtp,
  reset_password,
  verifyEmail,
} from "../controller/AuthController.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify-mail", verifyEmail);
router.post("/login", login);

router.post("/forget-password", forget_password);

router.post("/reset-password", reset_password);

router.post("/refresh", refreshToken);

router.post("/resend-otp", resendOtp);

export default router;
