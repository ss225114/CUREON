import mongoose from "mongoose";

const emergencyContactSchema = new mongoose.Schema(
  {
    name: { type: String },
    phone: { type: String },
    relationship: { type: String },
  },
  { _id: false },
);

const medicationSchema = new mongoose.Schema(
  {
    name: { type: String },
    dosage: { type: String },
    frequency: { type: String },
  },
  { _id: false },
);

const userProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // STEP 1: Personal Info
    phone: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other", "Prefer not to say"],
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: true,
    },
    height: { type: Number },
    weight: { type: Number },

    // STEP 2: Emergency + Medical
    emergencyContact: emergencyContactSchema,
    medicalConditions: [{ type: String }],
    allergies: [{ type: String }],

    // STEP 3: Medications
    medications: [medicationSchema],

    // isProfileComplete: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  { timestamps: true },
);

const UserProfile = mongoose.model("UserProfile", userProfileSchema);
export default UserProfile;
