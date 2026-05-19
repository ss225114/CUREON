import mongoose from "mongoose";

const slotSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    dayOfWeek: {
      type: String,
      enum: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
    },

    startTime: { type: String },
    endTime: { type: String },

    isBooked: {
      type: Boolean,
      default: false,
    },

    appointment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      default: null,
    },

    isComplete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Slot", slotSchema);
