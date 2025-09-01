import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaHeart,
} from "react-icons/fa";

const navLinkCls =
  "text-sm font-medium text-slate-200 hover:text-blue-300 transition-all duration-300 hover:translate-x-1 group";

const StudentFooter = () => {
  return (
    <footer className="bg-gradient-to-br from-indigo-900 to-indigo-700 dark:from-slate-800 dark:to-slate-900 text-white border-t border-slate-500 dark:border-slate-700 relative overflow-hidden transition-colors duration-300">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-25">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/8 to-transparent"></div>
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6 group cursor-pointer hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 rounded-xl flex items-center justify-center text-white shadow-lg transform group-hover:rotate-6 transition-all duration-500">
                <span className="text-lg font-bold">AN</span>
              </div>
              <span className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                AfaqNama
              </span>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed mb-6 max-w-xs">
              Premier ACCA video learning platform empowering future chartered
              accountants with quality education.
            </p>

            {/* Stats */}
            <div className="flex gap-6 mb-6 ">
              <div className="text-center">
                <div className="text-xl font-bold text-blue-400">1.5K+</div>
                <div className="text-xs text-slate-300">Students</div>
              </div>
              <div className="text-center ml-10">
                <div className="text-xl font-bold text-blue-400">95%</div>
                <div className="text-xs text-slate-300">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-3">
              <div className="w-2 h-6 bg-blue-400 rounded-full"></div>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Home" },
                { to: "/courses", label: "All Courses" },
                { to: "/enrollments", label: "My Enrollments" },
                { to: "/about", label: "About Us" },
                { to: "/contact", label: "Contact" },
              ].map((item) => (
                <li key={item.label}>
                  <NavLink to={item.to} className={navLinkCls}>
                    <span className="relative">
                      {item.label}
                      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-3">
              <div className="w-2 h-6 bg-blue-400 rounded-full"></div>
              Get in Touch
            </h4>
            <div className="space-y-3 text-sm text-slate-200">
              {[
                { Icon: FaMapMarkerAlt, text: "New York, NY 10012, US" },
                { Icon: FaEnvelope, text: "info@afaqnama.com" },
                { Icon: FaPhone, text: "+1 234 567 8900" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 hover:text-blue-300 transition-colors duration-300 group cursor-pointer"
                >
                  <div className="w-8 h-8 bg-slate-600 rounded-lg flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-300">
                    <item.Icon className="text-xs text-blue-400 group-hover:text-white transition-colors" />
                  </div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-3">
              <div className="w-2 h-6 bg-blue-400 rounded-full"></div>
              Stay Updated
            </h4>

            <div className="bg-slate-600/50 backdrop-blur-sm rounded-xl p-4 border border-slate-500/30">
              <p className="text-sm text-slate-200 mb-3">
                Get the latest updates
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg text-sm border border-slate-500 bg-slate-700/50 text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                />
                <button className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium transition-all duration-300 hover:scale-105 active:scale-95">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="text-center sm:text-left">
            <p className="text-sm text-slate-300">
              © {new Date().getFullYear()}{" "}
              <span className="font-semibold text-blue-400">AfaqNama</span>.
              Made with{" "}
              <FaHeart className="inline-block w-3 h-3 text-red-400 animate-pulse" />{" "}
              for future accountants.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-300">
              Follow us:
            </span>
            <div className="flex items-center gap-2">
              {[
                {
                  Icon: FaFacebookF,
                  color: "hover:bg-blue-600",
                  label: "Facebook",
                },
                {
                  Icon: FaTwitter,
                  color: "hover:bg-sky-500",
                  label: "Twitter",
                },
                {
                  Icon: FaLinkedinIn,
                  color: "hover:bg-blue-700",
                  label: "LinkedIn",
                },
                {
                  Icon: FaYoutube,
                  color: "hover:bg-red-600",
                  label: "YouTube",
                },
                {
                  Icon: FaInstagram,
                  color: "hover:bg-pink-600",
                  label: "Instagram",
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href="#"
                  aria-label={item.label}
                  className={`w-10 h-10 rounded-lg bg-slate-600 ${item.color} flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 active:scale-95 group`}
                >
                  <item.Icon className="text-slate-200 text-base group-hover:scale-110 group-hover:text-white transition-all" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default StudentFooter;
