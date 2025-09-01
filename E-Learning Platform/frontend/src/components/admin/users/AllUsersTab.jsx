import React, { useEffect, useMemo, useState } from "react";
import { getAllUsers, deleteUser } from "../../../services/admin";
import {
  FaSearch,
  FaTrashAlt,
  FaUserCircle,
  FaRegCopy,
  FaCheckCircle,
} from "react-icons/fa";

const AllUsersTab = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [dataWarning, setDataWarning] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedEmail, setCopiedEmail] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    setDataWarning(null);
    try {
      const data = await getAllUsers();
      console.log("getAllUsers response:", data);

      let usersData = [];
      if (data && data.data && Array.isArray(data.data.docs)) {
        usersData = data.data.docs;
      } else if (Array.isArray(data)) {
        usersData = data;
      } else if (data && Array.isArray(data.users)) {
        usersData = data.users;
      } else {
        setDataWarning("Unexpected response format from API.");
      }

      setUsers(usersData);
      setFilteredUsers(usersData);
    } catch (err) {
      setError("Failed to fetch users.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(users);
    } else {
      const lowercasedTerm = searchTerm.toLowerCase();
      const filtered = users.filter(
        (user) =>
          (user.firstName &&
            user.firstName.toLowerCase().includes(lowercasedTerm)) ||
          (user.lastName &&
            user.lastName.toLowerCase().includes(lowercasedTerm)) ||
          (user.email && user.email.toLowerCase().includes(lowercasedTerm)) ||
          (user.username &&
            user.username.toLowerCase().includes(lowercasedTerm))
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  const totalUsersText = useMemo(
    () => `${filteredUsers.length} of ${users.length}`,
    [filteredUsers.length, users.length]
  );

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    setDeleting(userId);
    try {
      await deleteUser(userId);
      setUsers((prev) => prev.filter((u) => u._id !== userId));
      setFilteredUsers((prev) => prev.filter((u) => u._id !== userId));
    } catch (err) {
      alert("Failed to delete user.");
      console.error(err);
    } finally {
      setDeleting(null);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const copyEmail = async (email) => {
    try {
      await navigator.clipboard.writeText(email || "");
      setCopiedEmail(email);
      setTimeout(() => setCopiedEmail(""), 1200);
    } catch {
      // noop
    }
  };

  if (loading) {
    return (
      <div className="space-y-5">
        <div className="relative">
          <div className="w-full h-10 skeleton rounded-lg" />
        </div>
        <div className="text-sm text-gray-600">Loading users...</div>
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-corporate">
          <div className="divide-y divide-gray-100">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="p-5 grid grid-cols-4 gap-4">
                <div className="h-5 skeleton rounded" />
                <div className="h-5 skeleton rounded" />
                <div className="h-5 skeleton rounded" />
                <div className="h-5 skeleton rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) return <div className="text-red-500">{error}</div>;
  if (dataWarning) return <div className="text-yellow-600">{dataWarning}</div>;

  return (
    <div className="space-y-5">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search by name, email, or username..."
          className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] bg-white"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing{" "}
        <span className="text-[#2563eb] font-semibold">{totalUsersText}</span>{" "}
        users
      </div>

      {/* Users Table */}
      {filteredUsers.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No users found matching your search.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-corporate">
          <table className="min-w-full">
            <thead className="bg-[#f8fafc]">
              <tr className="text-left text-gray-600">
                <th className="px-6 py-3 font-semibold">User</th>
                <th className="px-6 py-3 font-semibold">Email</th>
                <th className="px-6 py-3 font-semibold">Username</th>
                <th className="px-6 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="group hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-full bg-[#e2e8f0] flex items-center justify-center text-[#0f172a]">
                        <FaUserCircle className="w-5 h-5 text-[#2563eb]" />
                      </div>
                      <div>
                        <div className="font-medium text-[#0f172a]">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-xs text-gray-500">{user._id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#0f172a]">
                    <div className="flex items-center space-x-2">
                      <span className="truncate max-w-[220px] md:max-w-[320px]">
                        {user.email}
                      </span>
                      <button
                        title="Copy email"
                        onClick={() => copyEmail(user.email)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-[#2563eb]"
                      >
                        {copiedEmail === user.email ? (
                          <FaCheckCircle className="w-4 h-4 text-[#22c55e]" />
                        ) : (
                          <FaRegCopy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#0f172a]">{user.username}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end">
                      <button
                        className="btn-danger px-3 py-2 flex items-center space-x-2 disabled:opacity-50 transform transition-transform hover:scale-[1.02]"
                        onClick={() => handleDelete(user._id)}
                        disabled={deleting === user._id}
                      >
                        <FaTrashAlt className="w-4 h-4" />
                        <span>
                          {deleting === user._id ? "Deleting..." : "Delete"}
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllUsersTab;
