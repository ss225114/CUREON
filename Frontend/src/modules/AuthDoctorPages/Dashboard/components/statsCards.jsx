import { Card, CardContent } from "@/components/ui/card";
import {
  FaUsers,
  FaCalendarCheck,
  FaFileMedical,
  FaDollarSign,
} from "react-icons/fa";
import { useDashboard } from "../context/dashboardContext";

const stats = [
  {
    title: "Total Patients",
    value: "1,245",
    change: "+12%",
    icon: <FaUsers className="h-6 w-6" />,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    title: "Today's Appointments",
    value: "8",
    change: "+2",
    icon: <FaCalendarCheck className="h-6 w-6" />,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50 dark:bg-green-900/20",
  },
  {
    title: "Documents Stored",
    value: "342",
    change: "+24",
    icon: <FaFileMedical className="h-6 w-6" />,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
  },
  {
    title: "Monthly Revenue",
    value: "$18,450",
    change: "+8%",
    icon: <FaDollarSign className="h-6 w-6" />,
    color: "from-amber-500 to-amber-600",
    bgColor: "bg-amber-50 dark:bg-amber-900/20",
  },
];

export default function StatsCards() {
  const { doctorData } = useDashboard();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  {stat.title}
                </p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </h3>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    {stat.change}
                  </span>
                </div>
              </div>
              <div
                className={`p-3 rounded-full ${stat.bgColor} bg-gradient-to-br ${stat.color} bg-clip-text`}
              >
                <div
                  className={`text-transparent bg-gradient-to-br ${stat.color} bg-clip-text`}
                >
                  {stat.icon}
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500 dark:text-gray-400">
                  Since last month
                </span>
                <span className="text-green-600 dark:text-green-400 font-medium">
                  ↗ Positive trend
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
