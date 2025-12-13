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
import animabot from "@/assets/static/animabot.json";
import { useAuth } from "../context/authContext";
import axios from "axios";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const { setToken, setUser, setRefreshToken } = useAuth();
  const [errMsg, setErrMsg] = useState(0);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState(false);
  const [forgotError, setForgotError] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/auth/login", form)
      .then((res) => {
        setToken(res.data.data.access_token);
        setRefreshToken(res.data.data.refresh_token);
        setUser(res.data.name);
        console.log("Set all data");
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        setErrMsg(1);
        console.log(err);
      });
  };

  const handleForgotPassword = async () => {
    if (!forgotEmail) {
      setForgotError("Please enter your email address");
      return;
    }

    setForgotLoading(true);
    setForgotError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/forget-password",
        { email: forgotEmail }
      );

      if (response.data.success || response.data.message) {
        setForgotSuccess(true);
        setShowSuccessToast(true);
        setForgotEmail("");

        // Auto-hide toast after 3 seconds
        setTimeout(() => {
          setShowSuccessToast(false);
        }, 3000);

        // Close dialog after a short delay
        setTimeout(() => {
          setShowForgotPassword(false);
        }, 2000);
      }
    } catch (err) {
      console.error("Forgot password error:", err);
      setForgotError(
        err.response?.data?.message || "Failed to send reset link"
      );
    } finally {
      setForgotLoading(false);
    }
  };

  const getMaskedEmail = (email) => {
    if (!email) return "";
    const atIndex = email.indexOf("@");
    if (atIndex === -1) return email;

    const username = email.substring(0, atIndex);
    const domain = email.substring(atIndex);

    // Show last 4 characters of username, mask the rest
    if (username.length <= 4) {
      return "*".repeat(username.length) + domain;
    }

    const maskedUsername = "*".repeat(username.length - 4) + username.slice(-4);
    return maskedUsername + domain;
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Left Section with Animation */}
      <div className="w-1/2 flex items-center justify-center">
        <Lottie animationData={animabot} loop={true} className="max-w-md" />
      </div>

      {/* Right Section with Form */}
      <div className="w-1/2 flex items-center justify-center p-10">
        <Card className="auth-card w-full max-w-md bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-2xl border border-blue-100 dark:border-gray-700 transition-colors duration-300">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold flex items-center justify-center gap-2 text-[#293379] dark:text-blue-300">
              Welcome Back!{" "}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label
                  htmlFor="email"
                  className="mb-1 text-[#293379] dark:text-blue-200"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="bg-white/80 dark:bg-gray-700/80 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
                />
              </div>

              <div>
                <Label
                  htmlFor="password"
                  className="mb-1 text-[#293379] dark:text-blue-200"
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
                  className="bg-white/80 dark:bg-gray-700/80 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
                />
              </div>

              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-[#293379] dark:text-blue-400 hover:text-[#3a4a9c] dark:hover:text-blue-300 transition-colors duration-200"
                >
                  Forgot Password?
                </button>
              </div>

              <Button
                className="w-full hover:bg-blue-700 dark:hover:bg-blue-600 text-white transition-colors duration-300"
                style={{ backgroundColor: "#293379" }}
              >
                Login
              </Button>

              <p className="text-center text-sm mt-2 text-gray-700 dark:text-gray-300">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300"
                >
                  Sign Up
                </Link>
              </p>

              <p className="text-center text-sm mt-2 text-gray-700 dark:text-gray-300">
                Are you a doctor?{" "}
                <Link
                  to="/doctor-login"
                  className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300"
                >
                  Login here
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Forgot Password Dialog */}
      <Dialog open={showForgotPassword} onOpenChange={setShowForgotPassword}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xl rounded-2xl">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-center text-2xl font-bold text-[#293379] dark:text-blue-300">
              Reset Your Password
            </DialogTitle>
            <DialogDescription className="text-center text-base text-gray-600 dark:text-gray-400">
              Enter your email address and we'll send you a link to reset your
              password.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-2">
            {/* Success Toast */}
            {showSuccessToast && (
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
                      Password reset link sent to {getMaskedEmail(forgotEmail)}
                    </span>
                  </div>
                  <button
                    onClick={() => setShowSuccessToast(false)}
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

            {/* Error Message */}
            {forgotError && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-sm">
                {forgotError}
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="forgot-email"
                  className="text-[#293379] dark:text-blue-200 text-base font-semibold"
                >
                  Email Address
                </Label>
                <Input
                  id="forgot-email"
                  type="email"
                  placeholder="you@example.com"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="h-12 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 focus:border-[#293379] rounded-xl"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForgotPassword(false)}
                className="flex-1 h-12 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl font-medium"
                disabled={forgotLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleForgotPassword}
                disabled={forgotLoading || !forgotEmail}
                className="flex-1 h-12 text-white font-semibold transition-all duration-300 hover:bg-[#3a4a9c] disabled:opacity-50 rounded-xl shadow-lg"
                style={{ backgroundColor: "#293379" }}
              >
                {forgotLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </div>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </div>

            <div className="text-center pt-4 border-t border-gray-100 dark:border-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Remember your password?{" "}
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="text-[#293379] dark:text-blue-300 hover:text-[#3a4a9c] dark:hover:text-blue-200 font-medium transition-colors duration-200"
                >
                  Back to login
                </button>
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
