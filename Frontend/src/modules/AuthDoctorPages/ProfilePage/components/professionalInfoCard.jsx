import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaGraduationCap, FaHospital, FaCertificate, FaLanguage, FaStethoscope } from "react-icons/fa";
import { useProfile } from "../context/profileContext";

export default function ProfessionalInfoCard() {
  const { doctorProfile } = useProfile();

  return (
    <Card className="border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-[#293379] dark:text-white flex items-center gap-2">
          <FaStethoscope className="h-5 w-5" />
          Professional Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Specialization */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Specialization</h3>
          <div className="flex flex-wrap gap-2">
            {doctorProfile?.professionalInfo?.specialization?.map((spec, index) => (
              <span
                key={index}
                className="px-3 py-2 bg-gradient-to-r from-[#293379]/10 to-[#016b61]/10 text-[#293379] dark:text-blue-400 rounded-lg font-medium border border-[#293379]/20 dark:border-blue-600/20"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <FaGraduationCap className="h-4 w-4" />
            Education
          </h3>
          <div className="space-y-3">
            {doctorProfile?.education?.map((edu) => (
              <div
                key={edu.id}
                className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{edu.degree}</h4>
                    <p className="text-gray-600 dark:text-gray-400">{edu.institution}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">{edu.description}</p>
                  </div>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded">
                    {edu.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <FaHospital className="h-4 w-4" />
            Experience
          </h3>
          <div className="space-y-3">
            {doctorProfile?.experience?.map((exp) => (
              <div
                key={exp.id}
                className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{exp.position}</h4>
                    <p className="text-gray-600 dark:text-gray-400">{exp.hospital}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">{exp.description}</p>
                  </div>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm rounded">
                    {exp.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <FaCertificate className="h-4 w-4" />
            Certifications
          </h3>
          <div className="space-y-3">
            {doctorProfile?.certifications?.map((cert) => (
              <div
                key={cert.id}
                className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{cert.name}</h4>
                    <p className="text-gray-600 dark:text-gray-400">{cert.issuer}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 dark:text-gray-500">{cert.year}</div>
                    <div className="text-xs text-green-600 dark:text-green-400">Valid until {cert.validUntil}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <FaLanguage className="h-4 w-4" />
            Languages
          </h3>
          <div className="flex flex-wrap gap-2">
            {doctorProfile?.professionalInfo?.languages?.map((lang, index) => (
              <span
                key={index}
                className="px-3 py-2 bg-gradient-to-r from-[#016b61]/10 to-[#018377]/10 text-[#016b61] dark:text-green-400 rounded-lg font-medium border border-[#016b61]/20 dark:border-green-600/20"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}