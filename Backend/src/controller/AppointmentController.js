import {
  appointmentCancellationMail,
  appointmentConfirmationMail,
  feedbackMail,
} from "../lib/emailService.js";
import Appointment from "../models/Appointment.js";
import Slot from "../models/Slot.js";
import User from "../models/User.js";
import UserProfile from "../models/UserProfile.js";

export const fetchAvailability = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { date } = req.query;

    // Validate date
    if (!date) {
      return res.status(400).json({
        error: "Date is required",
      });
    }

    const selectedDate = new Date(date);

    // Start of day
    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);

    // End of day
    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);

    // Fetch all slots for that doctor + date
    const slots = await Slot.find({
      doctorId,
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }).sort({ startTime: 1 });

    res.status(200).json(slots);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to fetch doctor availability",
    });
  }
};

export const bookAppointment = async (req, res) => {
  try {
    const patientId = req.user.userID;

    const { doctorId, slotId, appointmentType, date, symptoms } = req.body;

    // check slot exists
    const slot = await Slot.findById(slotId);

    if (!slot) {
      return res.status(404).json({
        error: "Slot not found",
      });
    }

    // prevent duplicate request by same patient
    const existing = await Appointment.findOne({
      patientId,
      slotId,
      status: {
        $in: ["pending", "accepted"],
      },
    });

    if (existing) {
      return res.status(400).json({
        error: "Appointment already requested",
      });
    }

    // create pending appointment
    const appointment = await Appointment.create({
      patientId,
      doctorId,
      slotId,
      appointmentType,
      date,
      symptoms,
      status: "pending",
    });

    res.status(201).json({
      message: "Appointment request sent",
      appointment,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to book appointment",
    });
  }
};

export const getPendingAppointments = async (req, res) => {
  try {
    const doctorId = req.user.userID;

    const appointments = await Appointment.find({
      doctorId,
      status: "pending",
    })
      .populate("patientId", "fullName email")
      .populate("slotId");

    res.json(appointments);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to fetch appointments",
    });
  }
};

export const acceptAppointment = async (req, res) => {
  try {
    const doctorId = req.user.userID;

    const { appointmentId } = req.params;

    const appointment = await Appointment.findOne({
      _id: appointmentId,
      doctorId,
    }).populate("patientId", "fullName email");

    if (!appointment) {
      return res.status(404).json({
        error: "Appointment not found",
      });
    }

    // already handled
    if (appointment.status !== "pending") {
      return res.status(400).json({
        error: "Appointment already processed",
      });
    }

    // get slot
    const slot = await Slot.findById(appointment.slotId);

    if (!slot) {
      return res.status(404).json({
        error: "Slot not found",
      });
    }

    // if already booked
    if (slot.isBooked) {
      return res.status(400).json({
        error: "Slot already booked",
      });
    }

    // ACCEPT selected appointment
    appointment.status = "accepted";

    await appointment.save();

    // BOOK slot
    slot.isBooked = true;

    slot.appointment_id = appointment._id;

    await slot.save();

    // FIND all pending appointments that will be rejected
    const rejectedAppointments = await Appointment.find({
      slotId: slot._id,
      _id: { $ne: appointment._id },
      status: "pending",
    }).populate("patientId", "email fullName");

    // REJECT all others for same slot
    await Appointment.updateMany(
      {
        slotId: slot._id,
        _id: { $ne: appointment._id },
        status: "pending",
      },
      {
        $set: {
          status: "rejected",
          rejectionReason: "Slot booked by another patient",
        },
      },
    );

    // SEND rejection mails
    for (const rejected of rejectedAppointments) {
      await appointmentRejectionMail(
        rejected.patientId.email,
        slot.startTime,
        slot.dayOfWeek,
      );
    }

    await appointmentConfirmationMail(
      appointment.patientId.email,
      slot.startTime,
      slot.dayOfWeek,
    );

    res.json({
      message: "Appointment accepted",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to accept appointment",
    });
  }
};

export const rejectAppointment = async (req, res) => {
  try {
    const doctorId = req.user.userID;

    const { appointmentId } = req.params;

    const { rejectionReason } = req.body;

    const appointment = await Appointment.findOne({
      _id: appointmentId,
      doctorId,
    });

    if (!appointment) {
      return res.status(404).json({
        error: "Appointment not found",
      });
    }

    if (appointment.status !== "pending") {
      return res.status(400).json({
        error: "Appointment already processed",
      });
    }

    appointment.status = "rejected";

    appointment.rejectionReason = rejectionReason || "Rejected by doctor";

    await appointment.save();

    res.json({
      message: "Appointment rejected",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to reject appointment",
    });
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    const patientId = req.user.userID;

    // Start of today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const appointments = await Appointment.find({
      patientId,
    })
      .populate("doctorId", "fullName email")
      .populate({
        path: "slotId",
        match: {
          date: { $gte: today },
        },
      })
      .sort({ createdAt: -1 });

    // Remove appointments where slotId became null after match filtering
    const filteredAppointments = appointments.filter(
      (appointment) => appointment.slotId,
    );

    res.json(filteredAppointments);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to fetch appointments",
    });
  }
};

export const getAcceptedAppointments = async (req, res) => {
  try {
    const doctorId = req.user.userID;

    let appointments = await Appointment.find({
      doctorId,
      status: "accepted",
    })
      .populate("patientId", "fullName email")
      .populate("slotId")
      .sort({ createdAt: -1 });

    appointments = await Promise.all(
      appointments.map(async (appointment) => {
        const userProfile = await UserProfile.findOne({
          userId: appointment.patientId._id,
        });

        return {
          ...appointment.toObject(),
          patientId: {
            ...appointment.patientId.toObject(),
            userProfile,
          },
        };
      }),
    );

    res.json(appointments);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to fetch appointments",
    });
  }
};

export const getAllDoctorAppointments = async (req, res) => {
  try {
    const doctorId = req.user.userID;

    let appointments = await Appointment.find({
      doctorId,
    })
      .populate("patientId", "fullName email")
      .populate("slotId");

    appointments = await Promise.all(
      appointments.map(async (appointment) => {
        const userProfile = await UserProfile.findOne({
          userId: appointment.patientId._id,
        });

        return {
          ...appointment.toObject(),
          patientId: {
            ...appointment.patientId.toObject(),
            userProfile,
          },
        };
      }),
    );

    res.json(appointments);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to fetch appointments",
    });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const appointment = await Appointment.findOne({
      _id: appointmentId,
    }).populate("patientId", "fullName email");

    if (!appointment) {
      return res.status(404).json({
        error: "Appointment not found",
      });
    }

    appointment.status = "cancelled";
    await appointment.save();

    // Free slot
    await Slot.findByIdAndUpdate(appointment.slotId, {
      isBooked: false,
      isComplete: false,
      appointment_id: null,
    });

    const slot = await Slot.findById(appointment.slotId);

    await appointmentCancellationMail(
      appointment.patientId.email,
      slot.startTime,
      slot.dayOfWeek,
    );

    res.json({
      message: "Appointment cancelled successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to cancel appointment",
    });
  }
};

export const completeAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({
        error: "Appointment not found",
      });
    }

    appointment.status = "completed";

    const slot = await Slot.findById(appointment.slotId);

    slot.isComplete = true;

    await appointment.save();

    await slot.save();

    const user = await User.findOne({ _id: appointment.patientId });

    await feedbackMail(user.fullName, user.email, appointment.doctorId);

    res.status(200).json({
      message: "Appointment completed",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to complete appointment",
    });
  }
};

// export const getDoctorAppointments = async (req, res) => {
//   try {
//     const doctorId = req.user.userID;

//     const appointments = await Appointment.find({
//       doctorId,
//       status: "accepted",
//     })
//       .populate("patientId", "fullName email")
//       .populate("slotId")
//       .sort({ createdAt: -1 });

//     res.json(appointments);
//   } catch (err) {
//     console.error(err);

//     res.status(500).json({
//       error: "Failed to fetch appointments",
//     });
//   }
// };
