import mongoose from "mongoose";

const doctorProfileSchema = new mongoose.Schema(
  {
    docId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
      unique: true,
    },

     // STEP 1: Personal Info
    personalInfo: {
      dateOfBirth: { type: String, required: true },
      address: { type: String }, // since form uses string, not array
    },

    // STEP 2: Professional Info
    professionalInfo: {
      languages: [{ type: String }], // array of strings
      bio: { type: String },
    },



    // STEP 3: Education
    education: [
      {
        degree: { type: String, required: true }, // MD, Residency, Fellowship
        institution: { type: String, required: true }, // Harvard, Mayo, etc.
        field: { type: String }, // Doctor of Medicine, Cardiology, etc.
        startYear: { type: Number },
        endYear: { type: Number },
      },
    ],

    // STEP 3: Experience
    experience: [
      {
        title: { type: String, default: "" }, // Senior Cardiologist
        hospital: { type: String, default: "" }, // City General Hospital
        description: { type: String }, // short role description
        startYear: { type: String },
        endYear: { type: String }, // "Present" or year
      },
    ],
    certifications: [
      {
        name: { type: String, default: "" },
        issuer: { type: String, default: "" },
        year: { type: String, default: "" },
        validUntil: { type: String, default: "" },
      },
    ],
  },
  { timestamps: true },
);

const DoctorProfile = mongoose.model("DoctorProfile", doctorProfileSchema);
export default DoctorProfile;
