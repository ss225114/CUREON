import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white">
        {/* Header */}
        <div className="border-b border-gray-200 pb-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {request.doctorName}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {request.specialization} • ID: {request.doctorId}
              </p>
            </div>
            <Badge
              variant="outline"
              className={`
              ${request.status === "pending" ? "bg-amber-50 text-amber-700 border-amber-200" : ""}
              ${request.status === "verified" ? "bg-green-50 text-green-700 border-green-200" : ""}
              ${request.status === "rejected" ? "bg-red-50 text-red-700 border-red-200" : ""}
            `}
            >
              {request.status}
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-1">
            <InfoRow label="Email" value={request.email} />
            <InfoRow label="Phone" value={request.phone} />
            <InfoRow label="Experience" value={request.experience} />
            <InfoRow label="Hospital" value={request.hospital} />
            <InfoRow label="License Number" value={request.licenseNumber} />
            <InfoRow label="Consultation Fee" value={request.consultationFee} />

            <div className="border-b border-gray-100 py-3">
              <p className="text-xs text-gray-500 mb-1">Qualifications</p>
              <div className="flex flex-wrap gap-2">
                {request.qualifications.map((qual, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700"
                  >
                    {qual}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-b border-gray-100 py-3">
              <p className="text-xs text-gray-500 mb-1">Available Days</p>
              <div className="flex flex-wrap gap-2">
                {request.availableDays.map((day, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700"
                  >
                    {day}
                  </span>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-3">
            {request.documents.map((doc, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{doc.name}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {doc.verified ? "Verified" : "Pending verification"}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        {request.status === "pending" && (
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="flex gap-3">
              <Button
                onClick={() => onAccept(request.id)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                Accept
              </Button>
              <Button
                onClick={() => onReject(request.id)}
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
