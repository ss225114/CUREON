import express from "express";
import {
  adminLogin,
  getAllDoctors,
  rejectDoctor,
  verifyDoctor,
} from "../controller/AdminController";
import { protect } from "../middleware/checkAuth";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/all-doctors", protect, getAllDoctors);
router.post("/verify-doctor", protect, verifyDoctor);
router.delete("/delete-doctor", protect, rejectDoctor);

export default router;
