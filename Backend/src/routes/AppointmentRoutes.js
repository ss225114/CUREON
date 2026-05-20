import express from "express";
import {
  acceptAppointment,
  bookAppointment,
  completeAppointment,
  fetchAvailability,
  getAcceptedAppointments,
  getAllDoctorAppointments,
  getMyAppointments,
  getPendingAppointments,
  rejectAppointment,
} from "../controller/AppointmentController.js";
import { protect } from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/:doctorId/availability", protect, fetchAvailability);

router.post("/book", protect, bookAppointment);

router.get("/doctor/pending", protect, getPendingAppointments);

router.get("/doctor/accepted", protect, getAcceptedAppointments);

router.get("/doctor/all-appointments", protect, getAllDoctorAppointments);

router.patch("/:appointmentId/accept", protect, acceptAppointment);

router.patch("/:appointmentId/reject", protect, rejectAppointment);

router.get("/my-appointments", protect, getMyAppointments);

router.patch("/:appointmentId/complete", protect, completeAppointment);

export default router;
