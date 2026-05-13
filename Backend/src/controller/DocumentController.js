import Document from "../models/Document.js";

export const uploadDocument = async (req, res) => {
  try {
    const { folderId, title, category } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const document = await Document.create({
      patient: req.user.userID,
      title,
      category,
      folder: folderId || null,
      fileName: req.file.filename,
      originalName: req.file.originalname,
      filePath: req.file.path,
      mimeType: req.file.mimetype,
      size: req.file.size,
    });

    res.status(201).json(document);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find({
      patient: req.user.userID,
    }).populate("folder");

    res.json(documents);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getDocumentsByFolder = async (
  req,
  res
) => {
  try {
    const documents = await Document.find({
      folder: req.params.folderId,
    });

    res.json(documents);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const toggleStarred = async (
  req,
  res
) => {
  try {
    const document = await Document.findById(
      req.params.id
    );

    document.isStarred = !document.isStarred;

    await document.save();

    res.json(document);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};