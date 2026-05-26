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
      html: `<b>Hii ${name}, Please click this link <a href=http://localhost:5173/reset-password?token=${token}>reset your password</a> </b>`,
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

export const doctorVerificationMail = async (email) => {
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
      subject: "For identity verifcation",
      html:
        "<html>" +
        '<body style="font-family: Arial, sans-serif;">' +
        '<div style="background-color: #f5f5f5; padding: 20px;">' +
        '<h2 style="color: #333;">Welcome to our app!</h2>' +
        '<p style="font-size: 16px;">Identity Verification:</p>' +
        '<div style="background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">' +
        '<p style="font-size: 18px; font-weight: bold; color: #007bff;">' +
        "Your identity has successfully been verified" +
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

export const appointmentConfirmationMail = async (email, time, day) => {
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
      subject: "For Appointment Confirmation",
      html:
        "<html>" +
        '<body style="font-family: Arial, sans-serif;">' +
        '<div style="background-color: #f5f5f5; padding: 20px;">' +
        '<h2 style="color: #333;">Cureon</h2>' +
        '<p style="font-size: 16px;">Appointment Confirmation</p>' +
        '<div style="background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">' +
        '<p style="font-size: 18px; font-weight: bold; color: #007bff;">' +
        `Your appointment has been confirmed for ${time} on ${day}` +
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

export const appointmentRejectionMail = async (email, time, day) => {
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
      subject: "For Appointment Confirmation",
      html:
        "<html>" +
        '<body style="font-family: Arial, sans-serif;">' +
        '<div style="background-color: #f5f5f5; padding: 20px;">' +
        '<h2 style="color: #333;">Cureon</h2>' +
        '<p style="font-size: 16px;">Appointment Rejection</p>' +
        '<div style="background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">' +
        '<p style="font-size: 18px; font-weight: bold; color: #007bff;">' +
        `We regret to inform you that your appointment request for ${time} on ${day} could not be confirmed, as the slot has already been allocated to an earlier request. We sincerely apologize for the inconvenience and encourage you to book another available slot.` +
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

export const appointmentCancellationMail = async (email, time, day) => {
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
      subject: "Appointment Cancellation",
      html:
        "<html>" +
        '<body style="font-family: Arial, sans-serif;">' +
        '<div style="background-color: #f5f5f5; padding: 20px;">' +
        '<h2 style="color: #333;">Cureon</h2>' +
        '<p style="font-size: 16px;">Appointment Cancellation</p>' +
        '<div style="background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">' +
        '<p style="font-size: 18px; font-weight: bold; color: #007bff;">' +
        `We regret to inform you that your appointment for ${time} on ${day} was cancelled by the doctor. We sincerely apologize for the inconvenience and encourage you to book another available slot.` +
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

export const feedbackMail = async (name, email, doctor) => {
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
      subject: "Appointment Feedback",
      html: "<html>" +
        '<body style="font-family: Arial, sans-serif;">' +
        '<div style="background-color: #f5f5f5; padding: 20px;">' +
        '<h2 style="color: #333;">Cureon</h2>' +
        '<p style="font-size: 16px;">Appointment Feedback</p>' +
        '<div style="background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">' +
        '<p style="font-size: 18px; font-weight: bold; color: #007bff;">' +
        `Hii ${name}, we would appreciate your feedback for the service. Please click this link <a href=http://localhost:5173/feedback-form?doc=${doctor._id}>feedback form</a>` +
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
    return res.status(400).json({ message: error });
  }
};