import React from 'react';
import { Card } from "@/components/ui/card";

const DoctorVerificationCard = ({ request, onClick }) => {
  const getStatusColor = (status) => {
    switch(status) {
      case 'pending':
        return 'text-amber-600';
      case 'verified':
        return 'text-green-600';
      case 'rejected':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <Card 
      className="border border-gray-200 bg-white hover:shadow-md transition-all duration-200 cursor-pointer"
      onClick={() => onClick(request)}
    >
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-gray-900">{request.doctorName}</h3>
          <span className={`text-sm ${getStatusColor(request.status)}`}>
            {request.status === 'pending' ? 'Pending' : request.status}
          </span>
        </div>
        <p className="text-sm text-gray-500">{request.specialization}</p>
        <p className="text-sm text-gray-500 mt-1">{request.hospital}</p>
        <div className="mt-3 text-xs text-gray-400">
          Submitted: {request.submittedDate}
        </div>
      </div>
    </Card>
  );
};

export default DoctorVerificationCard;