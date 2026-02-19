import React, { createContext, useState, useContext, useCallback } from "react";

const AppointmentsContext = createContext();

export const useAppointments = () => {
  const context = useContext(AppointmentsContext);
  if (!context) {
    throw new Error("useAppointments must be used within AppointmentsProvider");
  }
  return context;
};

const doctorInfo = {
  id: "DOC-001",
  name: "Dr. Sarah Johnson",
  specialization: "General Physician",
  hospital: "City General Hospital",
  experience: "12 years",
  email: "sarah.johnson@cityhospital.com",
  phone: "+1 (555) 987-6543",
  consultationFee: "$150",
  availableDays: ["Monday", "Wednesday", "Friday", "Saturday"],
  consultationHours: "9:00 AM - 5:00 PM",
};

const generalPhysicianReasons = [
  "General Health Checkup",
  "Fever and Cold Symptoms",
  "High Blood Pressure Management",
  "Diabetes Monitoring",
  "Cholesterol Check",
];

const generalPhysicianSymptoms = [
  "Fever, cough, and sore throat",
  "Persistent headaches and fatigue",
  "High blood pressure readings",
  "Elevated blood sugar levels",
  "Unexplained weight loss/gain",
];

const generateAppointments = () => {
  const appointments = [];
  const today = new Date();

  const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const randomName = () => {
    const firstNames = ["John", "Jane", "Robert", "Sarah", "Michael"];
    const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones"];
    return `${randomItem(firstNames)} ${randomItem(lastNames)}`;
  };

  // Generate past appointments (last 4 days)
  for (let i = 4; i > 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateString = date.toISOString().split("T")[0];
    const patientCount = Math.floor(Math.random() * 3) + 1;

    for (let j = 0; j < patientCount; j++) {
      const patientName = randomName();
      const status = Math.random() > 0.2 ? "completed" : "rejected";

      appointments.push({
        id: `app-${dateString}-${j}`,
        patientName,
        patientAge: 20 + Math.floor(Math.random() * 50),
        gender: Math.random() > 0.5 ? "Male" : "Female",
        email: `${patientName.toLowerCase().replace(" ", ".")}@email.com`,
        phone: `+1 (555) ${100 + Math.floor(Math.random() * 900)}-${1000 + Math.floor(Math.random() * 9000)}`,
        appointmentDate: dateString,
        appointmentTime: `${9 + Math.floor(Math.random() * 8)}:${Math.random() > 0.5 ? "00" : "30"} ${Math.random() > 0.5 ? "AM" : "PM"}`,
        type: randomItem(["video", "phone", "in-person"]),
        status,
        reason: randomItem(generalPhysicianReasons),
        symptoms: randomItem(generalPhysicianSymptoms),
        duration: randomItem(["30 minutes", "45 minutes", "60 minutes"]),
        priority: randomItem(["High", "Medium", "Low"]),
        doctorId: doctorInfo.id,
        doctorName: doctorInfo.name,
      });
    }
  }

  // Generate today's appointments
  const todayString = today.toISOString().split("T")[0];
  const todayCount = Math.floor(Math.random() * 4) + 2;

  for (let i = 0; i < todayCount; i++) {
    const patientName = randomName();
    const status = i === 0 ? "pending" : i === 1 ? "confirmed" : "completed";

    appointments.push({
      id: `app-${todayString}-${i}`,
      patientName,
      patientAge: 25 + Math.floor(Math.random() * 45),
      gender: Math.random() > 0.5 ? "Male" : "Female",
      email: `${patientName.toLowerCase().replace(" ", ".")}@email.com`,
      phone: `+1 (555) ${100 + Math.floor(Math.random() * 900)}-${1000 + Math.floor(Math.random() * 9000)}`,
      appointmentDate: todayString,
      appointmentTime: `${9 + i}:${i % 2 === 0 ? "00" : "30"} ${i < 4 ? "AM" : "PM"}`,
      type: randomItem(["video", "phone", "in-person"]),
      status,
      reason: randomItem(generalPhysicianReasons),
      symptoms: randomItem(generalPhysicianSymptoms),
      duration: randomItem(["30 minutes", "45 minutes"]),
      priority: i === 0 ? "High" : randomItem(["Medium", "Low"]),
      doctorId: doctorInfo.id,
      doctorName: doctorInfo.name,
    });
  }

  // Generate future appointments (next 2 days)
  for (let i = 1; i <= 2; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dateString = date.toISOString().split("T")[0];
    const patientCount = Math.floor(Math.random() * 2) + 1;

    for (let j = 0; j < patientCount; j++) {
      const patientName = randomName();
      const status = "pending";

      appointments.push({
        id: `app-${dateString}-${j}`,
        patientName,
        patientAge: 18 + Math.floor(Math.random() * 60),
        gender: Math.random() > 0.5 ? "Male" : "Female",
        email: `${patientName.toLowerCase().replace(" ", ".")}@email.com`,
        phone: `+1 (555) ${100 + Math.floor(Math.random() * 900)}-${1000 + Math.floor(Math.random() * 9000)}`,
        appointmentDate: dateString,
        appointmentTime: `${9 + Math.floor(Math.random() * 8)}:${Math.random() > 0.5 ? "00" : "30"} ${Math.random() > 0.5 ? "AM" : "PM"}`,
        type: randomItem(["video", "phone", "in-person"]),
        status,
        reason: randomItem(generalPhysicianReasons),
        symptoms: randomItem(generalPhysicianSymptoms),
        duration: randomItem(["30 minutes", "45 minutes"]),
        priority: randomItem(["High", "Medium", "Low"]),
        doctorId: doctorInfo.id,
        doctorName: doctorInfo.name,
      });
    }
  }

  return appointments;
};

export const AppointmentsProvider = ({ children }) => {
  const [appointments, setAppointments] = useState(generateAppointments());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [doctor] = useState(doctorInfo);

  const getAppointmentsForDate = useCallback(
    (date) => {
      try {
        const dateString = date.toISOString().split("T")[0];
        return appointments.filter((app) => app.appointmentDate === dateString);
      } catch (error) {
        return [];
      }
    },
    [appointments],
  );

  const todayAppointments = React.useMemo(() => {
    return getAppointmentsForDate(new Date());
  }, [getAppointmentsForDate]);

  const upcomingAppointments = React.useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const nextTwoDays = new Date(today);
    nextTwoDays.setDate(today.getDate() + 2);

    return appointments.filter((app) => {
      const appDate = new Date(app.appointmentDate);
      appDate.setHours(0, 0, 0, 0);
      return (
        appDate > today && appDate <= nextTwoDays && app.status === "pending"
      );
    });
  }, [appointments]);

  const updateAppointmentStatus = (appointmentId, status) => {
    setAppointments((prev) =>
      prev.map((app) =>
        app.id === appointmentId
          ? { ...app, status, updatedAt: new Date().toISOString() }
          : app,
      ),
    );
  };

  const stats = React.useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    const todaysApps = appointments.filter(
      (app) => app.appointmentDate === today,
    );

    return {
      total: todaysApps.length,
      pending: todaysApps.filter((app) => app.status === "pending").length,
      confirmed: todaysApps.filter((app) => app.status === "confirmed").length,
      completed: todaysApps.filter((app) => app.status === "completed").length,
      rejected: todaysApps.filter((app) => app.status === "rejected").length,
    };
  }, [appointments]);

  const value = {
    appointments,
    selectedDate,
    setSelectedDate,
    todayAppointments,
    upcomingAppointments,
    getAppointmentsForDate,
    updateAppointmentStatus,
    stats,
    doctor,
  };

  return (
    <AppointmentsContext.Provider value={value}>
      {children}
    </AppointmentsContext.Provider>
  );
};