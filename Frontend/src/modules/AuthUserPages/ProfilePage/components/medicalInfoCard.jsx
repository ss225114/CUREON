import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FaPills, FaAllergies, FaHeartbeat } from "react-icons/fa";

export default function MedicalInfoCard({ profile }) {
  if (!profile) return null;

  return (
    <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-[#293379] dark:text-white flex items-center gap-2">
          <FaHeartbeat /> Medical Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Medical Conditions */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
            Medical Conditions
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile.medicalConditions?.length > 0 ? (
              profile.medicalConditions.map((condition, index) => (
                <Badge
                  key={index}
                  className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-4 py-2"
                >
                  {condition}
                </Badge>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                No medical conditions recorded
              </p>
            )}
          </div>
        </div>

        {/* Allergies */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
            <FaAllergies /> Allergies
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile.allergies?.length > 0 ? (
              profile.allergies.map((allergy, index) => (
                <Badge
                  key={index}
                  className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-4 py-2"
                >
                  {allergy}
                </Badge>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                No allergies recorded
              </p>
            )}
          </div>
        </div>

        {/* Medications */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
            <FaPills /> Current Medications
          </h3>
          <div className="space-y-3">
            {profile.medications?.length > 0 ? (
              profile.medications.map((med, index) => (
                <div
                  key={index}
                  className="p-4 bg-white/30 dark:bg-gray-700/30 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {med.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Dosage: {med.dosage} • Frequency: {med.frequency}
                      </p>
                    </div>
                    <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                      Active
                    </Badge>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                No medications recorded
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
