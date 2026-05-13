import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    slotId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Slot",
      required: true,
    },

    appointmentType: {
      type: String,
      enum: ["clinic", "video", "phone"],
      default: "clinic",
    },

    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "rejected",
        "cancelled",
        "completed",
        "missed",
      ],
      default: "pending",
    },

    rejectionReason: {
      type: String,
      default: "",
    },

    symptoms: {
      type: [String],
      default: [],
    },

    date: {
      type: Date,
      required: true,
    },

    bookedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Appointment", appointmentSchema);