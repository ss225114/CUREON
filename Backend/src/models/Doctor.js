import mongoose from "mongoose";

const doctorSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      default: "",
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
    stateMedicalCouncil: {
      type: String,
      required: true,
    },
    doctorRegistrationNo: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    documents: {
      govtIdDocument: {
        type: String,
        default: "",
        required: true,
      },

      degreeCertificate: {
        type: String,
        default: "",
        required: true,
      },

      registrationCertificate: {
        type: String,
        default: "",
        required: true,
      },

      clinicProof: {
        type: String,
        default: "",
      },
    },
    rating: {
      type: Number,
      default: 0,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    clusterId: {
      type: Number,
      default: 0,
    },
    consultationFee: {
      type: Number,
      default: 100,
    },
    hospital: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
