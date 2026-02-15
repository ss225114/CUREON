import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FaChartLine,
  FaUsers,
  FaStar,
  FaCheckCircle,
  FaCalendarCheck,
  FaHeart,
} from "react-icons/fa";
import { useProfile } from "../context/profileContext";

export default function StatisticsCard() {
  const { doctorProfile } = useProfile();

  const stats = [
    {
      icon: <FaUsers className="h-6 w-6" />,
      label: "Total Patients",
      value: doctorProfile?.statistics?.totalPatients,
      change: "+12%",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <FaChartLine className="h-6 w-6" />,
      label: "Success Rate",
      value: doctorProfile?.statistics?.successRate,
      change: "+2.4%",
      color: "from-green-500 to-green-600",
    },
    {
      icon: <FaStar className="h-6 w-6" />,
      label: "Average Rating",
      value: doctorProfile?.statistics?.averageRating,
      change: "+0.2",
      color: "from-amber-500 to-amber-600",
    },
    {
      icon: <FaCalendarCheck className="h-6 w-6" />,
      label: "Monthly Consultations",
      value: doctorProfile?.statistics?.monthlyConsultations,
      change: "+8",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: <FaHeart className="h-6 w-6" />,
      label: "Patient Satisfaction",
      value: doctorProfile?.statistics?.patientSatisfaction,
      change: "+3%",
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: <FaCheckCircle className="h-6 w-6" />,
      label: "Years Experience",
      value: `${doctorProfile?.statistics?.yearsExperience} years`,
      change: "+1 year",
      color: "from-indigo-500 to-indigo-600",
    },
  ];

  return (
    <Card className="border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-[#293379] dark:text-white flex items-center gap-2">
          <FaChartLine className="h-5 w-5" />
          Practice Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-[#293379] dark:hover:border-blue-600 transition-colors duration-200"
            >
              <div className="flex items-center justify-center mb-3">
                <div
                  className={`p-3 rounded-full bg-gradient-to-br ${stat.color} bg-opacity-10`}
                >
                  <div
                    className={`text-transparent bg-gradient-to-br ${stat.color} bg-clip-text`}
                  >
                    {stat.icon}
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {stat.label}
                </div>
                <div className="text-xs text-green-600 dark:text-green-400 mt-2">
                  {stat.change} this month
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
