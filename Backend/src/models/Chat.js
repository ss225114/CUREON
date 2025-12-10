import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      default: "New Chat",
    },
    conversationId: {
      type: String,
      required: true,
    },
    lastMessage: {
      type: String,
      default: "",
    }
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;