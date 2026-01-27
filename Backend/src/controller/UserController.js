import User from "../models/User"
import UserProfile from "../models/UserProfile";

export const getProfile = async(req, res) => {
    const { id }= req.user;
    
    try{
        const user = await User.findOne({ _id: id })
        const userData = await UserProfile.findOne({ userId: id });
        return res.status(200).json({
            userData,
        });
    } catch(err) {
        return res.status(500).json({
            err,
        });
    }
}

export const updateProfile = async(req, res) => {
    try {
    const userId = req.user.id;
    const personalInfo = req.body.personalInfo; 
    const emergencyContact = req.body.emergencyContact;
    const medicalHistory = req.body.medicalHistory;
    const currMedication = req.body.currMedication;
    if (!updates) {
      return res.status(400).json({ message: "No profile data provided" });
    }

    const updatedProfile = await UserProfile.findOneAndUpdate(
      { userId },
      {
        $set: {
          ...(personalInfo && { personalInfo }),
          ...(emergencyContact && { emergencyContact }),
          ...(medicalHistory && { medicalHistory }),
          ...(currMedication && { currMedication }),
        }
      },
      { new: true, upsert: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedProfile
    });

  } catch (error) {
    console.error("Update Profile Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
}