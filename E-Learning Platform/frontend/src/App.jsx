import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import { AuthProvider } from "./providers/AuthProvider";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Home from "./pages/user/Home";
import UserShell from "./pages/user/UserShell";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";
import { Toaster } from "react-hot-toast";
import adminRoutes from "./routes/adminRoutes";
import userRoutes from "./routes/userRoutes";

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected User Routes (grouped) */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <UserShell />
              </ProtectedRoute>
            }
          >
            {userRoutes}
          </Route>

          {/* Protected Admin Route */}
          <Route
            path="/admin-dashboard/*"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          >
            {adminRoutes}
          </Route>

          {/* Catch-all Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
