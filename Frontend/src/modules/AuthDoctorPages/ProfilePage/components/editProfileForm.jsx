import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { FaTimes, FaSave, FaPlus, FaTrash } from "react-icons/fa";
import { useProfile } from "../context/profileContext";

export default function EditProfileForm() {
  const { doctorProfile, updateProfile, isEditing, setIsEditing } =
    useProfile();

  // Initialize form data with doctorProfile
  const [formData, setFormData] = useState(() => ({
    personalInfo: {
      dateOfBirth: doctorProfile?.personalInfo?.dateOfBirth || "",
      address: doctorProfile?.personalInfo?.address || "",
    },
    professionalInfo: {
      hospital: doctorProfile?.professionalInfo?.hospital || "",
      consultationFee: doctorProfile?.professionalInfo?.consultationFee || "",
      languages: [...(doctorProfile?.professionalInfo?.languages || [])],
      bio: doctorProfile?.professionalInfo?.bio || "",
    },
    education: [...(doctorProfile?.education || [])],
    experience: [...(doctorProfile?.experience || [])],
    certifications: [...(doctorProfile?.certifications || [])],
    availability: {
      workingHours:
        doctorProfile?.availability?.workingHours || "9:00 AM - 5:00 PM",
      emergencyContact: doctorProfile?.availability?.emergencyContact || "",
      workingDays: [
        { day: "Monday", hours: "9:00 AM - 5:00 PM", enabled: true },
        { day: "Tuesday", hours: "9:00 AM - 5:00 PM", enabled: true },
        { day: "Wednesday", hours: "9:00 AM - 5:00 PM", enabled: true },
        { day: "Thursday", hours: "9:00 AM - 5:00 PM", enabled: true },
        { day: "Friday", hours: "9:00 AM - 5:00 PM", enabled: true },
        { day: "Saturday", hours: "9:00 AM - 1:00 PM", enabled: false },
        { day: "Sunday", hours: "", enabled: false },
      ],
    },
  }));

  // Handle input changes
  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  // Handle nested object changes
  const handleNestedChange = (section, subSection, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subSection]: {
          ...prev[section][subSection],
          [field]: value,
        },
      },
    }));
  };

  // Handle array changes
  const handleArrayChange = (section, index, field, value) => {
    setFormData((prev) => {
      const newArray = [...prev[section]];
      newArray[index] = { ...newArray[index], [field]: value };
      return {
        ...prev,
        [section]: newArray,
      };
    });
  };

  // Add new item to array
  const addItem = (section, template) => {
    setFormData((prev) => ({
      ...prev,
      [section]: [...prev[section], { ...template }],
    }));
  };

  // Remove item from array
  const removeItem = (section, index) => {
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  // Handle working day changes
  const handleWorkingDayChange = (index, field, value) => {
    setFormData((prev) => {
      const newDays = [...prev.availability.workingDays];
      if (field === "enabled") {
        newDays[index] = {
          ...newDays[index],
          enabled: value,
          hours: value ? newDays[index].hours : "",
        };
      } else {
        newDays[index] = { ...newDays[index], [field]: value };
      }
      return {
        ...prev,
        availability: {
          ...prev.availability,
          workingDays: newDays,
        },
      };
    });
  };

  // Handle languages (comma separated)
  const handleLanguagesChange = (value) => {
    const languages = value
      .split(",")
      .map((lang) => lang.trim())
      .filter((lang) => lang);
    handleChange("professionalInfo", "languages", languages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Filter enabled working days
    const enabledWorkingDays = formData.availability.workingDays
      .filter((day) => day.enabled)
      .map((day) => day.day);

    const updatedProfile = {
      personalInfo: {
        ...doctorProfile.personalInfo,
        ...formData.personalInfo,
      },
      professionalInfo: {
        ...doctorProfile.professionalInfo,
        ...formData.professionalInfo,
      },
      education: formData.education,
      experience: formData.experience,
      certifications: formData.certifications,
      availability: {
        ...doctorProfile.availability,
        workingHours: formData.availability.workingHours,
        emergencyContact: formData.availability.emergencyContact,
        workingDays: enabledWorkingDays,
      },
    };

    updateProfile(updatedProfile);
    setIsEditing(false);
  };

  if (!doctorProfile) return null;

  return (
    <Dialog open={isEditing} onOpenChange={setIsEditing}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 border-0 shadow-2xl [&>button]:hidden">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-[#293379] dark:text-white">
              Edit Profile
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(false)}
              className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <FaTimes className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#293379] dark:text-white border-b pb-2">
              Personal Information
            </h3>

            {/* Read-only fields grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <Label className="text-sm text-gray-600 dark:text-gray-400">
                  Full Name
                </Label>
                <div className="text-gray-900 dark:text-white font-medium mt-1">
                  {doctorProfile?.personalInfo?.fullName}
                </div>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <Label className="text-sm text-gray-600 dark:text-gray-400">
                  Email
                </Label>
                <div className="text-gray-900 dark:text-white font-medium mt-1">
                  {doctorProfile?.personalInfo?.email}
                </div>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <Label className="text-sm text-gray-600 dark:text-gray-400">
                  Phone Number
                </Label>
                <div className="text-gray-900 dark:text-white font-medium mt-1">
                  {doctorProfile?.personalInfo?.phone}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.personalInfo.dateOfBirth}
                  onChange={(e) =>
                    handleChange("personalInfo", "dateOfBirth", e.target.value)
                  }
                  className="mt-1"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.personalInfo.address}
                  onChange={(e) =>
                    handleChange("personalInfo", "address", e.target.value)
                  }
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#293379] dark:text-white border-b pb-2">
              Professional Information
            </h3>

            {/* Read-only professional fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <Label className="text-sm text-gray-600 dark:text-gray-400">
                  Degree
                </Label>
                <div className="text-gray-900 dark:text-white font-medium mt-1">
                  {doctorProfile?.professionalInfo?.degree}
                </div>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <Label className="text-sm text-gray-600 dark:text-gray-400">
                  License Number
                </Label>
                <div className="text-gray-900 dark:text-white font-medium mt-1">
                  {doctorProfile?.professionalInfo?.doctorLicenseNo}
                </div>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <Label className="text-sm text-gray-600 dark:text-gray-400">
                  Specializations
                </Label>
                <div className="text-gray-900 dark:text-white font-medium mt-1">
                  {doctorProfile?.professionalInfo?.specialization?.join(", ")}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="hospital">Hospital/Clinic</Label>
                <Input
                  id="hospital"
                  value={formData.professionalInfo.hospital}
                  onChange={(e) =>
                    handleChange("professionalInfo", "hospital", e.target.value)
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="consultationFee">Consultation Fee</Label>
                <Input
                  id="consultationFee"
                  value={formData.professionalInfo.consultationFee}
                  onChange={(e) =>
                    handleChange(
                      "professionalInfo",
                      "consultationFee",
                      e.target.value,
                    )
                  }
                  className="mt-1"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="languages">Languages (comma separated)</Label>
                <Input
                  id="languages"
                  value={formData.professionalInfo.languages?.join(", ")}
                  onChange={(e) => handleLanguagesChange(e.target.value)}
                  placeholder="English, Spanish, French"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bio">Professional Bio</Label>
              <Textarea
                id="bio"
                value={formData.professionalInfo.bio}
                onChange={(e) =>
                  handleChange("professionalInfo", "bio", e.target.value)
                }
                className="mt-1 h-32"
                placeholder="Describe your professional background, expertise, and approach..."
              />
            </div>
          </div>

          {/* Education */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#293379] dark:text-white border-b pb-2">
                Education
              </h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  addItem("education", {
                    id: `edu_${Date.now()}`,
                    degree: "",
                    institution: "",
                    year: "",
                    description: "",
                  })
                }
                className="flex items-center gap-2"
              >
                <FaPlus className="h-3 w-3" />
                Add Education
              </Button>
            </div>

            {formData.education.map((edu, index) => (
              <div
                key={edu.id}
                className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg space-y-3"
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-[#293379] dark:text-blue-400">
                    Education #{index + 1}
                  </h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem("education", index)}
                    className="text-red-600 hover:text-red-800 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <FaTrash className="h-3 w-3" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor={`edu-degree-${index}`}>Degree</Label>
                    <Input
                      id={`edu-degree-${index}`}
                      value={edu.degree}
                      onChange={(e) =>
                        handleArrayChange(
                          "education",
                          index,
                          "degree",
                          e.target.value,
                        )
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`edu-institution-${index}`}>
                      Institution
                    </Label>
                    <Input
                      id={`edu-institution-${index}`}
                      value={edu.institution}
                      onChange={(e) =>
                        handleArrayChange(
                          "education",
                          index,
                          "institution",
                          e.target.value,
                        )
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`edu-year-${index}`}>Year</Label>
                    <Input
                      id={`edu-year-${index}`}
                      value={edu.year}
                      onChange={(e) =>
                        handleArrayChange(
                          "education",
                          index,
                          "year",
                          e.target.value,
                        )
                      }
                      placeholder="e.g., 2015-2019"
                      className="mt-1"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor={`edu-desc-${index}`}>Description</Label>
                    <Input
                      id={`edu-desc-${index}`}
                      value={edu.description}
                      onChange={(e) =>
                        handleArrayChange(
                          "education",
                          index,
                          "description",
                          e.target.value,
                        )
                      }
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#293379] dark:text-white border-b pb-2">
                Experience
              </h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  addItem("experience", {
                    id: `exp_${Date.now()}`,
                    position: "",
                    hospital: "",
                    duration: "",
                    description: "",
                  })
                }
                className="flex items-center gap-2"
              >
                <FaPlus className="h-3 w-3" />
                Add Experience
              </Button>
            </div>

            {formData.experience.map((exp, index) => (
              <div
                key={exp.id}
                className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg space-y-3"
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-[#293379] dark:text-blue-400">
                    Experience #{index + 1}
                  </h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem("experience", index)}
                    className="text-red-600 hover:text-red-800 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <FaTrash className="h-3 w-3" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor={`exp-position-${index}`}>Position</Label>
                    <Input
                      id={`exp-position-${index}`}
                      value={exp.position}
                      onChange={(e) =>
                        handleArrayChange(
                          "experience",
                          index,
                          "position",
                          e.target.value,
                        )
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`exp-hospital-${index}`}>
                      Hospital/Clinic
                    </Label>
                    <Input
                      id={`exp-hospital-${index}`}
                      value={exp.hospital}
                      onChange={(e) =>
                        handleArrayChange(
                          "experience",
                          index,
                          "hospital",
                          e.target.value,
                        )
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`exp-duration-${index}`}>Duration</Label>
                    <Input
                      id={`exp-duration-${index}`}
                      value={exp.duration}
                      onChange={(e) =>
                        handleArrayChange(
                          "experience",
                          index,
                          "duration",
                          e.target.value,
                        )
                      }
                      placeholder="e.g., 2019-Present"
                      className="mt-1"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor={`exp-desc-${index}`}>Description</Label>
                    <Input
                      id={`exp-desc-${index}`}
                      value={exp.description}
                      onChange={(e) =>
                        handleArrayChange(
                          "experience",
                          index,
                          "description",
                          e.target.value,
                        )
                      }
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#293379] dark:text-white border-b pb-2">
                Certifications
              </h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  addItem("certifications", {
                    id: `cert_${Date.now()}`,
                    name: "",
                    issuer: "",
                    year: "",
                    validUntil: "",
                  })
                }
                className="flex items-center gap-2"
              >
                <FaPlus className="h-3 w-3" />
                Add Certification
              </Button>
            </div>

            {formData.certifications.map((cert, index) => (
              <div
                key={cert.id}
                className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg space-y-3"
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-[#293379] dark:text-blue-400">
                    Certification #{index + 1}
                  </h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem("certifications", index)}
                    className="text-red-600 hover:text-red-800 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <FaTrash className="h-3 w-3" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor={`cert-name-${index}`}>
                      Certification Name
                    </Label>
                    <Input
                      id={`cert-name-${index}`}
                      value={cert.name}
                      onChange={(e) =>
                        handleArrayChange(
                          "certifications",
                          index,
                          "name",
                          e.target.value,
                        )
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`cert-issuer-${index}`}>
                      Issuing Organization
                    </Label>
                    <Input
                      id={`cert-issuer-${index}`}
                      value={cert.issuer}
                      onChange={(e) =>
                        handleArrayChange(
                          "certifications",
                          index,
                          "issuer",
                          e.target.value,
                        )
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`cert-year-${index}`}>Year Obtained</Label>
                    <Input
                      id={`cert-year-${index}`}
                      type="number"
                      value={cert.year}
                      onChange={(e) =>
                        handleArrayChange(
                          "certifications",
                          index,
                          "year",
                          e.target.value,
                        )
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`cert-validUntil-${index}`}>
                      Valid Until
                    </Label>
                    <Input
                      id={`cert-validUntil-${index}`}
                      type="number"
                      value={cert.validUntil}
                      onChange={(e) =>
                        handleArrayChange(
                          "certifications",
                          index,
                          "validUntil",
                          e.target.value,
                        )
                      }
                      placeholder="e.g., 2026"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Availability */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#293379] dark:text-white border-b pb-2">
              Availability Settings
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="emergencyContact">
                    Emergency Contact Number
                  </Label>
                  <Input
                    id="emergencyContact"
                    value={formData.availability.emergencyContact}
                    onChange={(e) =>
                      handleNestedChange(
                        "availability",
                        "",
                        "emergencyContact",
                        e.target.value,
                      )
                    }
                    placeholder="+1 (555) 123-4567"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="defaultWorkingHours">
                    Default Working Hours
                  </Label>
                  <Input
                    id="defaultWorkingHours"
                    value={formData.availability.workingHours}
                    onChange={(e) =>
                      handleNestedChange(
                        "availability",
                        "",
                        "workingHours",
                        e.target.value,
                      )
                    }
                    placeholder="9:00 AM - 5:00 PM"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Working Days Schedule</Label>
                {formData.availability.workingDays.map((day, index) => (
                  <div
                    key={day.day}
                    className="flex items-center gap-4 p-3 border border-gray-200 dark:border-gray-800 rounded-lg"
                  >
                    <div className="flex items-center gap-2 w-32">
                      <input
                        type="checkbox"
                        id={`day-${index}`}
                        checked={day.enabled}
                        onChange={(e) =>
                          handleWorkingDayChange(
                            index,
                            "enabled",
                            e.target.checked,
                          )
                        }
                        disabled={day.day === "Sunday"}
                        className="h-4 w-4 text-[#293379] dark:text-blue-600 rounded focus:ring-[#293379] dark:focus:ring-blue-600"
                      />
                      <Label
                        htmlFor={`day-${index}`}
                        className={`font-medium ${day.enabled ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-500"}`}
                      >
                        {day.day}
                      </Label>
                    </div>

                    {day.enabled ? (
                      <>
                        <Input
                          value={day.hours}
                          onChange={(e) =>
                            handleWorkingDayChange(
                              index,
                              "hours",
                              e.target.value,
                            )
                          }
                          placeholder={
                            day.day === "Saturday"
                              ? "e.g., 9:00 AM - 1:00 PM"
                              : "e.g., 9:00 AM - 5:00 PM"
                          }
                          className="flex-1"
                        />
                        {day.day === "Saturday" && (
                          <span className="text-xs text-amber-600 dark:text-amber-400 whitespace-nowrap">
                            Weekend hours
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400 italic">
                        {day.day === "Sunday" ? "Clinic closed" : "Not working"}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  <strong>Note:</strong> You can set different working hours for
                  each day. Sunday is always off.
                </p>
              </div>
            </div>
          </div>

          <DialogFooter className="pt-6 border-t border-gray-200 dark:border-gray-800">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditing(false)}
              className="border-gray-300 dark:border-gray-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-[#293379] to-[#016b61] hover:from-[#3a4a9c] hover:to-[#018377] text-white"
            >
              <FaSave className="mr-2" />
              Save All Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}