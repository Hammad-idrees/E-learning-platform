import React from "react";

const ProfileHeader = ({ profile }) => {
  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
      <div className="flex items-center gap-6">
        <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-600">
            {getInitials(profile.firstName, profile.lastName)}
          </span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            {profile.firstName} {profile.lastName}
          </h3>
          <p className="text-gray-600">@{profile.username}</p>
          <p className="text-sm text-gray-500">{profile.email}</p>
          {profile.isAdmin && (
            <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
              Administrator
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;