import mongoose from "mongoose";

const personalInfoSchema = new mongoose.Schema(
  {
    phone: { type: String },
    DOB: { type: Date },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    bloodGrp: { type: String },
    height: { type: Number },
    weight: { type: Number },
  },
  { _id: false }
);

const emergencyContactSchema = new mongoose.Schema(
  {
    name: { type: String },
    phone: { type: String },
    relation: { type: String },
  },
  { _id: false }
);

const medicalHistorySchema = new mongoose.Schema(
  {
    medical_cond: { type: String },
    allergies: { type: String },
  },

  { _id: false }
);

const currMedicationSchema = new mongoose.Schema(
  {
    medicationName: { type: String },
    dose: { type: String },
    frequency: { type: String },
  },

  { _id: false }
);

const userProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    personalInfo: personalInfoSchema,
    emergencyContact: emergencyContactSchema,
    medicalHistory: medicalHistorySchema,
    currMedication: currMedicationSchema,
  },
  { timestamps: true }
);

const UserProfile = mongoose.model("UserProfile", userProfileSchema);

export default UserProfile;