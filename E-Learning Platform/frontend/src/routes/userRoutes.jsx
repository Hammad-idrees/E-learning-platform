import React from "react";
import { Route } from "react-router-dom";
import Home from "../pages/user/Home";
import Courses from "../pages/user/Courses";
import Enrollments from "../pages/user/Enrollments";
import MyCourses from "../pages/user/MyCourses";
import Support from "../pages/user/Support";
import Profile from "../pages/user/Profile";
import About from "../pages/user/About";
import Notifications from "../pages/user/Notifications";
import CourseDetail from "../pages/user/CourseDetail";
import CourseVideos from "../pages/user/CourseVideos";

const UserRoutes = (
  <>
    <Route index element={<Home />} />
    <Route path="courses" element={<Courses />} />
    <Route path="course/:courseId" element={<CourseDetail />} />
    <Route path="course-videos/:courseId" element={<CourseVideos />} />
    <Route path="enrollments" element={<Enrollments />} />
    <Route path="my-courses" element={<MyCourses />} />
    <Route path="support" element={<Support />} />
    <Route path="profile" element={<Profile />} />
    <Route path="about" element={<About />} />
    <Route path="notifications" element={<Notifications />} />
  </>
);

export default UserRoutes;
