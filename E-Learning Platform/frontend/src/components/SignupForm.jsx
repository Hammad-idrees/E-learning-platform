import React, { useEffect, useState } from "react";
import {
  Mail,
  Lock,
  User,
  AtSign,
  Phone,
  ChevronDown,
  Eye,
  EyeOff,
  ArrowRight,
  Globe,
} from "react-feather";
import Spinner from "./Spinner";
import { signup as signupApi } from "../services/auth";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const accaMotivationalQuotes = [
  "Success in ACCA is built on three pillars: dedication, discipline, and determination.",
  "Every ACCA journey begins with a single exam—take the first step toward your future today.",
  "Financial expertise is the key to unlocking global career opportunities.",
  "ACCA doesn’t just certify accountants—it shapes financial leaders.",
  "Rigorous exams today, rewarding career tomorrow—ACCA paves the way.",
];

const countries = [
  "Afghanistan",
  "Argentina",
  "Australia",
  "Austria",
  "Bangladesh",
  "Belgium",
  "Brazil",
  "Canada",
  "China",
  "Denmark",
  "Egypt",
  "Finland",
  "France",
  "Germany",
  "Greece",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Italy",
  "Japan",
  "Kenya",
  "Malaysia",
  "Mexico",
  "Morocco",
  "Netherlands",
  "New Zealand",
  "Nigeria",
  "Norway",
  "Pakistan",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Russia",
  "Saudi Arabia",
  "Singapore",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "Sweden",
  "Switzerland",
  "Thailand",
  "Turkey",
  "UAE",
  "United Kingdom",
  "United States",
  "Vietnam",
  "Other",
];

export default function SignupForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    phone: "",
  });

  // Rotate quotes every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % accaMotivationalQuotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const [touched, setTouched] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();
  const [currentQuote, setCurrentQuote] = useState(0);

  // Password strength check
  const getPasswordStrength = (pwd) => {
    if (pwd.length < 8) return "Weak";
    if (!/[0-9]/.test(pwd) || !/[!@#$%^&*]/.test(pwd)) return "Medium";
    return "Strong";
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setTouched({ ...touched, [e.target.name]: true });
    setError("");
    setSuccess("");
  };

  const validate = () => {
    if (!form.firstName.trim()) return "First name is required.";
    if (!form.lastName.trim()) return "Last name is required.";
    if (!form.username.trim()) return "Username is required.";
    if (!/^([a-z0-9_]{3,20})$/.test(form.username))
      return "Username must be 3-20 chars, lowercase, and can include _";
    if (!form.email.trim()) return "Email is required.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      return "Invalid email address.";
    if (!form.password) return "Password is required.";
    if (form.password.length < 8)
      return "Password must be at least 8 characters.";
    if (!/[0-9]/.test(form.password) || !/[!@#$%^&*]/.test(form.password))
      return "Password must include a number and a symbol.";
    if (form.password !== form.confirmPassword)
      return "Passwords do not match.";
    if (!form.country) return "Country is required.";
    if (!form.phone.trim()) return "Phone number is required.";
    if (!/^\+?[0-9\s-]{7,20}$/.test(form.phone)) return "Invalid phone number.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      firstName: true,
      lastName: true,
      username: true,
      email: true,
      password: true,
      confirmPassword: true,
      country: true,
      phone: true,
    });
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await signupApi(form);
      login(res.data, res.data.token);
      setSuccess("Signup successful! Redirecting to dashboard...");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    } catch (e) {
      setError(
        e?.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = (field) => {
    setFocusedField(null);
    setTouched({ ...touched, [field]: true });
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-slate-800 mb-2">
          Join AfaqNama
        </h3>
        <p className="text-slate-600">Start your ACCA excellence journey</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <User size={16} className="text-indigo-500" />
              First Name
            </label>
            <div className="relative">
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                onFocus={() => handleFocus("firstName")}
                onBlur={() => handleBlur("firstName")}
                required
                className={`w-full px-4 py-3 bg-slate-50 border-2 rounded-xl text-slate-800 placeholder-slate-400 transition-all duration-300 focus:outline-none focus:bg-white ${
                  touched.firstName && !form.firstName
                    ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                    : focusedField === "firstName"
                    ? "border-indigo-500 focus:ring-4 focus:ring-indigo-100 shadow-lg"
                    : "border-slate-200 hover:border-slate-300"
                }`}
                placeholder="John"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <User size={16} className="text-indigo-500" />
              Last Name
            </label>
            <div className="relative">
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                onFocus={() => handleFocus("lastName")}
                onBlur={() => handleBlur("lastName")}
                required
                className={`w-full px-4 py-3 bg-slate-50 border-2 rounded-xl text-slate-800 placeholder-slate-400 transition-all duration-300 focus:outline-none focus:bg-white ${
                  touched.lastName && !form.lastName
                    ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                    : focusedField === "lastName"
                    ? "border-indigo-500 focus:ring-4 focus:ring-indigo-100 shadow-lg"
                    : "border-slate-200 hover:border-slate-300"
                }`}
                placeholder="Doe"
              />
            </div>
          </div>
        </div>

        {/* Username Field */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <AtSign size={16} className="text-indigo-500" />
            Username
          </label>
          <div className="relative">
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              onFocus={() => handleFocus("username")}
              onBlur={() => handleBlur("username")}
              required
              className={`w-full px-4 py-3 bg-slate-50 border-2 rounded-xl text-slate-800 placeholder-slate-400 transition-all duration-300 focus:outline-none focus:bg-white ${
                touched.username &&
                (!/^([a-z0-9_]{3,20})$/.test(form.username) || !form.username)
                  ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                  : focusedField === "username"
                  ? "border-indigo-500 focus:ring-4 focus:ring-indigo-100 shadow-lg"
                  : "border-slate-200 hover:border-slate-300"
              }`}
              placeholder="johndoe123"
            />
            {touched.username &&
              form.username &&
              !/^([a-z0-9_]{3,20})$/.test(form.username) && (
                <p className="text-xs text-red-600 mt-1">
                  3-20 characters, lowercase letters, numbers, and underscores
                  only
                </p>
              )}
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Mail size={16} className="text-indigo-500" />
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              onFocus={() => handleFocus("email")}
              onBlur={() => handleBlur("email")}
              required
              className={`w-full px-4 py-3 bg-slate-50 border-2 rounded-xl text-slate-800 placeholder-slate-400 transition-all duration-300 focus:outline-none focus:bg-white ${
                touched.email &&
                (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email) || !form.email)
                  ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                  : focusedField === "email"
                  ? "border-indigo-500 focus:ring-4 focus:ring-indigo-100 shadow-lg"
                  : "border-slate-200 hover:border-slate-300"
              }`}
              placeholder="john.doe@example.com"
            />
          </div>
        </div>

        {/* Password Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Lock size={16} className="text-indigo-500" />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                onFocus={() => handleFocus("password")}
                onBlur={() => handleBlur("password")}
                required
                className={`w-full px-4 py-3 pr-12 bg-slate-50 border-2 rounded-xl text-slate-800 placeholder-slate-400 transition-all duration-300 focus:outline-none focus:bg-white ${
                  touched.password &&
                  (!form.password ||
                    form.password.length < 8 ||
                    !/[0-9]/.test(form.password) ||
                    !/[!@#$%^&*]/.test(form.password))
                    ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                    : focusedField === "password"
                    ? "border-indigo-500 focus:ring-4 focus:ring-indigo-100 shadow-lg"
                    : "border-slate-200 hover:border-slate-300"
                }`}
                placeholder="Create password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-indigo-500 transition-colors duration-200 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {/* Password Strength Meter */}
            {form.password && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-slate-200 rounded-full h-2">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        getPasswordStrength(form.password) === "Strong"
                          ? "bg-emerald-500 w-full"
                          : getPasswordStrength(form.password) === "Medium"
                          ? "bg-yellow-500 w-2/3"
                          : "bg-red-500 w-1/3"
                      }`}
                    />
                  </div>
                  <span
                    className={`text-xs font-semibold ${
                      getPasswordStrength(form.password) === "Strong"
                        ? "text-emerald-600"
                        : getPasswordStrength(form.password) === "Medium"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {getPasswordStrength(form.password)}
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Min 8 chars, include number & symbol Example: Mypassword@1
                </p>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Lock size={16} className="text-indigo-500" />
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                onFocus={() => handleFocus("confirmPassword")}
                onBlur={() => handleBlur("confirmPassword")}
                required
                className={`w-full px-4 py-3 pr-12 bg-slate-50 border-2 rounded-xl text-slate-800 placeholder-slate-400 transition-all duration-300 focus:outline-none focus:bg-white ${
                  touched.confirmPassword &&
                  form.confirmPassword !== form.password
                    ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                    : focusedField === "confirmPassword"
                    ? "border-indigo-500 focus:ring-4 focus:ring-indigo-100 shadow-lg"
                    : "border-slate-200 hover:border-slate-300"
                }`}
                placeholder="Confirm password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-indigo-500 transition-colors duration-200 focus:outline-none"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {touched.confirmPassword &&
              form.confirmPassword &&
              form.confirmPassword !== form.password && (
                <p className="text-xs text-red-600">Passwords do not match</p>
              )}
          </div>
        </div>

        {/* Country & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Globe size={16} className="text-indigo-500" />
              Country
            </label>
            <div className="relative">
              <select
                name="country"
                value={form.country}
                onChange={handleChange}
                onFocus={() => handleFocus("country")}
                onBlur={() => handleBlur("country")}
                required
                className={`w-full px-4 py-3 bg-slate-50 border-2 rounded-xl text-slate-800 transition-all duration-300 focus:outline-none focus:bg-white appearance-none ${
                  touched.country && !form.country
                    ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                    : focusedField === "country"
                    ? "border-indigo-500 focus:ring-4 focus:ring-indigo-100 shadow-lg"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <option value="">Select country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={20}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Phone size={16} className="text-indigo-500" />
              Phone Number
            </label>
            <div className="relative">
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                onFocus={() => handleFocus("phone")}
                onBlur={() => handleBlur("phone")}
                required
                className={`w-full px-4 py-3 bg-slate-50 border-2 rounded-xl text-slate-800 placeholder-slate-400 transition-all duration-300 focus:outline-none focus:bg-white ${
                  touched.phone &&
                  !(/^\+?[0-9\s-]{7,20}$/.test(form.phone) || !form.phone)
                    ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                    : focusedField === "phone"
                    ? "border-indigo-500 focus:ring-4 focus:ring-indigo-100 shadow-lg"
                    : "border-slate-200 hover:border-slate-300"
                }`}
                placeholder="+1 234 567 8900"
              />
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 animate-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-red-600 text-sm font-bold">!</span>
              </div>
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 animate-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-emerald-600 text-lg">✓</span>
              </div>
              <p className="text-emerald-700 text-sm font-medium">{success}</p>
            </div>
          </div>
        )}

        {/* ACCA Motivational Quote */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg border border-blue-100">
          <h4 className="text-sm text-gray-900 mb-2 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            ACCA Success Tip
          </h4>
          <motion.p
            key={currentQuote}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="text-sm text-gray-600 italic leading-relaxed"
          >
            {accaMotivationalQuotes[currentQuote]}
          </motion.p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 px-6 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 group ${
            loading ? "cursor-wait" : ""
          }`}
        >
          {loading ? (
            <>
              <Spinner />
              <span>Creating your account...</span>
            </>
          ) : (
            <>
              <span>Create Account</span>
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
