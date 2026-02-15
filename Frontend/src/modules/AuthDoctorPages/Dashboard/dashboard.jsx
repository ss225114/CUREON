import { DashboardProvider, useDashboard } from "./context/dashboardContext";
import Header from "./components/Header";
import StatsCards from "./components/StatsCards";
import BlogCarousel from "./components/BlogCarousel";
import Appointments from "./components/Appointments";
import Timetable from "./components/Timetable";
import Footer from "./components/footer";

function DoctorDashboard() {
  const { isLoading } = useDashboard();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <div className="h-16 w-16 border-4 border-[#293379] dark:border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-[#293379] dark:text-white mb-2">
              Loading Dashboard...
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Preparing your medical workspace
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <Header />

      <main className="p-6 space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-[#293379]/5 to-[#016b61]/5 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl p-6 border border-[#293379]/20 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#293379] dark:text-white mb-2">
                Your Professional Dashboard
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Manage your practice, appointments, and patient care all in one
                place. Stay updated with the latest medical insights.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <span className="px-3 py-1 bg-gradient-to-r from-[#293379] to-[#3a4a9c] text-white rounded-full text-sm font-medium">
                Verified
              </span>
              <span className="px-3 py-1 bg-gradient-to-r from-[#016b61] to-[#018377] text-white rounded-full text-sm font-medium">
                Secure
              </span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <StatsCards />

        {/* Blog Carousel */}
        <BlogCarousel />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <Appointments />
            {/* DocumentsStore removed */}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <Timetable />

            {/* Profile Summary */}
            {/* <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Profile Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Experience:
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    12 years
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Patients Treated:
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    1,245+
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Success Rate:
                  </span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    94.2%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Response Time:
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    &lt; 15 mins
                  </span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Last login: Today, 8:30 AM
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Main export with provider
export default function Dashboard() {
  return (
    <DashboardProvider>
      <DoctorDashboard />
    </DashboardProvider>
  );
}
