import React, { useEffect, useState } from "react";
import { getMyProfile } from "../../services/user";
import ProfileHeader from "../../components/admin/settings/ProfileHeader";
import PersonalInfoCard from "../../components/admin/settings/PersonalInfoCard";
import ContactInfoCard from "../../components/admin/settings/ContactInfoCard";
import AccountInfoCard from "../../components/admin/settings/AccountInfoCard";
import {
  Shield,
  RefreshCw,
  AlertCircle,
  Settings as SettingsIcon,
  User,
  Key,
} from "lucide-react";

const Settings = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchProfile = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);
    try {
      const data = await getMyProfile();
      setProfile(data.data);
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Failed to fetch profile data. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col items-center justify-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <div className="text-lg text-gray-600">Loading your profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <div className="text-red-700 text-lg font-medium mb-4">{error}</div>
            <button
              onClick={() => fetchProfile()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center mx-auto"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 max-w-2xl mx-auto">
            <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <p className="text-yellow-700 text-lg font-medium">
              No profile data available
            </p>
            <p className="text-yellow-600 mt-2">
              Please contact system administrator if this issue persists
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Enhanced Header Section */}
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-3xl shadow-2xl p-6 sm:p-8 mb-8 text-white">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30">
                <SettingsIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  Account Settings
                </h1>
                <p className="text-blue-100 text-lg">
                  Manage your admin profile and account preferences
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                <User className="w-4 h-4 text-blue-100" />
                <span className="text-blue-100 text-sm font-medium">
                  {profile?.firstName} {profile?.lastName}
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                <Key className="w-4 h-4 text-blue-100" />
                <span className="text-blue-100 text-sm font-medium">
                  Admin Role
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 mb-8 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-blue-800 mb-3 text-lg">
                Security Information
              </h3>
              <p className="text-blue-700 text-sm leading-relaxed">
                Your email and password are managed by the system administrator.
                For security reasons, these credentials cannot be modified from
                this interface. Please contact your system administrator if you
                need to update your login credentials.
              </p>
            </div>
          </div>
        </div>

        <ProfileHeader profile={profile} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <PersonalInfoCard profile={profile} />
          <ContactInfoCard profile={profile} />
          <div className="lg:col-span-2">
            <AccountInfoCard profile={profile} />
          </div>
        </div>

        {/* Enhanced Refresh Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={() => fetchProfile(true)}
            disabled={refreshing}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw
              className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
            />
            {refreshing ? "Refreshing..." : "Refresh Data"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
