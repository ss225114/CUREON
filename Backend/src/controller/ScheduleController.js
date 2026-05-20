import Schedule from "../models/Schedule.js";
import Slot from "../models/Slot.js";

// helper to find next matching weekday
const getNextDateForDay = (targetDay) => {
  const dayMap = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const today = new Date();

  const todayIndex = today.getDay(); // 0-6
  const targetIndex = dayMap.indexOf(targetDay);

  let diff = targetIndex - todayIndex;

  if (diff < 0) diff += 7; // next week

  const nextDate = new Date();
  nextDate.setDate(today.getDate() + diff);

  return nextDate;
};

export const createSchedule = async (req, res) => {
  try {
    const {
      day_of_week,
      start_time,
      end_time,
      slot_duration,
      break_times,
    } = req.body;

    const doctorId = req.user.userID;

    const targetDate = getNextDateForDay(day_of_week);

    // Save schedule
    const schedule = await Schedule.create({
      doctorId,
      date: targetDate,
      dayOfWeek: day_of_week,
      startTime: start_time,
      endTime: end_time,
      slotDuration: slot_duration,
      breakTimes: break_times || [],
    });

    // Generate slots ONLY for that day
    const slots = generateSlotsForSingleDay(
      schedule,
      doctorId,
      targetDate
    );

    // Save slots
    await Slot.insertMany(slots);

    res.status(201).json({
      message: "Schedule created and initial slots generated",
      schedule,
      slotsGeneratedFor: targetDate,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create schedule" });
  }
};

export const getSlotsByDate = async (req, res) => {
  try {
    const doctorId = req.user.userID;
    const { date } = req.query;

    const start = new Date(date);
    const end = new Date(date);
    end.setDate(end.getDate() + 1);

    const slots = await Slot.find({
      doctorId,
      date: {
        $gte: start,
        $lt: end,
      },
    }).sort({ startTime: 1 });

    res.json(slots);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch slots" });
  }
};

export const getDoctorScheduleByDate = async (req, res) => {
  try {
    const doctorId = req.user.userID;
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        error: "Date is required",
      });
    }

    const selectedDate = new Date(date);

    selectedDate.setHours(0, 0, 0, 0);

    const nextDay = new Date(selectedDate);

    nextDay.setDate(nextDay.getDate() + 1);

    const slots = await Slot.find({
      doctorId,
      date: {
        $gte: selectedDate,
        $lt: nextDay,
      },
    }).sort({ startTime: 1 });

    if (!slots.length) {
      return res.status(200).json({
        working: false,
        timings: [],
      });
    }

    const timings = slots.map((slot) => ({
      startTime: slot.startTime,
      endTime: slot.endTime,
    }));

    res.status(200).json({
      working: true,
      timings,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to fetch schedule",
    });
  }
};

const generateSlotsForSingleDay = (schedule, doctorId, date) => {
  const slots = [];

  const start = convertToMinutes(schedule.startTime);
  const end = convertToMinutes(schedule.endTime);
  const duration = schedule.slotDuration;

  const breakRanges = (schedule.breakTimes || []).map((b) => ({
    start: convertToMinutes(b.start),
    end: convertToMinutes(b.end),
  }));

  for (let time = start; time + duration <= end; time += duration) {
    const isBreak = breakRanges.some(
      (b) => time >= b.start && time < b.end
    );

    if (isBreak) continue;

    slots.push({
      doctorId,
      date,
      dayOfWeek: schedule.dayOfWeek,
      startTime: convertTo12Hour(time),
      endTime: convertTo12Hour(time + duration),
    });
  }

  return slots;
};

const convertToMinutes = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const convertTo12Hour = (minutes) => {
  let h = Math.floor(minutes / 60);
  let m = minutes % 60;

  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;

  return `${h}:${m.toString().padStart(2, "0")} ${ampm}`;
};