// import multer from "multer";
// import path from "path";
// import fs from "fs";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     let uploadDir = "";

//     /*
//       Store files separately:
      
//       uploads/
//         images/
//         pdfs/
//     */

//     if (file.mimetype.startsWith("image/")) {
//       uploadDir = "uploads/images/";
//     } else if (
//       file.mimetype === "application/pdf"
//     ) {
//       uploadDir = "uploads/pdfs/";
//     } else {
//       return cb(
//         new Error(
//           "Only image and PDF files are allowed"
//         )
//       );
//     }

//     // Create directory if it doesn't exist
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, {
//         recursive: true,
//       });
//     }

//     cb(null, uploadDir);
//   },

//   filename: function (req, file, cb) {
//     const uniqueName =
//       Date.now() + path.extname(file.originalname);

//     cb(null, uniqueName);
//   },
// });

// export const upload = multer({
//   storage,

//   limits: {
//     fileSize: 20 * 1024 * 1024,
//   },

//   fileFilter: (req, file, cb) => {
//     const allowedMimeTypes = [
//       "image/png",
//       "image/jpeg",
//       "image/jpg",
//       "application/pdf",
//     ];

//     if (
//       allowedMimeTypes.includes(file.mimetype)
//     ) {
//       cb(null, true);
//     } else {
//       cb(
//         new Error(
//           "Only PNG, JPG, JPEG and PDF files are allowed"
//         )
//       );
//     }
//   },
// });

import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadDir = "";

    /*
      uploads/
        images/
        pdfs/
        proof/
    */

    // Doctor verification documents
    const proofFields = [
      "govtIdDocument",
      "degreeCertificate",
      "registrationCertificate",
      "clinicProof",
    ];

    // Store proof documents separately
    if (proofFields.includes(file.fieldname)) {
      uploadDir = "uploads/proof/";
    }

    // Store profile photo in images
    else if (
      file.fieldname === "profilePhoto" &&
      file.mimetype.startsWith("image/")
    ) {
      uploadDir = "uploads/images/";
    }

    // General image uploads
    else if (file.mimetype.startsWith("image/")) {
      uploadDir = "uploads/images/";
    }

    // PDFs
    else if (file.mimetype === "application/pdf") {
      uploadDir = "uploads/pdfs/";
    }

    else {
      return cb(
        new Error(
          "Only image and PDF files are allowed"
        )
      );
    }

    // Create directory if not exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, {
        recursive: true,
      });
    }

    cb(null, uploadDir);
  },

  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

export const upload = multer({
  storage,

  limits: {
    fileSize: 20 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "application/pdf",
    ];

    if (
      allowedMimeTypes.includes(file.mimetype)
    ) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only PNG, JPG, JPEG and PDF files are allowed"
        )
      );
    }
  },
});