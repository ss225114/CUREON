import mongoose from "mongoose";

const doctorSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      enum: ["MD", "DO", "PHD", "DDS", "DMD", "DNP", "PHARMD", "UNKNOWN"],
      required: true,
    },
    specialization: {
      type: [String],
      enum: [
        "GENERAL_PHYSICIAN",
        "INTERNAL_MEDICINE",
        "PEDIATRICS",
        "GYNECOLOGY",
        "OBSTETRICS",
        "CARDIOLOGY",
        "DERMATOLOGY",
        "ORTHOPEDICS",
        "NEUROLOGY",
        "NEUROSURGERY",
        "PSYCHIATRY",
        "PSYCHOLOGY",
        "ENT",
        "OPHTHALMOLOGY",
        "GASTROENTEROLOGY",
        "PULMONOLOGY",
        "ENDOCRINOLOGY",
        "NEPHROLOGY",
        "UROLOGY",
        "ONCOLOGY",
        "HEMATOLOGY",
        "RHEUMATOLOGY",
        "GENERAL_SURGERY",
        "PLASTIC_SURGERY",
        "VASCULAR_SURGERY",
        "ANESTHESIOLOGY",
        "RADIOLOGY",
        "PATHOLOGY",
        "EMERGENCY_MEDICINE",
        "FAMILY_MEDICINE",
        "GERIATRICS",
        "INFECTIOUS_DISEASE",
        "SPORTS_MEDICINE",
        "PAIN_MANAGEMENT",
        "DENTISTRY",
        "ORTHODONTICS",
        "AYURVEDA",
        "HOMEOPATHY",
        "UNANI",
        "OTHER",
      ],
      required: true,
    },
    govtId: {
      type: Number,
      required: true,
      unique: true,
    },
    doctorLicenseNo: {
      type: String,
      required: true,
      unique: true,
    },
    council: {
      type: String,
      required: true,
    },
    registrationNo: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    // token: {
    //   type: String,
    //   default: "",
    // },
    // otpGeneratedTime: {
    //   type: Date,
    // },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
