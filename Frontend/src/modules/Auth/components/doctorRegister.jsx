import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Lottie from "lottie-react";
import docRegister from "@/assets/static/docRegister.json";
import axios from "axios";

// Degree options from schema
const degreeOptions = [
  { value: "MD", label: "MD (Doctor of Medicine)" },
  { value: "DO", label: "DO (Doctor of Osteopathic Medicine)" },
  { value: "PHD", label: "PhD (Doctor of Philosophy)" },
  { value: "DDS", label: "DDS (Doctor of Dental Surgery)" },
  { value: "DMD", label: "DMD (Doctor of Dental Medicine)" },
  { value: "DNP", label: "DNP (Doctor of Nursing Practice)" },
  { value: "PHARMD", label: "PharmD (Doctor of Pharmacy)" },
  { value: "UNKNOWN", label: "Other/Unknown" },
];

// Specialization options from schema
const specializationOptions = [
  "GENERAL_PHYSICIAN",
  "INTERNAL_MEDICINE",
  "PEDIATRICS",
  "GYNECOLOGY",
  "OBSTETRICS",
  "CARDIOLOGY",
  "DERMATOLOGY",
  "ORTHOPEDICS",
  "NEUROLOGY",
  "NEUROSURGERY",
  "PSYCHIATRY",
  "PSYCHOLOGY",
  "ENT",
  "OPHTHALMOLOGY",
  "GASTROENTEROLOGY",
  "PULMONOLOGY",
  "ENDOCRINOLOGY",
  "NEPHROLOGY",
  "UROLOGY",
  "ONCOLOGY",
  "HEMATOLOGY",
  "RHEUMATOLOGY",
  "GENERAL_SURGERY",
  "PLASTIC_SURGERY",
  "VASCULAR_SURGERY",
  "ANESTHESIOLOGY",
  "RADIOLOGY",
  "PATHOLOGY",
  "EMERGENCY_MEDICINE",
  "FAMILY_MEDICINE",
  "GERIATRICS",
  "INFECTIOUS_DISEASE",
  "SPORTS_MEDICINE",
  "PAIN_MANAGEMENT",
  "DENTISTRY",
  "ORTHODONTICS",
  "AYURVEDA",
  "HOMEOPATHY",
  "UNANI",
  "OTHER",
];

// Map enum values to readable labels
const specializationLabels = {
  GENERAL_PHYSICIAN: "General Physician",
  INTERNAL_MEDICINE: "Internal Medicine",
  PEDIATRICS: "Pediatrics",
  GYNECOLOGY: "Gynecology",
  OBSTETRICS: "Obstetrics",
  CARDIOLOGY: "Cardiology",
  DERMATOLOGY: "Dermatology",
  ORTHOPEDICS: "Orthopedics",
  NEUROLOGY: "Neurology",
  NEUROSURGERY: "Neurosurgery",
  PSYCHIATRY: "Psychiatry",
  PSYCHOLOGY: "Psychology",
  ENT: "ENT",
  OPHTHALMOLOGY: "Ophthalmology",
  GASTROENTEROLOGY: "Gastroenterology",
  PULMONOLOGY: "Pulmonology",
  ENDOCRINOLOGY: "Endocrinology",
  NEPHROLOGY: "Nephrology",
  UROLOGY: "Urology",
  ONCOLOGY: "Oncology",
  HEMATOLOGY: "Hematology",
  RHEUMATOLOGY: "Rheumatology",
  GENERAL_SURGERY: "General Surgery",
  PLASTIC_SURGERY: "Plastic Surgery",
  VASCULAR_SURGERY: "Vascular Surgery",
  ANESTHESIOLOGY: "Anesthesiology",
  RADIOLOGY: "Radiology",
  PATHOLOGY: "Pathology",
  EMERGENCY_MEDICINE: "Emergency Medicine",
  FAMILY_MEDICINE: "Family Medicine",
  GERIATRICS: "Geriatrics",
  INFECTIOUS_DISEASE: "Infectious Disease",
  SPORTS_MEDICINE: "Sports Medicine",
  PAIN_MANAGEMENT: "Pain Management",
  DENTISTRY: "Dentistry",
  ORTHODONTICS: "Orthodontics",
  AYURVEDA: "Ayurveda",
  HOMEOPATHY: "Homeopathy",
  UNANI: "Unani",
  OTHER: "Other",
};

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
];

export default function DoctorPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
    degree: "",
    specialization: [],
    govtId: "",
    doctorLicenseNo: "",
    doctorRegistrationNo: "",
    stateMedicalCouncil: "",

    documents: {
      govtIdDocument: null,
      degreeCertificate: null,
      registrationCertificate: null,
      clinicProof: null,
    },
  });

  const [openDegree, setOpenDegree] = useState(false);
  const [openCouncil, setOpenCouncil] = useState(false);
  const [openSpecialization, setOpenSpecialization] = useState(false);
  const [errors, setErrors] = useState({});

  let confirmPassword;

  const validateForm = () => {
    const newErrors = {};

    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Invalid email format";

    if (!form.phone) newErrors.phone = "Phone number is required";
    else if (!/^[6-9]\d{9}$/.test(form.phone))
      newErrors.phone =
        "Invalid phone number (must be 10 digits starting with 6-9)";

    if (!form.gender) newErrors.gender = "Gender is required";

    if (!form.degree) newErrors.degree = "Degree is required";
    if (form.specialization.length === 0)
      newErrors.specialization = "At least one specialization is required";
    if (!form.govtId) newErrors.govtId = "Government ID is required";
    if (!form.doctorLicenseNo)
      newErrors.doctorLicenseNo = "Doctor License Number is required";

    if (!form.doctorRegistrationNo)
      newErrors.doctorRegistrationNo = "Doctor Registration Number is required";
    if (!form.stateMedicalCouncil)
      newErrors.stateMedicalCouncil = "State medical council required";

    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (form.password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (!form.documents.govtIdDocument)
      newErrors.govtIdDocument = "Government ID proof is required";

    if (!form.documents.degreeCertificate)
      newErrors.degreeCertificate = "Degree certificate is required";

    if (!form.documents.registrationCertificate)
      newErrors.registrationCertificate =
        "Registration certificate is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const formData = new FormData();

        formData.append("fullName", form.fullName);
        formData.append("email", form.email);
        formData.append("phone", form.phone);
        formData.append("gender", form.gender);
        formData.append("password", form.password);
        formData.append("degree", form.degree);
        formData.append("govtId", form.govtId);

        formData.append("doctorLicenseNo", form.doctorLicenseNo);

        formData.append("doctorRegistrationNo", form.doctorRegistrationNo);

        formData.append("stateMedicalCouncil", form.stateMedicalCouncil);

        form.specialization.forEach((spec) => {
          formData.append("specialization", spec);
        });

        formData.append("govtIdDocument", form.documents.govtIdDocument);

        formData.append("degreeCertificate", form.documents.degreeCertificate);

        formData.append(
          "registrationCertificate",
          form.documents.registrationCertificate,
        );

        if (form.documents.clinicProof) {
          formData.append("clinicProof", form.documents.clinicProof);
        }

        const response = await axios.post(
          "http://localhost:5000/auth/doctor/register",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        console.log(response.data);

        alert("Registration successful! Please wait for admin approval.");

        navigate("/login");
      } catch (err) {
        console.log(err.response?.data || err);
      }
    }
  };

  const handleSpecializationToggle = (value) => {
    setForm((prev) => {
      const current = [...prev.specialization];
      if (current.includes(value)) {
        return {
          ...prev,
          specialization: current.filter((item) => item !== value),
        };
      } else {
        return { ...prev, specialization: [...current, value] };
      }
    });
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Form Section - Wider */}
      <div className="w-full lg:w-2/3 flex items-center justify-center p-4 lg:p-8">
        <Card className="w-full max-w-4xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-blue-200/50 dark:border-gray-700/50 shadow-xl">
          <CardHeader className="pb-6">
            <CardTitle className="text-3xl font-bold text-center text-[#293379] dark:text-blue-300">
              <i className="fa-solid fa-user-doctor mr-3"></i>
              Doctor Registration
            </CardTitle>
            <p className="text-center text-gray-600 dark:text-gray-400 mt-2">
              Register as a medical professional.
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Section 1: Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#293379] dark:text-blue-300 border-b pb-2">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label
                      htmlFor="fullName"
                      className="font-medium text-gray-700 dark:text-gray-300"
                    >
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Dr. John Doe"
                      value={form.fullName}
                      onChange={(e) =>
                        setForm({ ...form, fullName: e.target.value })
                      }
                      className="bg-white/70 dark:bg-gray-700/70 border-gray-300 dark:border-gray-600 h-12"
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="email"
                      className="font-medium text-gray-700 dark:text-gray-300"
                    >
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="doctor@example.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="bg-white/70 dark:bg-gray-700/70 border-gray-300 dark:border-gray-600 h-12"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="phone"
                      className="font-medium text-gray-700 dark:text-gray-300"
                    >
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      type="text"
                      placeholder="XXXX XXX XXX"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      className="bg-white/70 dark:bg-gray-700/70 border-gray-300 dark:border-gray-600 h-12"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="gender"
                      className="font-medium text-gray-700 dark:text-gray-300"
                    >
                      Gender *
                    </Label>

                    <Select
                      value={form.gender}
                      onValueChange={(value) =>
                        setForm({ ...form, gender: value })
                      }
                    >
                      <SelectTrigger
                        className={cn(
                          "w-full h-28 bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm",
                          "border-gray-300 dark:border-gray-600",
                          "hover:bg-white/80 dark:hover:bg-gray-700/80",
                          errors.gender && "border-red-500",
                        )}
                      >
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>

                      <SelectContent className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>

                    {errors.gender && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.gender}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 2: Professional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#293379] dark:text-blue-300 border-b pb-2">
                  Professional Information
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="font-medium text-gray-700 dark:text-gray-300">
                      Medical Degree *
                    </Label>
                    <Popover open={openDegree} onOpenChange={setOpenDegree}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openDegree}
                          className={cn(
                            "w-full justify-between h-12 bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm",
                            "border-gray-300 dark:border-gray-600 hover:bg-white/80 dark:hover:bg-gray-700/80",
                            errors.degree && "border-red-500",
                          )}
                        >
                          <span className="truncate">
                            {form.degree
                              ? degreeOptions.find(
                                  (d) => d.value === form.degree,
                                )?.label
                              : "Select your degree"}
                          </span>
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-[--radix-popover-trigger-width] p-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-gray-200 dark:border-gray-700"
                        align="start"
                      >
                        <Command className="bg-transparent">
                          <CommandInput placeholder="Search degree..." />
                          <CommandList className="max-h-72">
                            <CommandEmpty>No degree found.</CommandEmpty>
                            <CommandGroup>
                              {degreeOptions.map((degree) => (
                                <CommandItem
                                  key={degree.value}
                                  value={degree.value}
                                  onSelect={() => {
                                    setForm({ ...form, degree: degree.value });
                                    setOpenDegree(false);
                                  }}
                                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      form.degree === degree.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  {degree.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    {errors.degree && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.degree}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="doctorLicenseNo"
                      className="font-medium text-gray-700 dark:text-gray-300"
                    >
                      Doctor License Number *
                    </Label>
                    <Input
                      id="doctorLicenseNo"
                      type="text"
                      placeholder="e.g., MED123456"
                      value={form.doctorLicenseNo}
                      onChange={(e) =>
                        setForm({ ...form, doctorLicenseNo: e.target.value })
                      }
                      className="bg-white/70 dark:bg-gray-700/70 border-gray-300 dark:border-gray-600 h-12"
                    />
                    {errors.doctorLicenseNo && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.doctorLicenseNo}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="font-medium text-gray-700 dark:text-gray-300">
                      State Medical Council *
                    </Label>
                    <Popover open={openCouncil} onOpenChange={setOpenCouncil}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openCouncil}
                          className={cn(
                            "w-full justify-between h-12 bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm",
                            "border-gray-300 dark:border-gray-600 hover:bg-white/80 dark:hover:bg-gray-700/80",
                            errors.stateMedicalCouncil && "border-red-500",
                          )}
                        >
                          <span className="truncate">
                            {form.stateMedicalCouncil
                              ? indianStates.find(
                                  (s) => s === form.stateMedicalCouncil,
                                )
                              : "Select your state medical council"}
                          </span>
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-[--radix-popover-trigger-width] p-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-gray-200 dark:border-gray-700"
                        align="start"
                      >
                        <Command className="bg-transparent">
                          <CommandInput placeholder="Search state medical council..." />
                          <CommandList className="max-h-72">
                            <CommandEmpty>No state council found.</CommandEmpty>
                            <CommandGroup>
                              {indianStates.map((state) => (
                                <CommandItem
                                  key={state}
                                  value={state}
                                  onSelect={() => {
                                    setForm({
                                      ...form,
                                      stateMedicalCouncil: state,
                                    });
                                    setOpenCouncil(false);
                                  }}
                                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      form.stateMedicalCouncil === state
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  {state}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    {errors.stateMedicalCouncil && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.stateMedicalCouncil}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="doctorRegistrationNo"
                      className="font-medium text-gray-700 dark:text-gray-300"
                    >
                      Doctor Registration Number *
                    </Label>
                    <Input
                      id="doctorRegistrationNo"
                      type="number"
                      placeholder="e.g., 1234"
                      value={form.doctorRegistrationNo}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          doctorRegistrationNo: e.target.value,
                        })
                      }
                      className="bg-white/70 dark:bg-gray-700/70 border-gray-300 dark:border-gray-600 h-12"
                    />
                    {errors.doctorRegistrationNo && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.doctorRegistrationNo}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="govtId"
                    className="font-medium text-gray-700 dark:text-gray-300"
                  >
                    Government ID / Aadhaar Number *
                  </Label>
                  <div className="max-w-md">
                    <Input
                      id="govtId"
                      type="text"
                      placeholder="12-digit number"
                      value={form.govtId}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        if (value.length <= 12) {
                          setForm({ ...form, govtId: value });
                        }
                      }}
                      maxLength={12}
                      className="bg-white/70 dark:bg-gray-700/70 border-gray-300 dark:border-gray-600 h-12"
                    />
                    {errors.govtId && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.govtId}
                      </p>
                    )}
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Enter your 12-digit Government ID or Aadhaar number
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="font-medium text-gray-700 dark:text-gray-300">
                    Specialization(s) *
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
                      (Select one or more)
                    </span>
                  </Label>
                  <Popover
                    open={openSpecialization}
                    onOpenChange={setOpenSpecialization}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openSpecialization}
                        className={cn(
                          "w-full justify-between min-h-12 bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm",
                          "border-gray-300 dark:border-gray-600 hover:bg-white/80 dark:hover:bg-gray-700/80",
                          errors.specialization && "border-red-500",
                        )}
                      >
                        <div className="flex flex-wrap gap-1 overflow-hidden">
                          {form.specialization.length === 0 ? (
                            <span className="text-gray-500">
                              Select specializations...
                            </span>
                          ) : (
                            form.specialization.map((spec) => (
                              <span
                                key={spec}
                                className="inline-flex items-center bg-blue-100/70 dark:bg-blue-900/70 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm"
                              >
                                {specializationLabels[spec] || spec}
                              </span>
                            ))
                          )}
                        </div>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-[--radix-popover-trigger-width] p-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-gray-200 dark:border-gray-700"
                      align="start"
                    >
                      <Command className="bg-transparent">
                        <CommandInput placeholder="Search specialization..." />
                        <CommandList className="max-h-72">
                          <CommandEmpty>No specialization found.</CommandEmpty>
                          <CommandGroup>
                            {specializationOptions.map((spec) => {
                              const isSelected =
                                form.specialization.includes(spec);
                              return (
                                <CommandItem
                                  key={spec}
                                  value={spec}
                                  onSelect={() =>
                                    handleSpecializationToggle(spec)
                                  }
                                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      isSelected ? "opacity-100" : "opacity-0",
                                    )}
                                  />
                                  {specializationLabels[spec] || spec}
                                </CommandItem>
                              );
                            })}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {errors.specialization && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.specialization}
                    </p>
                  )}
                  {form.specialization.length > 0 && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Selected: {form.specialization.length} specialization(s)
                    </p>
                  )}
                </div>
              </div>

              {/* Section 3: DOCUMENT UPLOADS */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#293379] dark:text-blue-300 border-b pb-2">
                  Verification Documents
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Government ID */}
                  <div className="space-y-3">
                    <Label className="font-medium text-gray-700 dark:text-gray-300">
                      Government ID Proof *
                    </Label>

                    <Input
                      type="file"
                      accept=".pdf,image/*"
                      onChange={(e) =>
                        setForm({
                          ...form,
                          documents: {
                            ...form.documents,
                            govtIdDocument: e.target.files[0],
                          },
                        })
                      }
                      className="bg-white/70 dark:bg-gray-700/70 border-gray-300 dark:border-gray-600 h-12"
                    />

                    {errors.govtIdDocument && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.govtIdDocument}
                      </p>
                    )}
                  </div>

                  {/* Degree Certificate */}
                  <div className="space-y-3">
                    <Label className="font-medium text-gray-700 dark:text-gray-300">
                      Degree Certificate *
                    </Label>

                    <Input
                      type="file"
                      accept=".pdf,image/*"
                      onChange={(e) =>
                        setForm({
                          ...form,
                          documents: {
                            ...form.documents,
                            degreeCertificate: e.target.files[0],
                          },
                        })
                      }
                      className="bg-white/70 dark:bg-gray-700/70 border-gray-300 dark:border-gray-600 h-12"
                    />

                    {errors.degreeCertificate && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.degreeCertificate}
                      </p>
                    )}
                  </div>

                  {/* Registration Certificate */}
                  <div className="space-y-3">
                    <Label className="font-medium text-gray-700 dark:text-gray-300">
                      Registration Certificate *
                    </Label>

                    <Input
                      type="file"
                      accept=".pdf,image/*"
                      onChange={(e) =>
                        setForm({
                          ...form,
                          documents: {
                            ...form.documents,
                            registrationCertificate: e.target.files[0],
                          },
                        })
                      }
                      className="bg-white/70 dark:bg-gray-700/70 border-gray-300 dark:border-gray-600 h-12"
                    />

                    {errors.registrationCertificate && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.registrationCertificate}
                      </p>
                    )}
                  </div>

                  {/* Clinic Proof */}
                  <div className="space-y-3">
                    <Label className="font-medium text-gray-700 dark:text-gray-300">
                      Clinic / Hospital Proof (Optional)
                    </Label>

                    <Input
                      type="file"
                      accept=".pdf,image/*"
                      onChange={(e) =>
                        setForm({
                          ...form,
                          documents: {
                            ...form.documents,
                            clinicProof: e.target.files[0],
                          },
                        })
                      }
                      className="bg-white/70 dark:bg-gray-700/70 border-gray-300 dark:border-gray-600 h-12"
                    />

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Upload clinic ownership proof or hospital affiliation
                      document
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 4: Security */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#293379] dark:text-blue-300 border-b pb-2">
                  Security
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label
                      htmlFor="password"
                      className="font-medium text-gray-700 dark:text-gray-300"
                    >
                      Password *
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={form.password}
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                      minLength={6}
                      className="bg-white/70 dark:bg-gray-700/70 border-gray-300 dark:border-gray-600 h-12"
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.password}
                      </p>
                    )}
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Must be at least 6 characters long
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="confirmPassword"
                      className="font-medium text-gray-700 dark:text-gray-300"
                    >
                      Confirm Password *
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={form.confirmPassword}
                      onChange={(e) => (confirmPassword = e.target.value)}
                      className="bg-white/70 dark:bg-gray-700/70 border-gray-300 dark:border-gray-600 h-12"
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit and Links */}
              <div className="space-y-6 pt-4">
                <Button
                  type="submit"
                  className="w-full h-14 text-white text-lg font-semibold hover:bg-[#3a4a9c] transition-all duration-300"
                  style={{ backgroundColor: "#293379" }}
                >
                  Register as Doctor
                </Button>

                <div className="text-center space-y-3">
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    By registering, you agree to our Terms of Service and
                    Privacy Policy. Your registration will be reviewed by our
                    admin team before activation. This process typically takes
                    24-48 hours.
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                    >
                      Login here
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Animation Section */}
      <div className="hidden lg:flex lg:w-1/3 flex-col items-center justify-center p-8 bg-gradient-to-b from-[#293379] to-[#3a4a9c]">
        <div className="max-w-md space-y-8">
          <div className="text-center">
            <Lottie
              animationData={docRegister}
              loop={true}
              className="max-w-full h-64"
            />
          </div>

          <div className="text-white space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-3">
                Join Our Medical Network
              </h2>
              <p className="text-lg opacity-90">
                Connect with patients, manage appointments, and grow your
                practice
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <i className="fa-solid fa-calendar-check text-lg"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold">Appointment</h3>
                    <p className="text-sm opacity-80">Management</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <i className="fa-solid fa-chart-line text-lg"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold">Practice</h3>
                    <p className="text-sm opacity-80">Growth</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <i className="fa-solid fa-users text-lg"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold">Patient</h3>
                    <p className="text-sm opacity-80">Connection</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <i className="fa-solid fa-shield-heart text-lg"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold">Secure</h3>
                    <p className="text-sm opacity-80">Platform</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center pt-4">
              <p className="text-sm opacity-80">
                Join thousands of doctors already using our platform
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
