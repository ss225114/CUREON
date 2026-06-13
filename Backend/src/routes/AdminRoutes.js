import express from "express";
import {
  adminLogin,
  getAllDoctors,
  getPendingRequests,
  rejectDoctor,
  verifyDoctor,
  getAllUsers
} from "../controller/AdminController.js";
import { protect } from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/all-doctors", protect, getAllDoctors);
router.get("/pending-verifications", protect, getPendingRequests);
router.post("/verify-doctor", protect, verifyDoctor);
router.delete("/delete-doctor", protect, rejectDoctor);
router.get("/all-users", protect, getAllUsers);

export default router;
