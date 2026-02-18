import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DoctorList = ({ doctors, onViewDoctor }) => {
  const getStatusColor = (status) => {
    switch(status) {
      case 'verified': return 'text-green-600';
      case 'pending': return 'text-amber-600';
      case 'rejected': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-3">
      {doctors.map((doctor) => (
        <Card key={doctor.id} className="border border-gray-200 bg-white">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">{doctor.doctorName}</h4>
                <div className="flex items-center gap-3 mt-1">
                  <p className="text-sm text-gray-500">{doctor.specialization}</p>
                  <p className="text-sm text-gray-500">{doctor.hospital}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className={`text-sm ${getStatusColor(doctor.status)}`}>
                  {doctor.status}
                </span>
                <Button
                  size="sm"
                  variant="outline"
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