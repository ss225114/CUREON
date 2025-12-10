import express from "express"
import { createChat, getChats } from "../controller/ChatController.js";
import { protect } from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/create-chat", protect, createChat);
router.get("/get-chats", protect, getChats);


export default router;