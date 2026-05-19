import mongoose from "mongoose";

const doctorReviewSchema = new mongoose.Schema(
  {
    docId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    review: {
        type: String,
        default: "",
    }
  },
  { timestamps: true },
);

const DoctorReview = mongoose.model("DoctorReview", doctorReviewSchema);
export default DoctorReview;
