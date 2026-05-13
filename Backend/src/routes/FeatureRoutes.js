import express from "express";
import { protect } from "../middleware/checkAuth.js";
import { getAllDoctors, getAllSpecializations, searchDoctors } from "../controller/FeatureController.js";

const router = express.Router();

router.post("/find-doctors", protect, searchDoctors);
router.get("/all-doctors", protect, getAllDoctors);
router.get("/specializations", protect, getAllSpecializations);

export default router;