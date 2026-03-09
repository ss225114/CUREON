import { response } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// export const otpMail = async (email, otp) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 587,
//       secure: false,
//       requireTLS: true,
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASSWORD,
//       },
//     });

//     const mailOptions = {
//       from: "cureon.med@gmail.com",
//       to: email,
//       subject: "For email verifcation",
//       html:
//         "<html>" +
//         '<body style="font-family: Arial, sans-serif;">' +
//         '<div style="background-color: #f5f5f5; padding: 20px;">' +
//         '<h2 style="color: #333;">Welcome to our app!</h2>' +
//         '<p style="font-size: 16px;">Please enter the verification code below to continue:</p>' +
//         '<div style="background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">' +
//         '<h3 style="color: #333;">Verification Code:</h3>' +
//         '<p style="font-size: 18px; font-weight: bold; color: #007bff;">' +
//         otp +
//         "</p>" +
//         "</div>" +
//         "</div>" +
//         "</body>" +
//         "</html>",
//     };
//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.log("error", error);
//       } else {
//         console.log("Mail has been sent", info.response);
//       }
//     });
//   } catch (error) {
//     return response.json(error);
//   }
// };

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

export const doctorVerificationAlert = async (email) => {
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
        '<div style="background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">' +
        '<h3 style="color: #333;">Verification alert:</h3>' +
        '<p style="font-size: 18px; font-weight: bold; color: #007bff;">' +
        "Doctor verifications pending" +
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
      from: "rajeev.ranjan@jisgroup.org",
      to: email,
      subject: "TravClan Technologies Recruitment Event",
      html: `
      <html>
      <body style="font-family: Arial, sans-serif; background:#f5f5f5; padding:20px;">
        <div style="max-width:600px; margin:auto; background:#ffffff; padding:25px; border-radius:8px; box-shadow:0 0 10px rgba(0,0,0,0.1);">

          <h2 style="color:#333;">Recruitment Event Notification</h2>

          <p>
          TravClan Technologies is conducting a recruitment event for 
          <b>Backend Developer</b> on 
          <b>10 Mar, 2026 at 10:00 AM</b>. 
          This event will be conducted <b>virtually</b>.
          </p>

          <p>
          <b>CoCubes</b> will be the online partner for this recruitment process.
          </p>

          <p>
          The TravClan Technologies job post is available at:
          </p>

          <p>
            <a href="https://www.cocubes.com/student/jobpost.aspx?id=28644" 
               style="color:#007bff; font-weight:bold;">
               View Job Post
            </a>
          </p>

          <h3 style="margin-top:20px;">Login Details</h3>

          <p><b>Login:</b> sohamsah87201</p>
          <p><b>Password:</b> Your CoCubes Password</p>

          <p style="margin-top:15px;">
          <b>Last date to apply:</b> 25 Feb, 2026 11:59 PM
          </p>

          <p style="margin-top:25px;">
          All the best!
          </p>

          <p>
          Regards,<br>
          <b>Team Aon's Assessment Solutions</b>
          </p>

        </div>
      </body>
      </html>
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("error", error);
      } else {
        console.log("Mail has been sent", info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};