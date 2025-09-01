import React from "react";

const ProfileHero = ({ user }) => {
  const initials = `${user?.firstName?.[0] || "U"}${
    user?.lastName?.[0] || ""
  }`.toUpperCase();
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#2563EB] to-[#0F2C59] p-6 sm:p-8 text-white shadow">
      <div className="flex items-center gap-4 sm:gap-6">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 flex items-center justify-center text-2xl sm:text-3xl font-bold ring-2 ring-white/30">
          {initials}
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Account Settings
          </h1>
          <p className="text-white/80 mt-1 text-sm sm:text-base">
            Manage your personal information and security preferences
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHero;
