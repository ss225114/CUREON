import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import animabot from "@/assets/static/animabot.json";
import { useAuth } from "@/modules/Auth/context/authContext";
import axios from "axios";
import apiClient from "@/lib/apiClient";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setToken, setUser, setRefreshToken } = useAuth();

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);

  // Extract token from URL query params
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  // Validate token on component mount
  useEffect(() => {
    if (!token) {
      setTokenValid(false);
      setError("Invalid or missing reset token");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!token) {
      setError("Invalid reset link");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await apiClient.post(
        `auth/reset-password?token=${token}`,
        { password: form.password }
      );
      console.log(response);

      if (response.data.success) {
        setSuccess(true);

        // Optionally auto-login user after password reset
        if (response.data?.access_token) {
          setToken(response.data.access_token);
          setRefreshToken(response.data.refresh_token);

          // You might need to fetch user data here
          // const userResponse = await axios.get("/auth/me", {
          //   headers: { Authorization: `Bearer ${response.data.data.access_token}` }
          // });
          // setUser(userResponse.data);

          // Redirect after 2 seconds
          // setTimeout(() => {
          //   navigate("/");
          // }, 2000);
          navigate("/");
        }
      } else {
        setError(response.data.message || "Failed to reset password");
      }
    } catch (err) {
      console.error("Reset password error:", err);
      setError(
        err.response?.data?.message ||
          "Failed to reset password. Link may be expired."
      );
    } finally {
      setLoading(false);
    }
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
              Reset Your Password
            </CardTitle>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
              {tokenValid
                ? "Enter your new password below"
                : "This reset link is invalid or has expired"}
            </p>
          </CardHeader>

          <CardContent>
            {!tokenValid ? (
              <div className="text-center space-y-4">
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg">
                  {error}
                </div>
                <Button
                  onClick={() => navigate("/login")}
                  className="w-full hover:bg-blue-700 dark:hover:bg-blue-600 text-white transition-colors duration-300"
                  style={{ backgroundColor: "#293379" }}
                >
                  Back to Login
                </Button>
              </div>
            ) : success ? (
              <div className="text-center space-y-4">
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg flex items-center justify-center gap-2">
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
                  Password reset successful!
                </div>
                <Button
                  onClick={() => navigate("/login")}
                  className="w-full hover:bg-blue-700 dark:hover:bg-blue-600 text-white transition-colors duration-300"
                  style={{ backgroundColor: "#293379" }}
                >
                  Go to Login
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <div>
                  <Label
                    htmlFor="password"
                    className="mb-1 text-[#293379] dark:text-blue-200"
                  >
                    New Password
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
                    minLength={6}
                    className="bg-white/80 dark:bg-gray-700/80 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Must be at least 6 characters
                  </p>
                </div>

                <div>
                  <Label
                    htmlFor="confirmPassword"
                    className="mb-1 text-[#293379] dark:text-blue-200"
                  >
                    Confirm New Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={form.confirmPassword}
                    onChange={(e) =>
                      setForm({ ...form, confirmPassword: e.target.value })
                    }
                    required
                    minLength={6}
                    className="bg-white/80 dark:bg-gray-700/80 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full hover:bg-blue-700 dark:hover:bg-blue-600 text-white transition-colors duration-300 disabled:opacity-50"
                  style={{ backgroundColor: "#293379" }}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Resetting Password...
                    </div>
                  ) : (
                    "Reset Password"
                  )}
                </Button>

                <div className="text-center pt-4 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Remember your password?{" "}
                    <Link
                      to="/login"
                      className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300"
                    >
                      Back to Login
                    </Link>
                  </p>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
