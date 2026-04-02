import mongoose from "mongoose";

const doctorClusterSchema = mongoose.Schema(
  {
    docId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    // experienceYears: { type: Number, default: 0 },
    // consultationFee: { type: Number, default: 0 },
    // rating: { type: Number, default: 0 },
    clusterId: {
        type: Number,
        default: 3
    }
  },
  { timestamps: true },
);

const DoctorCluster = mongoose.model("Doctor", doctorClusterSchema);

export default DoctorCluster;
