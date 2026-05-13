import DoctorProfile from "../models/DoctorPrrofile.js";
import Doctor from "../models/Doctor.js";

export const getProfile = async (req, res) => {
  const id = req.user.userID;

  try {
    const doctor = await Doctor.findOne({ _id: id });
    const docData = await DoctorProfile.findOne({ docId: id });
    console.log(id);
    return res.status(200).json({
      doctor,
      docData: docData ? docData : null,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.userID) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const docId = req.user.userID;
    const doctor = await Doctor.findOne({ _id: docId });
    const updates = req.body;

    console.log("BODY:", req.body);
    

    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "No profile data provided",
      });
    }

    const updatedProfile = await DoctorProfile.findOneAndUpdate(
      { docId },
      {
        ...updates,
        // isProfileComplete: true,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      },
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      doctor,
      docData: updatedProfile,
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

export const updateDoctorModel = async (req, res) => {
  try {
    if (!req.user || !req.user.userID) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const docId = req.user.userID;
    const doctor = await Doctor.findOne({ _id: docId });
    const { hospital, consultationFee } = req.body;

    const updatedModel = await Doctor.findOneAndUpdate(
      { _id: docId },
      {
        $set: {
          hospital,
          consultationFee,
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      },
    );

    return res.status(200).json({
      success: true,
      message: "Doctor model updated successfully",
      updatedModel,
    });
  } catch (error) {
    console.error("Update Model Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};
