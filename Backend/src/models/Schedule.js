import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
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
    required: true,
  },

  startTime: { type: String }, // "09:00"
  endTime: { type: String }, // "17:00"

  slotDuration: {
    type: Number, // minutes
    default: 60,
  },

  breakTimes: [
    {
      start: String, // "13:00"
      end: String, // "14:00"
    },
  ],
});

export default mongoose.model("Schedule", scheduleSchema);
