import mongoose from "mongoose";

const conversationSchema = mongoose.Schema(
  {
    conversationId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
    imagePath: {
      type: String,
      default: "",
    },
    isImage: {
      type: Boolean,
      default: false,
    },
    isUser: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  },
);

const Conversations = mongoose.model("Conversations", conversationSchema);

export default Conversations;
