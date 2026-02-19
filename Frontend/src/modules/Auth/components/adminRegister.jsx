import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Lottie from "lottie-react";
// import animabot from "@/assets/static/animabot.json";
import adminanima from "@/assets/static/adminanima.json";
import axios from "axios";
import { useAuth } from "../context/authContext";
import apiClient from "@/lib/apiClient";

export default function AdminRegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { setToken, setUser, setRefreshToken } = useAuth();

  // OTP states
  const [otp, setOtp] = useState("");
  const [isOtpDialogOpen, setIsOtpDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendSuccess, setResendSuccess] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [showResendToast, setShowResendToast] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/admin/register",
        form,
      );
      console.log(response.data);

      if (response.data.message) {
        setIsOtpDialogOpen(true);
      }
    } catch (err) {
      console.log(err.response);
      setError(err.response?.data?.message || "Admin registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/verify-mail",
        {
          email: form.email,
          otpInp: otp,
        },
      );

      console.log(response.data);

      if (response.data.message === "Admin registration Successful") {
        setIsOtpDialogOpen(false);
        setToken(response.data.data.access_token);
        setRefreshToken(response.data.data.refresh_token);
        setUser(response.data.name);
        navigate("/admin-dashboard");
      }
    } catch (err) {
      console.log(err.response);
      setError(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const getMaskedEmail = (email) => {
    if (!email) return "";
    const atIndex = email.indexOf("@");
    if (atIndex === -1) return email;

    const username = email.substring(0, atIndex);
    const domain = email.substring(atIndex);

    if (username.length <= 4) {
      return "*".repeat(username.length) + domain;
    }

    const maskedUsername = "*".repeat(username.length - 4) + username.slice(-4);
    return maskedUsername + domain;
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(value);
  };

  const resendOtp = async () => {
    if (!form.email) {
      setError("Email not found");
      return;
    }

    setResendLoading(true);
    setResendSuccess(false);
    setError("");

    try {
      const response = await apiClient.post("/auth/resend-otp", {
        email: form.email,
      });

      if (response.data.success || response.data.message) {
        setResendSuccess(true);
        setShowResendToast(true);

        setTimeout(() => {
          setShowResendToast(false);
        }, 3000);
      }
    } catch (err) {
      console.error("Resend OTP error:", err);
      setError(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-purple-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Left Section with Animation - Same as login page */}
      <div className="w-1/2 flex items-center justify-center">
        <Lottie animationData={adminanima} loop={true} className="max-w-md" />
      </div>

      {/* Right Section with Form - Same max-w-md as login page */}
      <div className="w-1/2 flex items-center justify-center p-10">
        <Card className="auth-card w-full max-w-md bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-2xl border border-purple-100 dark:border-gray-700 transition-colors duration-300">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold flex items-center justify-center gap-2 text-[#6a11cb] dark:text-purple-300">
              Admin Registration{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </CardTitle>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-1">
              Create an administrator account to manage the platform
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm">
                  {error}
                </div>
              )}

              <div>
                <Label
                  htmlFor="name"
                  className="mb-1 text-[#6a11cb] dark:text-purple-200"
                >
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Admin Name"
                  value={form.fullName}
                  onChange={(e) =>
                    setForm({ ...form, fullName: e.target.value })
                  }
                  required
                  className="bg-white/80 dark:bg-gray-700/80 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
                />
              </div>

              <div>
                <Label
                  htmlFor="email"
                  className="mb-1 text-[#6a11cb] dark:text-purple-200"
                >
                  Admin Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="bg-white/80 dark:bg-gray-700/80 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
                />
              </div>

              <div>
                <Label
                  htmlFor="password"
                  className="mb-1 text-[#6a11cb] dark:text-purple-200"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                  minLength={8}
                  className="bg-white/80 dark:bg-gray-700/80 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Must be at least 8 characters with special characters
                </p>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full hover:bg-purple-700 dark:hover:bg-purple-600 text-white transition-colors duration-300 disabled:opacity-50"
                style={{ backgroundColor: "#6a11cb" }}
              >
                {loading ? "Registering..." : "Register as Admin"}
              </Button>

              <div className="space-y-2 pt-2">
                <p className="text-center text-sm text-gray-700 dark:text-gray-300">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 transition-colors duration-300"
                  >
                    Login here
                  </Link>
                </p>

                <p className="text-center text-sm text-gray-700 dark:text-gray-300">
                  <Link
                    to="/doctor-register"
                    className="font-medium text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 transition-colors duration-300"
                  >
                    Doctor registration{" "}
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* OTP Verification Dialog */}
      <Dialog open={isOtpDialogOpen} onOpenChange={setIsOtpDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xl rounded-2xl">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-center text-2xl font-bold text-[#6a11cb] dark:text-purple-300">
              Admin Email Verification
            </DialogTitle>
            <DialogDescription className="text-center text-base text-gray-600 dark:text-gray-400">
              We've sent a 6-digit verification code to your admin email{" "}
              <span className="font-semibold text-[#6a11cb] dark:text-purple-300 block mt-1">
                {getMaskedEmail(form.email)}
              </span>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-2">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Resend Success Toast */}
            {showResendToast && (
              <div className="animate-in slide-in-from-top-1 duration-300">
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg text-sm flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>
                      OTP has been resent to {getMaskedEmail(form.email)}
                    </span>
                  </div>
                  <button
                    onClick={() => setShowResendToast(false)}
                    className="text-green-700 dark:text-green-300 hover:text-green-800 dark:hover:text-green-200"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="otp"
                  className="text-[#6a11cb] dark:text-purple-200 text-base font-semibold"
                >
                  Enter Verification Code
                </Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="123456"
                  value={otp}
                  onChange={handleOtpChange}
                  maxLength={6}
                  className="text-center text-2xl font-bold tracking-[0.5em] h-14 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 focus:border-[#6a11cb] focus:ring-2 focus:ring-[#6a11cb]/20 rounded-xl"
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Check your email for the 6-digit verification code
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOtpDialogOpen(false)}
                className="flex-1 h-12 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl font-medium"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleVerifyOtp}
                disabled={loading || otp.length !== 6}
                className="flex-1 h-12 text-white font-semibold transition-all duration-300 hover:bg-[#7b1fd1] disabled:opacity-50 rounded-xl shadow-lg"
                style={{ backgroundColor: "#6a11cb" }}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Verifying...
                  </div>
                ) : (
                  "Verify OTP"
                )}
              </Button>
            </div>

            <div className="text-center pt-4 border-t border-gray-100 dark:border-gray-800">
              <button
                type="button"
                onClick={resendOtp}
                disabled={resendLoading}
                className="text-[#6a11cb] dark:text-purple-300 hover:text-[#7b1fd1] dark:hover:text-purple-200 font-medium text-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {resendLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-[#6a11cb] border-t-transparent rounded-full animate-spin" />
                    Resending...
                  </div>
                ) : (
                  "Didn't receive code? Resend OTP"
                )}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
