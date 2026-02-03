import User from "../models/User.js"
import UserProfile from "../models/UserProfile.js";

export const getProfile = async(req, res) => {
    const id = req.user.userID;
    
    try{
        const user = await User.findOne({ _id: id })
        const userData = await UserProfile.findOne({ userId: id });
        console.log(id);
        return res.status(200).json({
            name: user.fullName,
            email: user.email,
            userData: userData? userData : null,
        });
    } catch(err) {
        return res.status(500).json({
            error: err.message,
        });
    }
}

// export const updateProfile = async(req, res) => {
//     try {
//     const userId = req.user.id;
//     const personalInfo = req.body.personalInfo; 
//     const emergencyContact = req.body.emergencyContact;
//     if (!updates) {
//       return res.status(400).json({ message: "No profile data provided" });
//     }

//     const updatedProfile = await UserProfile.findOneAndUpdate(
//       { userId },
//       {
//         $set: {
//           ...(personalInfo && { personalInfo }),
//           ...(emergencyContact && { emergencyContact }),
//           ...(medicalHistory && { medicalHistory }),
//           ...(currMedication && { currMedication }),
//         }
//       },
//       { new: true, upsert: true, runValidators: true }
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Profile updated successfully",
//       data: updatedProfile
//     });

//   } catch (error) {
//     console.error("Update Profile Error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server error"
//     });
//   }
// }

export const updateProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.userID) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.userID;
    const user = await User.findOne({ _id: userId });
    const updates = req.body;

    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "No profile data provided",
      });
    }

    const updatedProfile = await UserProfile.findOneAndUpdate(
      { userId },
      {
        ...updates,
        isProfileComplete: true,
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
      name: user.fullName,
      email: user.email,
      userData: updatedProfile,
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};
