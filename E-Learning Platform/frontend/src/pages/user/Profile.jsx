import React from "react";
import StudentHeader from "../../components/user/header-footer/StudentHeader";
import StudentFooter from "../../components/user/header-footer/StudentFooter";
import ProfileHero from "../../components/user/user-profile/ProfileHero";
import ProfileDetailsForm from "../../components/user/user-profile/ProfileDetailsForm";
import ProfileSecurity from "../../components/user/user-profile/ProfileSecurity";
import { useAuth } from "../../contexts/AuthContext";

const Profile = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-950">
      <StudentHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <ProfileHero user={user} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ProfileDetailsForm />
          </div>
          <div className="lg:col-span-1">
            <ProfileSecurity />
          </div>
        </div>
      </main>
      <StudentFooter />
    </div>
  );
};

export default Profile;
