import express from "express";

import {
  createFolder,
  getFolders,
} from "../controller/FolderController.js";
import { protect } from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/", protect, createFolder);
router.get("/all-folders", protect, getFolders);

export default router;