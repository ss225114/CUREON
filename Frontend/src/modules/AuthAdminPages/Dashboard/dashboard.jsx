import React, { useState } from "react";
import { DashboardProvider, useDashboard } from "./context/dashboardContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FaUserMd,
  FaUsers,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaSearch,
  FaUserTie,
  FaArrowUp,
  FaFileMedical,
  FaCalendarCheck,
  FaDollarSign,
  FaSun,
  FaMoon,
  FaBars,
  FaShieldAlt,
  FaSignOutAlt,
  FaBell,
  FaUserCircle,
  FaChartLine,
} from "react-icons/fa";
import DoctorVerificationCard from "./components/DoctorVerificationCard";
import DoctorVerificationModal from "./components/DoctorVerificationModal";
import DoctorList from "./components/DoctorList";
import UserList from "./components/UserList";
import { useAuth } from "@/modules/Auth/context/authContext";

const AdminDashboardContent = () => {
  const {
    pendingRequests,
    allDoctors,
    users,
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    stats,
    acceptRequest,
    rejectRequest,
    getGreeting,
    currentTime,
  } = useDashboard();

  const { logout } = useAuth();

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Modal states
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Reject modal states
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectRequestId, setRejectRequestId] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Card click handler
  const handleCardClick = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  // Accept handler
  const handleAccept = (requestId) => {
    if (
      window.confirm(
        "Are you sure you want to accept this doctor verification request?",
      )
    ) {
      acceptRequest(requestId);
      setIsModalOpen(false);
      setSelectedRequest(null);
    }
  };

  // Reject click handler
  const handleRejectClick = (requestId) => {
    setRejectRequestId(requestId);
    setShowRejectModal(true);
  };

  // Reject confirm handler
  const handleRejectConfirm = () => {
    if (rejectReason.trim()) {
      rejectRequest(rejectRequestId, rejectReason);
      setShowRejectModal(false);
      setRejectReason("");
      setRejectRequestId(null);
      setIsModalOpen(false);
      setSelectedRequest(null);
    }
  };

  const formatDate = () => {
    return currentTime.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = () => {
    return currentTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      {/* Header - Matching landing page style */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-blue-200/50 dark:border-gray-700/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#293379] to-[#3a4a9c] flex items-center justify-center">
                  <FaShieldAlt className="h-4 w-4 text-white" />
                </div>
                <span className="text-xl font-bold text-[#293379] dark:text-blue-300">
                  Cureon
                </span>
                <span className="hidden md:inline text-sm px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                  Admin
                </span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-2 ml-4">
                <Button
                  variant={viewMode === "pending" ? "default" : "ghost"}
                  className={`text-sm ${
                    viewMode === "pending"
                      ? "bg-[#293379] text-white hover:bg-[#3a4a9c]"
                      : "text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-800"
                  }`}
                  onClick={() => setViewMode("pending")}
                >
                  <FaClock className="mr-2 h-4 w-4" />
                  Pending
                  {stats.totalPending > 0 && (
                    <span className="ml-2 px-1.5 py-0.5 bg-white text-[#293379] rounded-full text-xs font-bold">
                      {stats.totalPending}
                    </span>
                  )}
                </Button>
                <Button
                  variant={viewMode === "doctors" ? "default" : "ghost"}
                  className={`text-sm ${
                    viewMode === "doctors"
                      ? "bg-[#293379] text-white hover:bg-[#3a4a9c]"
                      : "text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-800"
                  }`}
                  onClick={() => setViewMode("doctors")}
                >
                  <FaUserMd className="mr-2 h-4 w-4" />
                  Doctors
                </Button>
                <Button
                  variant={viewMode === "users" ? "default" : "ghost"}
                  className={`text-sm ${
                    viewMode === "users"
                      ? "bg-[#293379] text-white hover:bg-[#3a4a9c]"
                      : "text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-800"
                  }`}
                  onClick={() => setViewMode("users")}
                >
                  <FaUsers className="mr-2 h-4 w-4" />
                  Users
                </Button>
              </div>
            </div>

            {/* Right side icons */}
            <div className="flex items-center gap-3">
              {/* Weather - from image */}
              <div className="hidden md:flex items-center gap-2 bg-blue-50 dark:bg-gray-800 px-3 py-1.5 rounded-full">
                <FaSun className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  29°C
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Sunny
                </span>
              </div>

              {/* Notifications */}
              <DropdownMenu
                open={showNotifications}
                onOpenChange={setShowNotifications}
              >
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <FaBell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    {stats.totalPending > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                        {stats.totalPending}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      Notifications
                    </p>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {pendingRequests.length > 0 ? (
                      pendingRequests.slice(0, 3).map((req) => (
                        <DropdownMenuItem
                          key={req.id}
                          className="p-3 cursor-pointer"
                        >
                          <div className="flex items-start gap-3">
                            <div className="p-1.5 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                              <FaClock className="h-3 w-3 text-amber-600 dark:text-amber-400" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {req.doctorName}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Pending verification request
                              </p>
                            </div>
                          </div>
                        </DropdownMenuItem>
                      ))
                    ) : (
                      <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                        No new notifications
                      </div>
                    )}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="w-9 h-9 rounded-full bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-700/80 flex items-center justify-center transition-all duration-300 border border-gray-300 dark:border-gray-600"
              >
                {isDarkMode ? (
                  <FaSun className="h-4 w-4 text-yellow-400" />
                ) : (
                  <FaMoon className="h-4 w-4 text-[#293379]" />
                )}
              </button>

              {/* User Menu */}
              <DropdownMenu open={showUserMenu} onOpenChange={setShowUserMenu}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 px-2"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#293379] to-[#3a4a9c] flex items-center justify-center">
                      <FaUserCircle className="h-5 w-5 text-white" />
                    </div>
                    <span className="hidden md:inline text-sm font-medium text-gray-700 dark:text-gray-300">
                      Admin
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem className="cursor-pointer">
                    <FaUserCircle className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <FaChartLine className="mr-2 h-4 w-4" />
                    Analytics
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-red-600 dark:text-red-400" onClick={logout}>
                    <FaSignOutAlt className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon">
                    <FaBars className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => setViewMode("pending")}>
                    <FaClock className="mr-2 h-4 w-4" />
                    Pending
                    {stats.totalPending > 0 && (
                      <span className="ml-auto px-1.5 py-0.5 bg-[#293379] text-white rounded-full text-xs">
                        {stats.totalPending}
                      </span>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setViewMode("doctors")}>
                    <FaUserMd className="mr-2 h-4 w-4" />
                    Doctors
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setViewMode("users")}>
                    <FaUsers className="mr-2 h-4 w-4" />
                    Users
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#293379] dark:text-white">
            {getGreeting()}, Admin
          </h1>
          <div className="flex items-center gap-4 mt-2">
            <p className="text-gray-600 dark:text-gray-400">
              {formatDate()} • {formatTime()}
            </p>
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
              Admin Dashboard
            </span>
          </div>
        </div>

        {/* Stats Cards - Matching landing page style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <Card className="border border-blue-200/50 dark:border-gray-700/50 bg-white dark:bg-gray-900 hover:shadow-lg transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-md">
                  <FaClock className="h-6 w-6 text-white" />
                </div>
                <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                  <FaArrowUp className="h-3 w-3" />
                  {stats.newToday}
                </span>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.totalPending}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Pending Reviews
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 flex items-center gap-1">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                Positive trend
              </p>
            </div>
          </Card>

          <Card className="border border-blue-200/50 dark:border-gray-700/50 bg-white dark:bg-gray-900 hover:shadow-lg transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-md">
                  <FaCheckCircle className="h-6 w-6 text-white" />
                </div>
                <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                  <FaArrowUp className="h-3 w-3" />
                  +12%
                </span>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.totalDoctors}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Verified Doctors
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 flex items-center gap-1">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                Positive trend
              </p>
            </div>
          </Card>

          <Card className="border border-blue-200/50 dark:border-gray-700/50 bg-white dark:bg-gray-900 hover:shadow-lg transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-md">
                  <FaUsers className="h-6 w-6 text-white" />
                </div>
                <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                  <FaArrowUp className="h-3 w-3" />
                  +8%
                </span>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.totalUsers}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Total Users
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 flex items-center gap-1">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                Positive trend
              </p>
            </div>
          </Card>

          <Card className="border border-blue-200/50 dark:border-gray-700/50 bg-white dark:bg-gray-900 hover:shadow-lg transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md">
                  <FaDollarSign className="h-6 w-6 text-white" />
                </div>
                <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                  <FaArrowUp className="h-3 w-3" />
                  +15%
                </span>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                $18,450
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Platform Revenue
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 flex items-center gap-1">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                Positive trend
              </p>
            </div>
          </Card>
        </div>

        

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder={`Search ${viewMode}...`}
              className="pl-10 bg-white dark:bg-gray-900 border-blue-200/50 dark:border-gray-700/50 focus:border-[#293379] dark:focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-4">
          {viewMode === "pending" && (
            <>
              {pendingRequests?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pendingRequests?.map((request) => (
                    <DoctorVerificationCard
                      key={request.id}
                      request={request}
                      onClick={handleCardClick}
                    />
                  ))}
                </div>
              ) : (
                <Card className="border border-blue-200/50 dark:border-gray-700/50 bg-white dark:bg-gray-900 p-12 text-center">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-4">
                    <FaCheckCircle className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    No Pending Verifications
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    All doctor verification requests have been processed.
                  </p>
                </Card>
              )}
            </>
          )}

          {viewMode === "doctors" && (
            <DoctorList
              doctors={allDoctors}
              onViewDoctor={(doctor) => {
                setSelectedRequest(doctor);
                setIsModalOpen(true);
              }}
            />
          )}

          {viewMode === "users" && <UserList users={users} />}
        </div>

        {/* Footer - Matching landing page style */}
        <footer className="mt-12 pt-6 border-t border-blue-200/50 dark:border-gray-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <FaShieldAlt className="h-3 w-3 text-[#293379] dark:text-blue-400" />
                Verified
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <FaCheckCircle className="h-3 w-3 text-green-500" />
                Secure Platform
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Cureon. All rights reserved.
            </p>
          </div>
        </footer>

        {/* Modals */}
        <DoctorVerificationModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedRequest(null);
          }}
          request={selectedRequest}
          onAccept={handleAccept}
          onReject={handleRejectClick}
        />

        {/* Reject Modal */}
        {showRejectModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md bg-white dark:bg-gray-900 border border-blue-200/50 dark:border-gray-700/50">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-[#293379] dark:text-white mb-4">
                  Reject Verification Request
                </h3>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Please provide a reason for rejecting this doctor's
                    verification request.
                  </p>
                  <textarea
                    className="w-full p-3 border border-blue-200/50 dark:border-gray-700/50 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    rows="4"
                    placeholder="Enter rejection reason..."
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                  />
                  <div className="flex gap-3">
                    <Button
                      className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                      onClick={handleRejectConfirm}
                      disabled={!rejectReason.trim()}
                    >
                      Confirm Rejection
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-blue-200/50 dark:border-gray-700/50"
                      onClick={() => {
                        setShowRejectModal(false);
                        setRejectReason("");
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  return (
    <DashboardProvider>
      <AdminDashboardContent />
    </DashboardProvider>
  );
};

export default AdminDashboard;
