import React from "react";

const PersonalInfoCard = ({ profile }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h4 className="text-lg font-semibold mb-4">Personal Information</h4>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <div className="px-3 py-2 border rounded-md bg-gray-50">
            {profile.firstName}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <div className="px-3 py-2 border rounded-md bg-gray-50">
            {profile.lastName}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <div className="px-3 py-2 border rounded-md bg-gray-50">
            {profile.username}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <div className="px-3 py-2 border rounded-md bg-gray-50">
            {profile.email}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoCard;