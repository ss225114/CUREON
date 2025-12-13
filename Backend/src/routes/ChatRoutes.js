import express from "express"
import { createChat, deleteChat, getChats } from "../controller/ChatController.js";
import { protect } from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/create-chat", protect, createChat);
router.get("/get-chats", protect, getChats);
router.delete('/delete-chat/:id',protect, deleteChat);


export default router;