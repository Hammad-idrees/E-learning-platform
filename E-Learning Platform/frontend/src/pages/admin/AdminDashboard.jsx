import React, { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  getMyNotifications,
  markNotificationAsRead,
} from "../../services/notifications";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const loadNotifications = async () => {
    try {
      const data = await getMyNotifications();
      const list = Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data)
        ? data
        : [];
      const mapped = list.map((n) => ({
        id: n._id,
        message: n.message,
        time: new Date(n.createdAt).toLocaleString(),
        unread: !n.read,
      }));
      setNotifications(mapped);
    } catch {
      // noop
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleProfileClick = () => {
    navigate("/admin-dashboard/settings");
  };

  const handleMarkRead = async (id) => {
    try {
      await markNotificationAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
      );
    } catch {
      // noop
    }
  };

  const goToNotifications = () => navigate("/admin-dashboard/notifications");

  const handleMobileToggle = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <div className="flex h-screen bg-[#f8fafc]">
      <Sidebar
        isMobileOpen={isMobileOpen}
        onMobileToggle={handleMobileToggle}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          adminName={`${user?.firstName || "Admin"} ${
            user?.lastName || ""
          }`.trim()}
          adminEmail={user?.email || ""}
          notifications={notifications}
          onProfileClick={handleProfileClick}
          onLogout={logout}
          onMarkRead={handleMarkRead}
          onNotificationsClick={goToNotifications}
          onMobileToggle={handleMobileToggle}
          isMobileOpen={isMobileOpen}
        />
        <main className="flex-1 bg-[#f8fafc] p-4 lg:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
