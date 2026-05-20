import AppointmentPage from "@/modules/AuthDoctorPages/Appointments/appointment";
import Dashboard from "@/modules/AuthDoctorPages/Dashboard/dashboard";
import ProfilePage from "@/modules/AuthDoctorPages/ProfilePage/profilePage";
import { Routes, Route } from "react-router-dom";

const AuthDoctorRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/doctor-profile" element={<ProfilePage />} />
        <Route path="/doctor-appointments" element={<AppointmentPage />} />
    </Routes>
  );
};

export default AuthDoctorRouter;