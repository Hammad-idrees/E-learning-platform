import React, { useState } from "react";
import { changePassword } from "../../../services/user";
import toast from "react-hot-toast";

const ProfileSecurity = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.newPassword || form.newPassword.length < 8) {
      toast.error("New password must be at least 8 characters");
      return;
    }
    if (!/\d/.test(form.newPassword)) {
      toast.error("New password must include at least one number (0-9)");
      return;
    }
    if (!/[!@#$%^&*]/.test(form.newPassword)) {
      toast.error(
        "New password must include at least one special character (!@#$%^&*)"
      );
      return;
    }
    if (form.newPassword === form.currentPassword) {
      toast.error("New password must be different from current password");
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setSaving(true);
    try {
      await changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });
      toast.success("Password updated successfully");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (e) {
      toast.error(e?.response?.data?.message || "Password update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
      <h2 className="text-xl font-semibold text-[#0F2C59] dark:text-blue-300 mb-4">
        Security
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <div className="sm:col-span-2">
          <label className="block text-sm text-[#64748B] dark:text-gray-400 mb-1">
            Current password
          </label>
          <input
            type="password"
            name="currentPassword"
            value={form.currentPassword}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label className="block text-sm text-[#64748B] dark:text-gray-400 mb-1">
            New password
          </label>
          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="8+ chars, 1 number, 1 special (!@#$%^&*)"
          />
        </div>

        <div>
          <label className="block text-sm text-[#64748B] dark:text-gray-400 mb-1">
            Confirm password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Repeat new password"
          />
        </div>

        <div className="sm:col-span-2 mt-1">
          <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-3 text-sm text-[#0F2C59] dark:text-blue-200">
            <p className="font-medium mb-1">Password requirements:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>At least 8 characters</li>
              <li>Includes at least one number (0-9)</li>
              <li>Includes at least one special character (!@#$%^&*)</li>
              <li>Different from your current password</li>
              <li>New and confirm password must match</li>
            </ul>
          </div>
        </div>

        <div className="sm:col-span-2 flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F2C59] text-white font-semibold hover:bg-[#0c2347] disabled:opacity-60 shadow-sm"
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
            Update password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSecurity;
