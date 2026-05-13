import express from "express";
import { protect } from "../middleware/checkAuth.js";
import { getProfile, updateDoctorModel, updateProfile } from "../controller/DoctorController.js";

const router = express.Router();

router.get("/profile", protect, getProfile);
router.post("/profile/update", protect, updateProfile);
router.post("/model/update", protect, updateDoctorModel);

export default router;