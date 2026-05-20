import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// const DOCTOR = {
//   name: "Dr. Arjun Mehta",
//   specialty: "Cardiologist",
//   avatar: "AM",
// };
const ratingLabels = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

function StarIcon({ filled, hovered }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`w-9 h-9 transition-all duration-150 ${filled || hovered ? "scale-110" : "scale-100"}`}
      fill={filled || hovered ? "#F59E0B" : "none"}
      stroke={filled || hovered ? "#F59E0B" : "#CBD5E1"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export default function DoctorFeedbackForm() {
  const [doctor, setDoctor] = useState({});
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Extract token from URL query params
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("doc");

  const getDoctor = async (doc_id) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/feedback/get/${doc_id}`,
      );
      console.log(res);

      setDoctor(res.data.doctor);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log(id);

    if (id) {
      console.log("calling function");

      getDoctor(id);
    }
  }, []);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (rating === 0 || feedback.trim() === "") return;

    try {
      setLoading(true);
      setError("");

      const res = await axios.post("http://localhost:5000/feedback/submit", {
        id,
        rating,
        review: feedback,
      });

      console.log(res.data);

      if (res.data.success) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);

      setError(err?.response?.data?.message || "Failed to submit feedback");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setRating(0);
    setHoveredStar(0);
    setFeedback("");
    setSubmitted(false);
  };

  const isFormValid = rating > 0 && feedback.trim().length > 0;

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-slate-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-xl p-12 max-w-md w-full text-center border border-slate-100">
          <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-teal-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-slate-800 mb-2 tracking-tight">
            Thank You!
          </h2>
          <p className="text-slate-500 mb-2 text-sm leading-relaxed">
            Your feedback for{" "}
            <span className="font-medium text-slate-700">
              {doctor.fullName}
            </span>{" "}
            has been submitted.
          </p>
          <div className="flex justify-center gap-1 my-4">
            {[1, 2, 3, 4, 5].map((s) => (
              <StarIcon key={s} filled={s <= rating} />
            ))}
          </div>
          <p className="text-slate-400 text-xs mb-8 italic">"{feedback}"</p>
          <button
            onClick={handleReset}
            className="w-full py-3 rounded-xl bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition-colors tracking-wide"
          >
            Submit Another Feedback
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-teal-600 text-white px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase mb-4">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            Patient Feedback
          </div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight mb-1">
            Share Your Experience
          </h1>
          <p className="text-slate-400 text-sm">
            Your feedback helps us improve our care
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600" />

          <div className="p-8 space-y-7">
            {/* Static Doctor Card */}
            <div className="flex items-center gap-4 bg-slate-50 rounded-2xl px-5 py-4 border border-slate-100">
              <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-sm font-bold text-teal-700 shrink-0">
                {doctor?.fullName?.substring(0, 2)}
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-0.5">
                  Your Doctor
                </p>
                <p className="font-semibold text-slate-800 text-base leading-tight">
                  {doctor?.fullName}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {(Array.isArray(doctor?.specialization)
                    ? doctor.specialization
                    : [doctor.specialization]
                  )
                    .slice(0, 3)
                    .map((spec, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm font-medium rounded-full
                        bg-gradient-to-r from-blue-50 to-indigo-50
                        dark:from-blue-900/20 dark:to-indigo-900/20
                        text-[#293379] dark:text-blue-400
                        border border-blue-200 dark:border-blue-800"
                      >
                        {spec?.replace(/_/g, " ")}
                      </span>
                    ))}
                </div>
              </div>
              <div className="ml-auto">
                <svg
                  className="w-5 h-5 text-teal-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
            </div>

            <div className="border-t border-slate-100" />

            {/* Star Rating */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
                Rate Your Experience
              </label>
              <div className="flex flex-col items-center gap-3">
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      onClick={() => setRating(star)}
                      className="focus:outline-none"
                      aria-label={`Rate ${star} stars`}
                    >
                      <StarIcon
                        filled={star <= rating}
                        hovered={star <= hoveredStar && star > rating}
                      />
                    </button>
                  ))}
                </div>
                <div className="h-5">
                  {(hoveredStar > 0 || rating > 0) && (
                    <span
                      className={`text-sm font-semibold transition-all ${
                        (hoveredStar || rating) >= 4
                          ? "text-amber-500"
                          : (hoveredStar || rating) >= 3
                            ? "text-slate-600"
                            : "text-rose-400"
                      }`}
                    >
                      {ratingLabels[hoveredStar || rating]}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100" />

            {/* Feedback Text */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                Your Feedback
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Tell us about your visit — the care you received, how you were treated, and anything we can do better..."
                rows={4}
                className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 text-sm text-slate-700 placeholder-slate-300 resize-none focus:outline-none focus:ring-2 focus:ring-teal-100 focus:border-teal-400 transition-all leading-relaxed"
              />
              <div className="flex justify-end mt-1.5">
                <span
                  className={`text-xs ${feedback.length > 400 ? "text-rose-400" : "text-slate-300"}`}
                >
                  {feedback.length} / 500
                </span>
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={!isFormValid || loading}
              className={`w-full py-4 rounded-2xl text-sm font-semibold tracking-wide transition-all duration-200 ${
                isFormValid && !loading
                  ? "bg-teal-600 text-white hover:bg-teal-700 shadow-lg shadow-teal-100 hover:shadow-teal-200 active:scale-[0.98]"
                  : "bg-slate-100 text-slate-300 cursor-not-allowed"
              }`}
            >
              {loading
                ? "Submitting..."
                : isFormValid
                  ? "Submit Feedback →"
                  : "Complete All Fields to Submit"}
            </button>

            {error && (
              <p className="text-center text-sm text-red-500 mt-3">{error}</p>
            )}

            {!isFormValid && (
              <p className="text-center text-xs text-slate-300 -mt-4">
                {rating === 0 ? "Give a star rating" : "Write your feedback"} to
                continue
              </p>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          Your feedback is confidential and helps us serve you better.
        </p>
      </div>
    </div>
  );
}
