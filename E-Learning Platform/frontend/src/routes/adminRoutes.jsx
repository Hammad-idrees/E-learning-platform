import React from "react";
import { Route } from "react-router-dom";
import Overview from "../pages/admin/Overview";
import Users from "../pages/admin/Users";
import Courses from "../pages/admin/Courses";
import Enrollments from "../pages/admin/Enrollments";
import Notifications from "../pages/admin/Notifications";
import Analytics from "../pages/admin/Analytics";
import Settings from "../pages/admin/Settings";
import TOCManager from "../pages/admin/TOCManager";
import VideoManager from "../pages/admin/VideoManager";
import Videos from "../pages/admin/Videos";
import Banners from "../pages/admin/Banners";

const AdminRoutes = (
  <>
    <Route index element={<Overview />} />
    <Route path="overview" element={<Overview />} />
    <Route path="users" element={<Users />} />
    <Route path="courses" element={<Courses />} />
    <Route path="enrollments" element={<Enrollments />} />
    <Route path="notifications" element={<Notifications />} />
    <Route path="analytics" element={<Analytics />} />
    <Route path="settings" element={<Settings />} />
    <Route path="toc/:courseId" element={<TOCManager />} />
    <Route path="video-manager" element={<VideoManager />} />
    <Route path="videos" element={<Videos />} />
    <Route path="banners" element={<Banners />} />
  </>
);

export default AdminRoutes;
