import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import { EnhancedCarousel } from "../components/EnhancedCarousel";

export default function AuthPage() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location.pathname === "/signup" ? "signup" : "login"
  );
  const [isLoaded, setIsLoaded] = useState(false);

  // Handle page load animation
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Update tab based on route
  useEffect(() => {
    setActiveTab(location.pathname === "/signup" ? "signup" : "login");
  }, [location.pathname]);

  return (
    <div className="h-screen w-full min-w-screen flex overflow-hidden bg-slate-900">
      {/* Left Hero Section - Enhanced Carousel - 65% Width */}
      <div className="hidden md:flex md:w-[65%] relative overflow-hidden  ">
        <EnhancedCarousel />
      </div>

      {/* Right Auth Panel - 35% Width on Desktop, Full on Mobile */}
      <div className="flex flex-col justify-center items-center w-full md:w-[35%] h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-y-auto ">
        {/* Mobile Background */}
        <div className="md:hidden absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-200 rounded-full animate-ping"></div>
            <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-emerald-300 rounded-full animate-bounce"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white/60"></div>
        </div>

        <div
          className={`w-full max-w-md mx-auto px-4 md:px-6 py-6 transform transition-all duration-1200 delay-200 relative z-10 ${
            isLoaded ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
          }`}
        >
          {/* Mobile Logo */}
          <div className="md:hidden text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-3 shadow-xl">
              <span className="text-xl font-bold text-white">A</span>
            </div>
            <h1 className="text-xl font-bold text-slate-800 mb-1">AfaqNama</h1>
            <p className="text-slate-600 text-sm">ACCA Excellence Platform</p>
          </div>

          {/* Enhanced Auth Container - Wider */}
          <div className="bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/50 overflow-hidden hover:shadow-3xl transition-all duration-500 w-full mt-85">
            {/* Add the AfaqNama title and top padding here */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-t-2xl py-6 px-6 text-center">
              <h1 className="text-3xl font-bold text-white">AfaqNama</h1>
              <p className="text-sm text-blue-100 mt-1">
                ACCA Excellence Platform
              </p>
            </div>
            {/* Enhanced Tab Header */}
            <div className="p-4 md:p-6 pb-0">
              <div className="flex bg-gradient-to-r from-slate-100 to-slate-50 rounded-xl p-1.5 mb-6 shadow-inner">
                <button
                  className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all duration-500 transform relative overflow-hidden ${
                    activeTab === "login"
                      ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg scale-[1.02] border-2 border-indigo-200"
                      : "text-slate-600 hover:text-indigo-600 hover:bg-white/70 hover:scale-[1.01]"
                  }`}
                  onClick={() => setActiveTab("login")}
                >
                  {activeTab === "login" && (
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 animate-pulse"></div>
                  )}
                  <span className="relative z-10">Login</span>
                </button>
                <button
                  className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all duration-500 transform relative overflow-hidden ${
                    activeTab === "signup"
                      ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg scale-[1.02] border-2 border-indigo-200"
                      : "text-slate-600 hover:text-indigo-600 hover:bg-white/70 hover:scale-[1.01]"
                  }`}
                  onClick={() => setActiveTab("signup")}
                >
                  {activeTab === "signup" && (
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 animate-pulse"></div>
                  )}
                  <span className="relative z-10">Sign Up</span>
                </button>
              </div>
            </div>

            {/* Enhanced Form Container - Wider */}
            <div className="px-4 md:px-6 pb-4 md:pb-6 ">
              <div className="relative overflow-hidden min-h-[350px]">
                <div
                  className={`transition-all duration-700 ease-out transform ${
                    activeTab === "login"
                      ? "translate-x-0 opacity-100 scale-100 mb-52"
                      : "-translate-x-full opacity-0 scale-95 absolute inset-0"
                  }`}
                >
                  <LoginForm />
                </div>
                <div
                  className={`transition-all duration-700 ease-out transform   ${
                    activeTab === "signup"
                      ? "translate-x-0 opacity-100 scale-100"
                      : "translate-x-full opacity-0 scale-95 absolute inset-0"
                  }`}
                >
                  <SignupForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
