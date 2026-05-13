import express from "express";

import { upload } from "../config/MulterConfig.js";

import { getDocuments, getDocumentsByFolder, toggleStarred, uploadDocument } from "../controller/DocumentController.js";
import { protect } from "../middleware/checkAuth.js";

const router = express.Router();

router.post(
  "/upload",
  protect,
  upload.single("file"),
  uploadDocument
);

router.get("/", protect, getDocuments);

router.get(
  "/folder/:folderId",
  protect,
  getDocumentsByFolder
);

router.patch(
  "/:id/star",
  protect,
  toggleStarred
);

export default router;