import { doctorVerificationMail } from "../lib/emailService.js";
import { generateToken } from "../lib/jwtService.js";
import Doctor from "../models/Doctor.js";
import DoctorCluster from "../models/DoctorCluster.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

// export const adminRegister = async(req, res) => {
//     const { fullName, email, password } = req.body;
//   try {
//     if (password.length < 6) {
//       return res
//         .status(400)
//         .json({ message: "Password must be atleast 6 chatracters" });
//     }
//     const user = await User.findOne({ email });
//     if (user) return res.status(400).json({ message: "User already exists" });

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = new User({
//       fullName,
//       email,
//       password: hashedPassword,
//       isActive: true,
//       isAdmin: true,
//     });

//     await newUser.save();
//     res.status(201).json({
//       message: "Admin registration success",
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// }

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !user.isAdmin)
      return res.status(400).json({ message: "Invalid Credentials" });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Credentials" });
    const { access_token, refresh_token } = generateToken(user._id, res);
    return res.status(201).json({
      name: user.fullName,
      data: {
        access_token: access_token,
        refresh_token: refresh_token,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// export const getAllUsers = async (req, res) => {};

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    return res.status(200).json({
      success: true,
      doctors,
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

export const getPendingRequests = async (req, res) => {
  try {
    const id = req.user.userID;
    const user = await User.findOne({ id });
    const doctors = await Doctor.find();
    const pending = doctors.filter(
      (doctor) => doctor.isActive !== true
    );
    // if(pending.length >= 10) {
    //   await doctorVerificationAlert(user.email);
    // }
    return res.status(200).json({
      success: true,
      pending,
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

// export const getUserById = async (req, res) => {};

// export const getDoctorById = async (req, res) => {};

export const verifyDoctor = async (req, res) => {
  const { doc_id, status } = req.body;
  try {
    const doctor = await Doctor.findOneAndUpdate(
      { _id: doc_id },

      {
        $set: {
          isActive: status,
        },
      },

      { new: true },
    );
    const docCluster = new DoctorCluster({
      docId: doc_id,
      clusterId: 3
    });
    await docCluster.save();
    await doctorVerificationMail(doctor.email);
    return res.status(200).json({
      success: true,
      message: "doctor verififed and mail sent",
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

export const rejectDoctor = async(req, res) => {
    const { doc_id } = req.body;
    try {
    const doctor = await Doctor.findOneAndDelete({ _id: doc_id });
    return res.status(200).json({
      success: true,
      message: "doctor data deleted",
      doctor
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
}