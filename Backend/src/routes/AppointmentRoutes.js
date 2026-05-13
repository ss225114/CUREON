import express from "express";
import {
  acceptAppointment,
  bookAppointment,
  completeAppointment,
  fetchAvailability,
  getDoctorAppointments,
  getMyAppointments,
  getPendingAppointments,
  rejectAppointment,
} from "../controller/AppointmentController.js";
import { protect } from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/:doctorId/availability", protect, fetchAvailability);

router.post("/book", protect, bookAppointment);

router.get("/doctor/pending", protect, getPendingAppointments);

router.get("/doctor/accepted", protect, getDoctorAppointments);

router.patch("/:appointmentId/accept", protect, acceptAppointment);

router.patch("/:appointmentId/reject", protect, rejectAppointment);

router.get("/my-appointments", protect, getMyAppointments);

router.patch("/complete/:appointmentId", protect, completeAppointment);

export default router;
