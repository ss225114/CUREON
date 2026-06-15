import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DoctorList = ({ doctors, onViewDoctor }) => {
  // const getStatusColor = (status) => {
  //   if(status) {
  //     return 'text-green-600';
  //   } else {
  //     return 'text-amber-600';
  //   }
  // };

  return (
    <div className="space-y-3">
      {doctors.map((doctor) => (
        <Card
          key={doctor.id}
          className="
    border border-blue-200/50 dark:border-gray-700/50
    bg-white dark:bg-gray-900
    transition-colors
  "
        >
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {doctor.fullName}
                </h4>

                <div className="flex items-center gap-3 mt-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {Array.isArray(doctor.specialization)
                      ? doctor.specialization.join(", ")
                      : doctor.specialization}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span
                  className={`text-sm font-medium ${
                    doctor.isActive
                      ? "text-green-600 dark:text-green-400"
                      : "text-amber-600 dark:text-amber-400"
                  }`}
                >
                  {doctor.isActive ? "Verified" : "Pending"}
                </span>

                <Button
                  size="sm"
                  variant="outline"
                  className="
            dark:border-gray-600
            dark:bg-gray-800
            dark:text-white
            dark:hover:bg-gray-700
          "
                  onClick={() => onViewDoctor(doctor)}
                >
                  View
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default DoctorList;