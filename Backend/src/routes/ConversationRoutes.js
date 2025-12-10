import express from "express"
import { protect } from "../middleware/checkAuth.js";
import { communicate, getConversationById } from "../controller/MessageController.js";

const router = express.Router();

router.get("/get-messages/:id", protect, getConversationById);
router.post("/communicate/:id", protect, communicate);

export default router;