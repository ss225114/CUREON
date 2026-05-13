import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/AuthRoutes.js";
import chatRoutes from "./routes/ChatRoutes.js";
import conversationRoutes from "./routes/ConversationRoutes.js";
import userRoutes from "./routes/UserRoutes.js";
import doctorRoutes from "./routes/DoctorRoutes.js";
import adminRoutes from "./routes/AdminRoutes.js";
import featureRoutes from "./routes/FeatureRoutes.js";
import scheduleRoutes from "./routes/ScheduleRoutes.js";
import documentRoutes from "./routes/DocumentRoutes.js";
import folderRoutes from "./routes/FolderRoutes.js";
import appointmentRoutes from "./routes/AppointmentRoutes.js";
import path from "path";

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

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/auth", authRoutes);
app.use("/chat", chatRoutes);
app.use("/message", conversationRoutes);
app.use("/user", userRoutes);
app.use("/doctor", doctorRoutes);
app.use("/admin", adminRoutes);
app.use("/feature", featureRoutes);
app.use("/api/schedule", scheduleRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/folders", folderRoutes);
app.use("/api/appointment", appointmentRoutes);

const PORT = process.env.PORT || 5000;

await connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
