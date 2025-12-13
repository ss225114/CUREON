import { v7, validate } from "uuid";
import Chat from "../models/Chat.js";

export const createChat = async (req, res) => {
  try {
    const id = req.user.userID;
    const chatId = v7();

    if (chatId !== null) {
      const obj = {
        userId: id,
        conversationId: chatId,
        lastMessage: "",
      };

      if (!validate(obj.conversationId)) {
        return res
          .status(400)
          .json({ success: false, message: "UUID is not valid" });
      } else {
        const chat = await Chat.create(obj);

        return res.status(201).json({
          success: true,
          message: "chat created successfully",
          chat,
        });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "Error in creating chat",
    });
  }
};

export const getChats = async (req, res) => {
  try {
    const userId = req.user.userID;
    const chats = await Chat.find({ userId }).sort({ updatedAt: -1 });

    return res.status(200).json({
      success: true,
      chats,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteChat = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Chat.findOneAndDelete({ conversationId: id });
    const del = await Chat.deleteMany({ conversationId: id });
    return res.status(200).json({
      success: true,
      message: "Chat deleted successfully",
      deletedChat: data,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting chat",
    });
  }
};
