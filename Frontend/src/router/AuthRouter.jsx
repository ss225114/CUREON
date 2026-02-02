import { Routes, Route } from "react-router-dom";
import Dashboard from "@/modules/Dashboard/dashboard";
import ChatPage from "@/modules/AuthUserPages/ChatPage/chatPage";
import ProfilePage from "@/modules/AuthUserPages/ProfilePage/profilePage";

const AuthRouter = () => {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/userprofile" element={<ProfilePage />} />
    </Routes>
  );
};

export default AuthRouter;
