import express from "express";
import {
  doctorLogin,
  doctorRegister,
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

router.post("/doctor/register",doctorRegister);

router.post("/doctor/login",doctorLogin);

export default router;
