import { response } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const otpMail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: "cureon.med@gmail.com",
      to: email,
      subject: "For email verifcation",
      html:
        "<html>" +
        '<body style="font-family: Arial, sans-serif;">' +
        '<div style="background-color: #f5f5f5; padding: 20px;">' +
        '<h2 style="color: #333;">Welcome to our app!</h2>' +
        '<p style="font-size: 16px;">Please enter the verification code below to continue:</p>' +
        '<div style="background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">' +
        '<h3 style="color: #333;">Verification Code:</h3>' +
        '<p style="font-size: 18px; font-weight: bold; color: #007bff;">' +
        otp +
        "</p>" +
        "</div>" +
        "</div>" +
        "</body>" +
        "</html>",
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("error", error);
      } else {
        console.log("Mail has been sent", info.response);
      }
    });
  } catch (error) {
    return response.json(error);
  }
};

export const sendResetPasswordEmail = async (name, email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    console.log(transporter);

    const mailOptions = {
      from: "app.testplatform123@gmail.com",
      to: email,
      subject: "For Reset password",
      html: `<b>Hii ${name}, Please click this link <a href=http://localhost:8004/api/auth/reset-password?token=${token}>reset your password></a> </b>`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("error", error);
      } else {
        console.log("Mail has been sent", info.response);
      }
    });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};
