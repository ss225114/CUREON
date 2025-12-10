import Chat from "../models/Chat.js";
import Conversations from "../models/Conversation.js";
import axios from "axios";

// BASE_URL for model access = http://localhost:8005

export const communicate = async (req, res) => {
  const { query } = req.body;
  const id = req.params.id;
  const chat = await Chat.findOne({ conversationId: id });

  const newMessage1 = new Conversations({
    conversationId: id,
    message: query,
    isUser: true,
  });

  await newMessage1.save();

  try {
    const { data } = await axios.post(
      "http://localhost:8005/get",
      { msg: query },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const newMessage2 = new Conversations({
      conversationId: id,
      message: data.response,
      isUser: false,
    });

    await newMessage2.save();

    const updatedChat = await Chat.findOneAndUpdate(
      { conversationId: id },
      { $set: { lastMessage: data.response } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      newMessage1,
      newMessage2
    });
  } catch (err) {
    console.error("Flask API Error:", err.message);
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const getConversationById = async (req, res) => {
  const id = req.params.id;
  try {
    const conversations = await Conversations.find({ conversationId: id });
    return res.status(200).json({
      conversations
    })
  } catch (err) {
    return res.status(400).json({
      success: false,
      err
    })
  }
};
