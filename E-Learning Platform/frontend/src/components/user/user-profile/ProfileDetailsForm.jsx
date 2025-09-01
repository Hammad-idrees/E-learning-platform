import React, { useEffect, useState } from "react";
import { getMyProfile, updateProfile } from "../../../services/user";
import toast from "react-hot-toast";

const ProfileDetailsForm = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    phone: "",
    country: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await getMyProfile();
        const data = res?.data || res;
        setForm({
          firstName: data?.firstName || "",
          lastName: data?.lastName || "",
          email: data?.email || "",
          username: data?.username || "",
          phone: data?.phone || "",
          country: data?.country || "",
        });
      } catch (e) {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { firstName, lastName, phone, country } = form;
      const res = await updateProfile({ firstName, lastName, phone, country });
      const updated = res?.data || res;
      setForm((prev) => ({ ...prev, ...updated }));
      toast.success("Profile updated");
    } catch (e) {
      toast.error(e?.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
        <div className="h-6 w-32 bg-gray-200 dark:bg-gray-800 rounded mb-6 animate-pulse" />
        <div className="space-y-3">
          <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
          <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
          <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
      <h2 className="text-xl font-semibold text-[#0F2C59] dark:text-blue-300 mb-4">
        Personal Information
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <div>
          <label className="block text-sm text-[#64748B] dark:text-gray-400 mb-1">
            First name
          </label>
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="John"
          />
        </div>
        <div>
          <label className="block text-sm text-[#64748B] dark:text-gray-400 mb-1">
            Last name
          </label>
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Doe"
          />
        </div>

        <div>
          <label className="block text-sm text-[#64748B] dark:text-gray-400 mb-1">
            Email
          </label>
          <input
            value={form.email}
            disabled
            className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm text-[#64748B] dark:text-gray-400 mb-1">
            Username
          </label>
          <input
            value={form.username}
            disabled
            className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm text-[#64748B] dark:text-gray-400 mb-1">
            Phone
          </label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="+1 555 123 4567"
          />
        </div>

        <div>
          <label className="block text-sm text-[#64748B] dark:text-gray-400 mb-1">
            Country
          </label>
          <input
            name="country"
            value={form.country}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="United States"
          />
        </div>

        <div className="sm:col-span-2 flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2563EB] text-white font-semibold hover:bg-[#1D4ED8] disabled:opacity-60 shadow-sm"
          >
            {saving ? (
              <svg
                className="w-5 h-5 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v2m6 6h2M6 12H4m1.8 6.2l1.4-1.4M18.2 7.8l1.4-1.4"
                />
              </svg>
            ) : null}
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileDetailsForm;
