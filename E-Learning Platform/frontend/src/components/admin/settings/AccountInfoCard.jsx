import React from "react";

const AccountInfoCard = ({ profile }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h4 className="text-lg font-semibold mb-4">Account Information</h4>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Account Created</label>
          <div className="px-3 py-2 border rounded-md bg-gray-50 text-sm">
            {formatDate(profile.createdAt)}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Updated</label>
          <div className="px-3 py-2 border rounded-md bg-gray-50 text-sm">
            {formatDate(profile.updatedAt)}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password Changed</label>
          <div className="px-3 py-2 border rounded-md bg-gray-50 text-sm">
            {formatDate(profile.passwordChangedAt)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfoCard;