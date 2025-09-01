import React from "react";

const ContactInfoCard = ({ profile }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
          <div className="px-3 py-2 border rounded-md bg-gray-50">
            {profile.country}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <div className="px-3 py-2 border rounded-md bg-gray-50">
            {profile.phone || "Not provided"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoCard;