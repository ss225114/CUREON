import { Routes, Route } from "react-router-dom";
import Dashboard from "@/modules/AuthUserPages/Dashboard/dashboard";
import ChatPage from "@/modules/AuthUserPages/ChatPage/chatPage";
import ProfilePage from "@/modules/AuthUserPages/ProfilePage/profilePage";
import DoctorsPage from "@/modules/AuthUserPages/DoctorsPage/doctorsPage";
import ViewAllSpecialitiesPage from "@/modules/AuthUserPages/ViewAllSpecialitiesPage/ViewAllSpecialitiesPage";

const AuthUserRouter = () => {
  return (
    <Routes>
      <Route path="/user-dashboard" element={<Dashboard />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/userprofile" element={<ProfilePage />} />
      <Route path="/find-doctors" element={<DoctorsPage />} />
      <Route path="/all-specializations" element={<ViewAllSpecialitiesPage />} />
    </Routes>
  );
};

export default AuthUserRouter;
