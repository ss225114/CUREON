import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FaVideo,
  FaPhone,
  FaUserInjured,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaVenusMars,
  FaCalendar,
  FaStethoscope,
  FaExclamationCircle,
  FaUserMd,
  FaEnvelope,
  FaPhoneAlt,
  FaNotesMedical,
} from "react-icons/fa";
import { useAppointments } from "../context/AppointmentsContext";
import { ca } from 'zod/v4/locales';

const getTypeIcon = (type) => {
  switch (type) {
    case 'video':
      return <FaVideo className="h-4 w-4" />;
    case 'phone':
      return <FaPhone className="h-4 w-4" />;
    case 'in-person':
      return <FaUserInjured className="h-4 w-4" />;
    default:
      return <FaUserInjured className="h-4 w-4" />;
  }
};

const getTypeColor = (type) => {
  switch (type) {
    case 'video':
      return {
        bg: 'bg-purple-50 dark:bg-purple-900/20',
        text: 'text-purple-600 dark:text-purple-400',
        border: 'border-l-4 border-purple-500',
      };
    case 'phone':
      return {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        text: 'text-blue-600 dark:text-blue-400',
        border: 'border-l-4 border-blue-500',
      };
    case 'in-person':
      return {
        bg: 'bg-green-50 dark:bg-green-900/20',
        text: 'text-green-600 dark:text-green-400',
        border: 'border-l-4 border-green-500',
      };
    default:
      return {
        bg: 'bg-gray-50 dark:bg-gray-900/20',
        text: 'text-gray-600 dark:text-gray-400',
        border: 'border-l-4 border-gray-500',
      };
  }
};

const getStatusConfig = (status) => {
  switch (status) {
    case 'pending':
      return {
        text: 'Pending',
        bg: 'bg-amber-50 dark:bg-amber-900/20',
        textColor: 'text-amber-700 dark:text-amber-300',
        icon: FaClock
      };
    case 'accepted':
      return {
        text: 'Confirmed',
        bg: 'bg-green-50 dark:bg-green-900/20',
        textColor: 'text-green-700 dark:text-green-300',
        icon: FaCheckCircle
      };
    case 'completed':
      return {
        text: 'Completed',
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        textColor: 'text-blue-700 dark:text-blue-300',
        icon: FaCheckCircle
      };
    case 'rejected':
      return {
        text: 'Rejected',
        bg: 'bg-red-50 dark:bg-red-900/20',
        textColor: 'text-red-700 dark:text-red-300',
        icon: FaTimesCircle
      };
    default:
      return {
        text: 'Unknown',
        bg: 'bg-gray-50 dark:bg-gray-900/20',
        textColor: 'text-gray-700 dark:text-gray-300',
        icon: FaExclamationCircle
      };
  }
};

const getPriorityConfig = (priority) => {
  switch (priority) {
    case 'High':
      return {
        bg: 'bg-red-50 dark:bg-red-900/20',
        text: 'text-red-700 dark:text-red-300',
      };
    case 'Medium':
      return {
        bg: 'bg-amber-50 dark:bg-amber-900/20',
        text: 'text-amber-700 dark:text-amber-300',
      };
    case 'Low':
      return {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        text: 'text-blue-700 dark:text-blue-300',
      };
    default:
      return {
        bg: 'bg-gray-50 dark:bg-gray-900/20',
        text: 'text-gray-700 dark:text-gray-300',
      };
  }
};

const AppointmentCard = ({ appointment, isUpcoming = false }) => {
  const { updateAppointmentStatus, doctor } = useAppointments();
  const typeConfig = getTypeColor(appointment.type);
  const statusConfig = getStatusConfig(appointment.status);
  const priorityConfig = getPriorityConfig(appointment.priority);
  const StatusIcon = statusConfig.icon;

  const handleAccept = () => updateAppointmentStatus(appointment.id, 'confirmed');
  const handleReject = () => updateAppointmentStatus(appointment.id, 'rejected');

  const calculateDuration = (startTime, endTime) => {
    if (!startTime || !endTime) return "N/A";

    const convertToMinutes = (timeStr) => {
      const [time, modifier] = timeStr.split(" ");

      let [hours, minutes] = time.split(":").map(Number);

      if (modifier === "PM" && hours !== 12) {
        hours += 12;
      }

      if (modifier === "AM" && hours === 12) {
        hours = 0;
      }

      return hours * 60 + minutes;
    };

    const startMinutes = convertToMinutes(startTime);
    const endMinutes = convertToMinutes(endTime);

    const duration = endMinutes - startMinutes;

    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    if (hours > 0 && minutes > 0) {
      return `${hours}h ${minutes}m`;
    }

    if (hours > 0) {
      return `${hours}h`;
    }

    return `${minutes}m`;
  };

  return (
    <Card className={`${typeConfig.border} bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all duration-300`}>
      <CardContent className="p-0">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-lg ${typeConfig.bg}`}>
                <div className={typeConfig.text}>
                  {getTypeIcon(appointment.type)}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">
                  {appointment.patientId.fullName}
                </h3>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {appointment.slotId.startTime}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {calculateDuration(appointment.slotId.startTime, appointment.slotId.endTime)}
              </div>
            </div>
          </div>
        </div>

        {/* Appointment Details */}
        <div className="p-4">
          {/* Status and Priority */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-2 ${statusConfig.bg} ${statusConfig.textColor}`}>
              <StatusIcon className="h-3 w-3" />
              {statusConfig.text}
            </span>
            {/* <span className={`px-3 py-1.5 rounded-md text-xs font-medium ${priorityConfig.bg} ${priorityConfig.text}`}>
              {appointment.priority} Priority
            </span> */}
          </div>

          {/* Medical Details */}
          <div className="space-y-3 mb-4">
            {/* <div className="flex items-start gap-3">
              <FaNotesMedical className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Reason</p>
                <p className="text-sm text-gray-900 dark:text-gray-200">{appointment.reason}</p>
              </div>
            </div> */}
            <div className="flex items-start gap-3">
              <FaStethoscope className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Symptoms</p>
                <p className="text-sm text-gray-900 dark:text-gray-200">{appointment.symptoms}</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 mb-4">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Contact Information</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center gap-2">
                <FaEnvelope className="h-3.5 w-3.5 text-gray-400" />
                <span className="text-sm text-gray-900 dark:text-gray-200 truncate">{appointment.patientId.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaPhoneAlt className="h-3.5 w-3.5 text-gray-400" />
                <span className="text-sm text-gray-900 dark:text-gray-200">{appointment.patientId.userProfile?.phone}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {isUpcoming && appointment.status === 'pending' && (
            <div className="flex gap-3 pt-3 border-t border-gray-100 dark:border-gray-800">
              <Button
                onClick={handleAccept}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium"
              >
                <FaCheckCircle className="mr-2 h-4 w-4" />
                Accept Appointment
              </Button>
              <Button
                onClick={handleReject}
                variant="outline"
                className="flex-1 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <FaTimesCircle className="mr-2 h-4 w-4" />
                Decline
              </Button>
            </div>
          )}

          {/* {!isUpcoming && appointment.status !== 'pending' && (
            <Button 
              className="w-full bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white font-medium"
            >
              <FaUserMd className="mr-2 h-4 w-4" />
              View Patient Details
            </Button>
          )} */}
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentCard;