import React, { useState, useEffect } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle,
  AlertCircle,
} from "react-feather";
import Spinner from "./Spinner";
import { login as loginApi } from "../services/auth";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const accaMotivationalQuotes = [
  "Success in ACCA is built on three pillars: dedication, discipline, and determination.",
  "Every ACCA journey begins with a single exam—take the first step toward your future today.",
  "Financial expertise is the key to unlocking global career opportunities.",
  "ACCA doesn't just certify accountants—it shapes financial leaders.",
  "Rigorous exams today, rewarding career tomorrow—ACCA paves the way.",
];

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const [currentQuote, setCurrentQuote] = useState(0);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Rotate quotes every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % accaMotivationalQuotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Clear messages after 4 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await loginApi(form.email, form.password);

      // Let AuthContext handle all the saving and state management
      await login(res.data, res.token);

      // Show success message
      if (res.data.isAdmin) {
        setSuccess("Welcome Admin! Redirecting...");
      } else {
        setSuccess("Welcome back! Redirecting...");
      }

      // Navigate immediately (ProtectedRoute will handle the correct redirection)
      setTimeout(() => {
        if (res.data.isAdmin) {
          navigate("/admin-dashboard");
        } else {
          navigate("/");
        }
      }, 1000); // Reduced timeout for better UX
    } catch (e) {
      setError(
        e?.response?.data?.message || "Invalid credentials. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-4 sm:space-y-6">
      {/* Success/Error Messages */}
      {(error || success) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`p-3 sm:p-4 rounded-lg text-sm sm:text-base flex items-center gap-2 ${
            success
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {success ? (
            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
          ) : (
            <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
          )}
          {success || error}
        </motion.div>
      )}

      {/* Login Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onSubmit={handleSubmit}
        className="space-y-4 sm:space-y-5"
      >
        <div className="space-y-2">
          <label className="block text-sm sm:text-base font-medium text-gray-700">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              onFocus={() => handleFocus("email")}
              onBlur={handleBlur}
              required
              className={`w-full px-4 py-3 sm:py-4 pl-10 bg-white border rounded-lg text-gray-800 placeholder-gray-400 transition-all duration-300 focus:outline-none text-base sm:text-lg ${
                error
                  ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  : focusedField === "email"
                  ? "border-blue-500 focus:ring-2 focus:ring-blue-100 shadow-md"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              placeholder="your.email@example.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm sm:text-base font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              onFocus={() => handleFocus("password")}
              onBlur={handleBlur}
              required
              className={`w-full px-4 py-3 sm:py-4 pl-10 pr-12 bg-white border rounded-lg text-gray-800 placeholder-gray-400 transition-all duration-300 focus:outline-none text-base sm:text-lg ${
                error
                  ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  : focusedField === "password"
                  ? "border-blue-500 focus:ring-2 focus:ring-blue-100 shadow-md"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-blue-500 transition-colors duration-200 focus:outline-none touch-manipulation"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 sm:py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 group text-base sm:text-lg touch-manipulation ${
            loading ? "cursor-wait" : ""
          }`}
        >
          {loading ? (
            <>
              <Spinner />
              <span>Signing you in...</span>
            </>
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </>
          )}
        </button>
      </motion.form>

      {/* ACCA Motivational Quote */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 p-3 sm:p-4 rounded-lg border border-blue-100">
        <h4 className="text-sm sm:text-base text-gray-900 mb-2 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500" />
          ACCA Success Tip
        </h4>
        <motion.p
          key={currentQuote}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="text-sm sm:text-base text-gray-600 italic leading-relaxed"
        >
          {accaMotivationalQuotes[currentQuote]}
        </motion.p>
      </div>

      {/* Terms */}
      <div className="text-center text-xs sm:text-sm text-gray-500 leading-relaxed">
        By continuing, you agree to AfaqNama's{" "}
        <button className="text-blue-600 hover:underline transition-colors touch-manipulation">
          Terms of Service
        </button>{" "}
        and{" "}
        <button className="text-blue-600 hover:underline transition-colors touch-manipulation">
          Privacy Policy
        </button>
      </div>
    </div>
  );
}
