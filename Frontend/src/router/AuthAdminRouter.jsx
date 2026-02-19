import AdminDashboard from "@/modules/AuthAdminPages/Dashboard/dashboard";
import { Routes, Route } from "react-router-dom";

const AuthAdminRouter = () => {
  return (
    <Routes>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
    </Routes>
  );
};

export default AuthAdminRouter;