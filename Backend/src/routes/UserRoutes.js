import express from "express";
import { protect } from "../middleware/checkAuth";
import { getProfile, updateProfile } from "../controller/UserController";

const router = express.Router();

router.get("/profile", protect, getProfile);
router.post("/profile/update", protect, updateProfile);

export default router;