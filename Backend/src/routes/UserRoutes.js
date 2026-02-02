import express from "express";
import { protect } from "../middleware/checkAuth.js";
import { getProfile, updateProfile } from "../controller/UserController.js";

const router = express.Router();

router.get("/profile", protect, getProfile);
router.post("/profile/update", protect, updateProfile);

export default router;