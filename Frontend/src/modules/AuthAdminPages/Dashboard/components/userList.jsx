import React from "react";
import { Card } from "@/components/ui/card";

const UserList = ({ users }) => {
  return (
    <div className="space-y-3">
      {users.map((user) => (
        <Card key={user.id} className="border border-gray-200 bg-white">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">{user.name}</h4>
                <div className="flex items-center gap-3 mt-1">
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <p className="text-sm text-gray-500">{user.role}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-500">
                  Last active: {user.lastActive}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {user.totalAppointments} appointments
                </p>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default UserList;
