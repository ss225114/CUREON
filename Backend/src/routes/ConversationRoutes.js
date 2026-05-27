import express from "express"
import { protect } from "../middleware/checkAuth.js";
import { communicateImage, communicateMessage, getConversationById } from "../controller/MessageController.js";
import { upload } from "../config/MulterConfig.js";

const router = express.Router();

router.get("/get-messages/:id", protect, getConversationById);
router.post("/communicate/:id", protect, communicateMessage);
router.post("/image-analysis/:id", protect, upload.single("image"), communicateImage);

export default router;