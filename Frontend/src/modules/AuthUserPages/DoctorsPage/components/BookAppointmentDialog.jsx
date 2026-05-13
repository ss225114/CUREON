import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  FaCalendarAlt,
  FaClock,
  FaUserMd,
  FaVideo,
  FaPhone,
  FaHome,
} from "react-icons/fa";

import { useDoctors } from "../context/doctorsContext";

export default function BookAppointmentDialog({ doctor }) {
  const [open, setOpen] = useState(false);

  const [symptoms, setSymptoms] = useState([]);
  const [symptomInput, setSymptomInput] = useState("");

  const {
    availabilitySlots,
    availabilityLoading,
    fetchDoctorAvailability,

    bookingLoading,
    bookAppointment,

    selectedSlot,
    setSelectedSlot,

    selectedDate,
    setSelectedDate,

    getNext7Days,
  } = useDoctors();

  const next7Days = getNext7Days();

  const handleDateSelect = async (date) => {
    setSelectedDate(date);

    setSelectedSlot(null);

    await fetchDoctorAvailability(doctor._id, date);
  };

  const handleBooking = async () => {
    if (!selectedSlot) return;

    const result = await bookAppointment({
      doctorId: doctor._id,
      slotId: selectedSlot._id,
      appointmentType: "clinic",
      date: selectedDate,
      symptoms,
    });

    if (result.success) {
      alert("Appointment requested successfully. A mail will be sent on confirmation from the doctor's side.");

      setOpen(false);

      setSelectedSlot(null);

      setSymptoms([]);

      setSymptomInput("");
    } else {
      alert(result.error);
    }
  };

  useEffect(() => {
    if (open && !selectedDate) {
      const firstDate = next7Days[0].fullDate;

      setSelectedDate(firstDate);

      fetchDoctorAvailability(doctor._id, firstDate);
    }
    fetchDoctorAvailability(doctor._id, new Date().toISOString().split("T")[0]);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-[#293379] to-[#016b61] hover:from-[#3a4a9c] hover:to-[#027d70] text-white">
          <FaCalendarAlt className="mr-2" />
          Book Clinic Visit
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[95vw] max-w-3xl max-h-[90vh] overflow-y-auto scrollbar-hide bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#293379] dark:text-white flex items-center gap-2">
            <FaUserMd />
            Book Appointment with {doctor.fullName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Doctor Info */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#293379]/5 to-[#016b61]/5 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {doctor.fullName}
                </h3>

                <div className="flex flex-wrap gap-2 mt-2">
                  {(Array.isArray(doctor.specialization)
                    ? doctor.specialization
                    : [doctor.specialization]
                  ).map((spec, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900/30 text-[#293379] dark:text-blue-300"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold text-[#293379] dark:text-white">
                  ₹{doctor.consultationFee}
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Consultation Fee
                </p>
              </div>
            </div>
          </div>

          {/* Date Selector */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FaCalendarAlt className="text-[#016b61]" />

              <h4 className="font-semibold text-gray-900 dark:text-white">
                Select Date
              </h4>
            </div>

            <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
              {next7Days.map((day, index) => {
                const isSelected = selectedDate === day.fullDate;

                return (
                  <button
                    key={index}
                    onClick={() => handleDateSelect(day.fullDate)}
                    className={`p-3 rounded-xl border transition-all duration-200 ${
                      isSelected
                        ? "bg-gradient-to-r from-[#293379] to-[#016b61] text-white border-transparent shadow-lg"
                        : "border-gray-200 dark:border-gray-700 hover:border-[#293379] dark:hover:border-blue-500"
                    }`}
                  >
                    <div className="text-sm font-medium">{day.label}</div>

                    <div className="text-xl font-bold mt-1">
                      {day.dateNumber}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Slots */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FaClock className="text-[#016b61]" />

              <h4 className="font-semibold text-gray-900 dark:text-white">
                Available Slots
              </h4>
            </div>

            {availabilityLoading ? (
              <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                Loading slots...
              </div>
            ) : availabilitySlots.length === 0 ? (
              <div className="text-center py-10 border rounded-xl text-gray-500 dark:text-gray-400">
                No slots available for this day
              </div>
            ) : (
              <div className="flex flex-wrap gap-3">
                {availabilitySlots.map((slot) => {
                  const isSelected = selectedSlot?._id === slot._id;

                  return (
                    <button
                      key={slot._id}
                      onClick={() => setSelectedSlot(slot)}
                      disabled={slot.isBooked}
                      className={`px-4 py-2 rounded-full border transition-all duration-200 flex items-center gap-2 ${
                        slot.isBooked
                          ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                          : isSelected
                            ? "bg-gradient-to-r from-[#293379] to-[#016b61] text-white border-transparent"
                            : "bg-white dark:bg-gray-900 border-[#293379]/20 text-[#293379] dark:text-blue-300 hover:border-[#293379]"
                      }`}
                    >
                      <FaClock className="h-3 w-3" />
                      {slot.startTime}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Symptoms Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FaUserMd className="text-[#016b61]" />

              <h4 className="font-semibold text-gray-900 dark:text-white">
                Symptoms / Health Issues
              </h4>
            </div>

            <div className="space-y-4">
              {/* Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={symptomInput}
                  onChange={(e) => setSymptomInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();

                      const value = symptomInput.trim();

                      if (!value) return;

                      if (!symptoms.includes(value)) {
                        setSymptoms((prev) => [...prev, value]);
                      }

                      setSymptomInput("");
                    }
                  }}
                  placeholder="Type symptom and press Enter"
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:border-[#293379]"
                />

                <Button
                  type="button"
                  onClick={() => {
                    const value = symptomInput.trim();

                    if (!value) return;

                    if (!symptoms.includes(value)) {
                      setSymptoms((prev) => [...prev, value]);
                    }

                    setSymptomInput("");
                  }}
                  className="bg-gradient-to-r from-[#293379] to-[#016b61] text-white"
                >
                  Add
                </Button>
              </div>

              {/* Suggestions */}
              <div className="flex flex-wrap gap-2">
                {[
                  "Fever",
                  "Cold",
                  "Headache",
                  "Back Pain",
                  "Cough",
                  "Body Pain",
                  "Chest Pain",
                  "Skin Rash",
                  "Fatigue",
                ].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      if (!symptoms.includes(item)) {
                        setSymptoms((prev) => [...prev, item]);
                      }
                    }}
                    className="px-3 py-1.5 rounded-full border border-[#293379]/20 text-[#293379] dark:text-blue-300 hover:bg-[#293379]/10 transition-all"
                  >
                    {item}
                  </button>
                ))}
              </div>

              {/* Selected Symptoms */}
              {symptoms.length > 0 && (
                <div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Selected Symptoms
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {symptoms.map((symptom, index) => (
                      <div
                        key={index}
                        className="px-3 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 text-[#293379] dark:text-blue-300 border border-blue-200 dark:border-blue-800 flex items-center gap-2"
                      >
                        <span>{symptom}</span>

                        <button
                          type="button"
                          onClick={() =>
                            setSymptoms((prev) =>
                              prev.filter((_, i) => i !== index),
                            )
                          }
                          className="text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Appointment Type */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FaHome className="text-[#016b61]" />

              <h4 className="font-semibold text-gray-900 dark:text-white">
                Appointment Type
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Clinic */}
              <div className="p-4 rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 flex items-center gap-3">
                <FaHome className="text-green-600 dark:text-green-400" />

                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Clinic Visit
                  </p>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Physical consultation
                  </p>
                </div>
              </div>

              {/* Video */}
              <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 opacity-50 cursor-not-allowed flex items-center gap-3">
                <FaVideo />

                <div>
                  <p className="font-semibold">Video Call</p>

                  <p className="text-sm">Coming soon</p>
                </div>
              </div>

              {/* Phone */}
              <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 opacity-50 cursor-not-allowed flex items-center gap-3">
                <FaPhone />

                <div>
                  <p className="font-semibold">Phone Call</p>

                  <p className="text-sm">Coming soon</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>

            <Button
              disabled={!selectedSlot || bookingLoading}
              onClick={handleBooking}
              className="bg-gradient-to-r from-[#293379] to-[#016b61] hover:from-[#3a4a9c] hover:to-[#027d70] text-white"
            >
              {bookingLoading ? "Booking..." : "Confirm Booking"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
