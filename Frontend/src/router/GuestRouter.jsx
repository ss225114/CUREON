import { Routes, Route } from "react-router-dom";
import LandingPage from "@/modules/Guest/landingPage";
import LoginPage from "@/modules/Auth/components/loginPage";
import RegisterPage from "@/modules/Auth/components/registerPage";
// import DoctorRegister from "@/modules/Auth/components/doctorRegister";
import ResetPasswordPage from "@/modules/Auth/components/resetPasswordPage";
import AdminRegisterPage from "@/modules/Auth/components/adminRegister";
import DoctorPage from "@/modules/Auth/components/doctorRegister";
import DoctorFeedbackForm from "@/modules/Guest/DoctorFeedbackForm";

const GuestRouter = () => {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/doctor-register" element={<DoctorPage />} />
      <Route path="/admin-register" element={<AdminRegisterPage />} />
      <Route path="/feedback-form" element={<DoctorFeedbackForm />} />
    </Routes>
  );
};

export default GuestRouter;
