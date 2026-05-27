import { useState, useEffect } from "react";
import { useProfile } from "../context/ProfileContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaSave, FaTimes, FaPlus, FaMinus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function CompleteProfileForm({ onClose, isOpen }) {
  const { profile, completeProfile, updateProfile } = useProfile();

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  /* -------------------- FORM STATE -------------------- */
  const [formData, setFormData] = useState({
    phone: "",
    dateOfBirth: "",
    gender: "",
    bloodGroup: "",
    height: "",
    weight: "",
    emergencyContact: {
      name: "",
      phone: "",
      relationship: "",
    },
    medicalConditions: [""],
    allergies: [""],
    medications: [{ name: "", dosage: "", frequency: "" }],
  });

  useEffect(() => {
    if (!profile) return;    

    setFormData({
      phone: profile.userData?.phone || "",
      dateOfBirth: profile.userData?.dateOfBirth ? profile.userData?.dateOfBirth.slice(0, 10) : "",
      gender: profile.userData?.gender || "",
      bloodGroup: profile.userData?.bloodGroup || "",
      height: profile.userData?.height || "",
      weight: profile.userData?.weight || "",
      emergencyContact: profile.userData?.emergencyContact || {
        name: "",
        phone: "",
        relationship: "",
      },
      medicalConditions:
        profile.useData?.medicalConditions?.length > 0
          ? profile.useData.medicalConditions
          : [""],
      allergies: profile.useData?.allergies?.length > 0 ? profile.useData.allergies : [""],
      medications:
        profile.userData?.medications?.length > 0
          ? profile.useData.medications
          : [{ name: "", dosage: "", frequency: "" }],
    });

    console.log("profile: ", profile);

    console.log("form: ", formData);
  }, [profile]);

  const handleChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleArrayChange = (field, index, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const handleMedicationChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      medications: prev.medications.map((med, i) =>
        i === index ? { ...med, [field]: value } : med,
      ),
    }));
  };

  const addArrayItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [
        ...prev[field],
        field === "medications" ? { name: "", dosage: "", frequency: "" } : "",
      ],
    }));
  };

  const removeArrayItem = (field, index) => {
    if (formData[field].length <= 1) return;
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const validateStep = (currentStep) => {
    if (currentStep === 1) {
      if (!formData.phone.trim()) return alert("Phone is required");
      if (!formData.dateOfBirth) return alert("Date of birth is required");
      if (!formData.gender) return alert("Gender is required");
      if (!formData.bloodGroup) return alert("Blood group is required");
    }
    return true;
  };

  const nextStep = (e) => {
    e.preventDefault();
    if (validateStep(step) && step < totalSteps) {
      setStep(step + 1);
    }
  };

  const prevStep = (e) => {
    e.preventDefault();
    if (step > 1) setStep(step - 1);
  };

  const handleFinalSubmit = async () => {
    setLoading(true);

    const payload = {
      phone: formData.phone.trim(),
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      bloodGroup: formData.bloodGroup,
      height: formData.height || undefined,
      weight: formData.weight || undefined,
      emergencyContact: {
        name: formData.emergencyContact.name.trim(),
        phone: formData.emergencyContact.phone.trim(),
        relationship: formData.emergencyContact.relationship.trim(),
      },
      medicalConditions: formData.medicalConditions.filter(Boolean),
      allergies: formData.allergies.filter(Boolean),
      medications: formData.medications.filter(
        (m) => m.name && m.dosage && m.frequency,
      ),
    };

    try {
      const res = profile
        ? await updateProfile(payload)
        : await completeProfile(payload);

      if (res?.success) onClose();
    } catch (err) {
      console.error("Profile save failed:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-2xl">
          <CardHeader className="sticky top-0 bg-white dark:bg-gray-800 z-10 border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-[#293379] dark:text-white">
                Complete Your Profile
              </CardTitle>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                <FaTimes className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {/* Remove the form element to prevent auto-submission */}
            <div>
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      Personal Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            handleChange("phone", e.target.value)
                          }
                          placeholder={"+1 (555) 123-4567"}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) =>
                            handleChange("dateOfBirth", e.target.value)
                          }
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender *</Label>
                        <select
                          id="gender"
                          value={formData.gender}
                          onChange={(e) =>
                            handleChange("gender", e.target.value)
                          }
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                          required
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                          <option value="Prefer not to say">
                            Prefer not to say
                          </option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bloodGroup">Blood Group *</Label>
                        <select
                          id="bloodGroup"
                          value={formData.bloodGroup}
                          onChange={(e) =>
                            handleChange("bloodGroup", e.target.value)
                          }
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                          required
                        >
                          <option value="">Select Blood Group</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="height">Height (cm)</Label>
                        <Input
                          id="height"
                          type="number"
                          value={formData.height}
                          onChange={(e) =>
                            handleChange("height", e.target.value)
                          }
                          placeholder="175"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="weight">Weight (kg)</Label>
                        <Input
                          id="weight"
                          type="number"
                          value={formData.weight}
                          onChange={(e) =>
                            handleChange("weight", e.target.value)
                          }
                          placeholder="70"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      Emergency Contact & Medical History
                    </h3>

                    {/* Emergency Contact */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-3">
                        Emergency Contact
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="emergencyName">Name</Label>
                          <Input
                            id="emergencyName"
                            value={formData.emergencyContact.name}
                            onChange={(e) =>
                              handleChange(
                                "emergencyContact.name",
                                e.target.value,
                              )
                            }
                            placeholder="Jane Smith"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="emergencyPhone">Phone</Label>
                          <Input
                            id="emergencyPhone"
                            type="tel"
                            value={formData.emergencyContact.phone}
                            onChange={(e) =>
                              handleChange(
                                "emergencyContact.phone",
                                e.target.value,
                              )
                            }
                            placeholder="+1 (555) 987-6543"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="emergencyRelationship">
                            Relationship
                          </Label>
                          <Input
                            id="emergencyRelationship"
                            value={formData.emergencyContact.relationship}
                            onChange={(e) =>
                              handleChange(
                                "emergencyContact.relationship",
                                e.target.value,
                              )
                            }
                            placeholder="Spouse, Parent, etc."
                          />
                        </div>
                      </div>
                    </div>

                    {/* Medical Conditions */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          Medical Conditions
                        </h4>
                        <Button
                          type="button"
                          onClick={() => addArrayItem("medicalConditions")}
                          className="bg-green-500 hover:bg-green-600 text-white"
                          size="sm"
                        >
                          <FaPlus className="mr-2" /> Add Condition
                        </Button>
                      </div>
                      <div className="space-y-3">
                        {formData.medicalConditions.map((condition, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Input
                              value={condition}
                              onChange={(e) =>
                                handleArrayChange(
                                  "medicalConditions",
                                  index,
                                  e.target.value,
                                )
                              }
                              placeholder="e.g., Hypertension, Diabetes, Asthma"
                              className="flex-1"
                            />
                            {formData.medicalConditions.length > 1 && (
                              <Button
                                type="button"
                                onClick={() =>
                                  removeArrayItem("medicalConditions", index)
                                }
                                className="bg-red-500 hover:bg-red-600 text-white"
                                size="sm"
                              >
                                <FaMinus />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Allergies */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          Allergies
                        </h4>
                        <Button
                          type="button"
                          onClick={() => addArrayItem("allergies")}
                          className="bg-green-500 hover:bg-green-600 text-white"
                          size="sm"
                        >
                          <FaPlus className="mr-2" /> Add Allergy
                        </Button>
                      </div>
                      <div className="space-y-3">
                        {formData.allergies.map((allergy, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Input
                              value={allergy}
                              onChange={(e) =>
                                handleArrayChange(
                                  "allergies",
                                  index,
                                  e.target.value,
                                )
                              }
                              placeholder="e.g., Penicillin, Peanuts, Dust"
                              className="flex-1"
                            />
                            {formData.allergies.length > 1 && (
                              <Button
                                type="button"
                                onClick={() =>
                                  removeArrayItem("allergies", index)
                                }
                                className="bg-red-500 hover:bg-red-600 text-white"
                                size="sm"
                              >
                                <FaMinus />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      Current Medications
                    </h3>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <p className="text-gray-600 dark:text-gray-400">
                          Add any medications you're currently taking
                        </p>
                        <Button
                          type="button"
                          onClick={() => addArrayItem("medications")}
                          className="bg-green-500 hover:bg-green-600 text-white"
                        >
                          <FaPlus className="mr-2" /> Add Medication
                        </Button>
                      </div>

                      {formData.medications.map((medication, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg space-y-4"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              Medication {index + 1}
                            </h4>
                            {formData.medications.length > 1 && (
                              <Button
                                type="button"
                                onClick={() =>
                                  removeArrayItem("medications", index)
                                }
                                className="bg-red-500 hover:bg-red-600 text-white"
                                size="sm"
                              >
                                <FaMinus /> Remove
                              </Button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label>Medication Name</Label>
                              <Input
                                value={medication.name}
                                onChange={(e) =>
                                  handleMedicationChange(
                                    index,
                                    "name",
                                    e.target.value,
                                  )
                                }
                                placeholder="e.g., Lisinopril"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Dosage</Label>
                              <Input
                                value={medication.dosage}
                                onChange={(e) =>
                                  handleMedicationChange(
                                    index,
                                    "dosage",
                                    e.target.value,
                                  )
                                }
                                placeholder="e.g., 10mg"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Frequency</Label>
                              <Input
                                value={medication.frequency}
                                onChange={(e) =>
                                  handleMedicationChange(
                                    index,
                                    "frequency",
                                    e.target.value,
                                  )
                                }
                                placeholder="e.g., Once daily"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Final Note */}
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-700">
                      <p className="text-amber-800 dark:text-amber-300 text-sm">
                        <strong>Note:</strong> This information helps healthcare
                        providers give you better care. You can update it
                        anytime in your profile settings.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div>
                  {step > 1 && (
                    <Button
                      type="button"
                      onClick={prevStep}
                      className="bg-gray-500 hover:bg-gray-600 text-white"
                    >
                      ← Previous
                    </Button>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    onClick={onClose}
                    variant="outline"
                    className="border-gray-300 dark:border-gray-600"
                  >
                    Cancel
                  </Button>

                  {step < totalSteps ? (
                    <Button
                      type="button" // Important: type="button" to prevent form submission
                      onClick={nextStep}
                      className="bg-[#293379] dark:bg-blue-700 hover:bg-[#3a4a9c] dark:hover:bg-blue-600"
                    >
                      Next Step →
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={handleFinalSubmit}
                      disabled={loading}
                      className="bg-[#016b61] hover:bg-[#015951] text-white"
                    >
                      {loading ? (
                        <>
                          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <FaSave className="mr-2" /> Complete Profile
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </div>
            {/* Removed form closing tag */}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
