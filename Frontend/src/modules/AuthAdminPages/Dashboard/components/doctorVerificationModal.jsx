import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

const DoctorVerificationModal = ({
  isOpen,
  onClose,
  request,
  onAccept,
  onReject,
}) => {
  if (!request) return null;

  const InfoRow = ({ label, value }) => (
    <div className="border-b border-gray-100 py-3">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-sm text-gray-900">{value || "N/A"}</p>
    </div>
  );

  const DocumentCard = ({ title, file }) => {
    if (!file) return null;

    const fileUrl = `http://localhost:5000/${file.replace(/\\/g, "/")}`;

    return (
      <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-blue-100">
              <FileText className="h-5 w-5 text-blue-700" />
            </div>

            <div>
              <p className="font-medium text-gray-900">
                {title}
              </p>

              <p className="text-xs text-gray-500 mt-1 break-all">
                {file.split("/").pop()}
              </p>
            </div>
          </div>

          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              View
            </Button>
          </a>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-white max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="border-b border-gray-200 pb-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {request.fullName}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                {Array.isArray(request.specialization)
                  ? request.specialization.join(", ")
                  : request.specialization}
                {" • "}
                ID: {request._id}
              </p>
            </div>

            <Badge
              variant="outline"
              className={`
                ${
                  request.isActive === false
                    ? "bg-amber-50 text-amber-700 border-amber-200"
                    : ""
                }

                ${
                  request.isActive === true
                    ? "bg-green-50 text-green-700 border-green-200"
                    : ""
                }

                ${
                  request.status === "rejected"
                    ? "bg-red-50 text-red-700 border-red-200"
                    : ""
                }
              `}
            >
              {request.isActive === false
                ? "Pending"
                : "Verified"}
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="details" className="w-full">
          
          {/* Tabs */}
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="details">
              Details
            </TabsTrigger>

            <TabsTrigger value="identification">
              Identification
            </TabsTrigger>

            <TabsTrigger value="documents">
              Documents
            </TabsTrigger>
          </TabsList>

          {/* DETAILS TAB */}
          <TabsContent value="details" className="space-y-1">
            <InfoRow label="Email" value={request.email} />

            <InfoRow label="Phone" value={request.phone} />

            <InfoRow
              label="Qualifications"
              value={request.degree}
            />

            <InfoRow
              label="State Medical Council"
              value={request.stateMedicalCouncil}
            />

            <InfoRow
              label="Specialization"
              value={
                Array.isArray(request.specialization)
                  ? request.specialization.join(", ")
                  : request.specialization
              }
            />
          </TabsContent>

          {/* IDENTIFICATION TAB */}
          <TabsContent
            value="identification"
            className="space-y-1"
          >
            <InfoRow
              label="License Number"
              value={request.doctorLicenseNo}
            />

            <InfoRow
              label="Government Id"
              value={
                request.govtId
                  ?.toString()
                  ?.substring(0, 4) +
                " " +
                request.govtId
                  ?.toString()
                  ?.substring(4, 8) +
                " " +
                request.govtId
                  ?.toString()
                  ?.substring(8, 12)
              }
            />

            <InfoRow
              label="Registration Number"
              value={request.doctorRegistrationNo}
            />
          </TabsContent>

          {/* DOCUMENTS TAB */}
          <TabsContent
            value="documents"
            className="space-y-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="h-5 w-5 text-green-600" />

              <h3 className="font-semibold text-gray-900">
                Uploaded Verification Documents
              </h3>
            </div>

            <DocumentCard
              title="Government ID Proof"
              file={request.documents?.govtIdDocument}
            />

            <DocumentCard
              title="Degree Certificate"
              file={request.documents?.degreeCertificate}
            />

            <DocumentCard
              title="Registration Certificate"
              file={request.documents?.registrationCertificate}
            />

            <DocumentCard
              title="Clinic / Hospital Proof"
              file={request.documents?.clinicProof}
            />

            {!request.documents && (
              <div className="text-sm text-gray-500">
                No documents uploaded
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        {request.isActive === false && (
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="flex gap-3">
              <Button
                onClick={() => onAccept(request._id)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                Accept
              </Button>

              <Button
                onClick={() => onReject(request._id)}
                variant="outline"
                className="flex-1 border-red-300 text-red-700 hover:bg-red-50"
              >
                Reject
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DoctorVerificationModal;