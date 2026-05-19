import express from "express";
import {
  createSchedule,
  getDoctorScheduleByDate,
  getSlotsByDate,
} from "../controller/ScheduleController.js";
import { protect } from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/", protect, createSchedule);
router.get("/slots", protect, getSlotsByDate);
router.get("/all", protect, getDoctorScheduleByDate);

export default router;
