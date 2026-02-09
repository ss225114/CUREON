import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/AuthRoutes.js";
import chatRoutes from "./routes/ChatRoutes.js";
import conversationRoutes from "./routes/ConversationRoutes.js";
import userRoutes from "./routes/UserRoutes.js";
import adminRoutes from "./routes/AdminRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors(
    {
      origin: "http://localhost:5173", // your frontend URL
      credentials: true,
    } // allow cookies / auth headers
  )
);
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/chat", chatRoutes);
app.use("/message", conversationRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

await connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
