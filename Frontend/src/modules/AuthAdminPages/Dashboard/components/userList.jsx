import React from "react";
import { Card } from "@/components/ui/card";

const UserList = ({ users = [] }) => {
  return (
    <div className="space-y-3">
      {users.length > 0 ? (
        users.map((user) => (
          <Card
            key={user._id || user.id}
            className="
              border border-blue-200/50 dark:border-gray-700/50
              bg-white dark:bg-gray-900
              transition-colors
            "
          >
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {user.fullName || "Unnamed User"}
                  </h4>

                  <div className="flex items-center gap-3 mt-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {user.email || "No email"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))
      ) : (
        <Card className="border border-blue-200/50 dark:border-gray-700/50 bg-white dark:bg-gray-900">
          <div className="p-8 text-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              No Users Found
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              There are currently no registered users.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default UserList;
