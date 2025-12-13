import { Routes, Route } from "react-router-dom";
import Dashboard from "@/modules/Dashboard/dashboard";
import ChatPage from "@/modules/AuthPages/ChatPage/chatPage";
// import ProfilePage from "@/modules/AuthPages/ProfilePage/profilePage";

const AuthRouter = () => {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="/chat" element={<ChatPage />} />
      {/* <Route path="/userprofile" element={<ProfilePage />} /> */}
    </Routes>
  );
};

export default AuthRouter;
