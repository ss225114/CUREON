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

// import User from "../models/User.js";
// import UserProfile from "../models/UserProfile.js";
// import multer from "multer";
// import path from "path";
// import fs from "fs";

// // Configure multer storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const uploadDir = "uploads/avatars/";

//     // Create directory if it doesn't exist
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }

//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, "avatar-" + uniqueSuffix + path.extname(file.originalname));
//   },
// });

// // File filter for images only
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = [
//     "image/jpeg",
//     "image/jpg",
//     "image/png",
//     "image/gif",
//     "image/webp",
//   ];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only image files are allowed!"), false);
//   }
// };

// // Initialize multer
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
//   fileFilter: fileFilter,
// });

// // Middleware for handling file upload
// export const uploadAvatar = upload.single("avatar");

// export const updateAvatar = async (req, res) => {
//   try {
//     if (!req.user || !req.user.userID) {
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized",
//       });
//     }

//     const userId = req.user.userID;

//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: "No image file provided",
//       });
//     }

//     // Generate the URL for the uploaded file
//     // If you're using a CDN or different storage, adjust this accordingly
//     const avatarUrl = `/user/avatar/${req.file.filename}`;

//     // Update user profile with new avatar URL
//     const updatedProfile = await UserProfile.findOneAndUpdate(
//       { userId },
//       {
//         $set: { avatar: avatarUrl },
//       },
//       {
//         new: true,
//         upsert: true,
//         runValidators: true,
//       },
//     );

//     // Optionally, also update the User model if it has an avatar field
//     await User.findOneAndUpdate(
//       { _id: userId },
//       {
//         $set: { avatar: avatarUrl },
//       },
//       { new: true },
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Avatar updated successfully",
//       avatarUrl: avatarUrl,
//       profile: updatedProfile,
//     });
//   } catch (error) {
//     console.error("Avatar Upload Error:", error);

//     // Clean up uploaded file if error occurred
//     if (req.file && req.file.path) {
//       fs.unlink(req.file.path, (unlinkError) => {
//         if (unlinkError) {
//           console.error("Error deleting uploaded file:", unlinkError);
//         }
//       });
//     }

//     return res.status(500).json({
//       success: false,
//       message: error.message || "Server error during avatar upload",
//     });
//   }
// };

// // Your existing functions remain the same
// export const getProfile = async (req, res) => {
//   const id = req.user.userID;

//   try {
//     const user = await User.findOne({ _id: id });
//     const userData = await UserProfile.findOne({ userId: id });

//     // Ensure avatar URL is included in response
//     const responseData = {
//       name: user.fullName,
//       email: user.email,
//       avatar: user.avatar || (userData && userData.avatar) || null,
//       userData: userData ? userData : null,
//     };

//     console.log("Profile data for user:", id);

//     return res.status(200).json(responseData);
//   } catch (err) {
//     return res.status(500).json({
//       error: err.message,
//     });
//
