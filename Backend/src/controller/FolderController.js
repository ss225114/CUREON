import Folder from "../models/Folder.js";

export const createFolder = async (req, res) => {
  try {
    const { name, parentFolder } = req.body;

    const folder = await Folder.create({
      patient: req.user.userID,
      name,
      parentFolder: parentFolder || null,
    });

    res.status(201).json(folder);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getFolders = async (req, res) => {
  try {
    const folders = await Folder.find({
      patient: req.user.userID,
    });

    res.json(folders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};