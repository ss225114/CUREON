import User from "../models/User.js";
import bcrypt from "bcryptjs";
import randomstring from "randomstring";
import jwt from "jsonwebtoken";
import { generateToken } from "../lib/jwtService.js";
import { otpGen } from "../utils/otp.js";
import { otpMail, sendResetPasswordEmail } from "../lib/emailService.js";
import { v7, validate } from "uuid";
import Chat from "../models/Chat.js";

export const register = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 chatracters" });
    }
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const otp = otpGen();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const time = new Date();

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      token: otp,
      otpGeneratedTime: time,
      isActive: false,
    });

    await newUser.save();
    await otpMail(email, otp);
    res.status(201).json({
      email: email,
      message: "Otp sent to mail Id. Verify mail to complete registration",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verifyEmail = async (req, res) => {
  const { email, otpInp } = req.body;
  const user = await User.findOne({ email });
  if (
    otpInp === user.token &&
    user.otpGeneratedTime &&
    (Date.now() - user.otpGeneratedTime.getTime()) / (1000 * 60) < 2
  ) {
    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          isActive: true,
          token: "",
          otpGeneratedTime: null,
        },
      }
    );
    const { access_token, refresh_token } = generateToken(user._id, res);
    const chatId = v7();

    if (chatId !== null) {
      const obj = {
        userId: user._id,
        conversationId: chatId,
        lastMessage: "",
      };

      if (!validate(obj.conversationId)) {
        return res
          .status(400)
          .json({ success: false, message: "UUID for new chat is not valid" });
      } else {
        const chat = await Chat.create(obj);
      }
    }
    res.status(200).json({
      message: "User registration Successful",
      name: user.fullName,
      data: {
        access_token: access_token,
        refresh_token: refresh_token,
      },
    });
    return;
  } else {
    // console.log((Date.now() - user.otpGeneratedTime?user.otpGeneratedTime.getTime():0) / 1000 < 60);
    res.status(500).json({ message: "Invalid otp" });
    return;
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });
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

export const forget_password = async (req, res) => {
  try {
    const { email } = req.body;
    const userData = await User.findOne({ email });
    if (userData) {
      const randomstr = randomstring.generate();
      const data = await User.updateOne(
        { email: email },
        { $set: { token: randomstr } }
      );
      sendResetPasswordEmail(userData.fullName, userData.email, randomstr);
      return res
        .status(200)
        .json({ message: "Please check your mail and reset password" });
    } else {
      return res.status(200).json({ message: "Email Already Exists" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const reset_password = async (req, res) => {
  try {
    const token = req.query.token;
    const userData = await User.findOne({ token: token });
    if (userData) {
      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await User.findByIdAndUpdate(
        {
          _id: userData._id,
        },
        { $set: { password: hashedPassword, token: "" } },
        { new: true }
      );
      const { access_token, refresh_token } = generateToken(userData._id, res);
      return res
        .status(200)
        .json({
          success: true,
          access_token: access_token,
          refresh_token: refresh_token,
        });
    } else {
      return res.status(400).json({ msg: "This link has been expired" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const { refresh_token } = req.body;
    const decode = jwt.verify(refresh_token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decode.userID);
    if (user) {
      const { access_token, refresh_token } = generateToken(user._id, res);
      return res.status(201).json({
        data: {
          access_token: access_token,
          refresh_token: refresh_token,
        },
      });
    } else {
      return res.status(400).json({ message: "RefreshToken Expired" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const resendOtp = async (req, res) => {
  const { email } = req.body;
  try {
    const otp = otpGen();
    const time = new Date();
    await User.findOneAndUpdate(
      { email },
      {
        token: otp,
        otpGeneratedTime: time,
      },
      { new: true }
    );
    await otpMail(email, otp);
    return res.status(201).json({
      email: email,
      message: "Otp sent to mail Id. Verify mail to complete registration",
    });
  } catch (err) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
