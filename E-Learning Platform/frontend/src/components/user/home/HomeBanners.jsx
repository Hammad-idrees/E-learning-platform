import React, { useEffect, useState } from "react";
import { getPublicBanners } from "../../../services/banners";
import BannerCarousel from "../../admin/banners/BannerCarousel";
import { FaGraduationCap } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
const HomeBanners = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Smooth entrance animation
    const timer = setTimeout(() => setIsVisible(true), 150);

    (async () => {
      try {
        setLoading(true);
        const res = await getPublicBanners();
        const data = Array.isArray(res?.data) ? res.data : res || [];
        setBanners(data);
      } catch {
        setError("Failed to load banners");
      } finally {
        setLoading(false);
      }
    })();

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-10 sm:py-14">
      <div className="mx-auto w-full px-6 sm:px-8 lg:px-12 xl:px-20 max-w-[1400px]">
        {/* Header */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
          <FaGraduationCap className="w-4 h-4" />
          Latest News
        </div>
        <div
          className={`text-center md:text-left mb-6 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F2C59] dark:text-white">
            <TypeAnimation
              sequence={[
                "Latest News & Courses",
                2000,
                "Stay Updated",
                2000,
                "New Announcements",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h2>
          <p className="mt-1 text-[#64748B] dark:text-gray-300 sm:text-lg ">
            <TypeAnimation
              sequence={[
                "Stay updated with the newest announcements and course additions",
                3000,
                "Discover fresh content and learning opportunities",
                3000,
                "Get the latest insights and educational resources",
                3000,
              ]}
              wrapper="span"
              speed={40}
              repeat={Infinity}
            />
          </p>
        </div>

        {/* Banner Content */}
        <div
          className={`transition-all duration-800 ease-out delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {loading ? (
            <div className="w-full h-64 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-[#64748B] dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex flex-col items-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-[#2563EB] border-t-transparent"></div>
                <span className="text-sm">Loading banners...</span>
              </div>
            </div>
          ) : error ? (
            <div className="w-full h-64 rounded-lg border border-red-200 dark:border-red-700 flex items-center justify-center text-red-500 bg-red-50 dark:bg-red-900/20">
              <div className="flex flex-col items-center gap-2">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm">{error}</span>
              </div>
            </div>
          ) : (
            <div className="relative group">
              {/* Enhanced Banner Carousel Container */}
              <div className="overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-500">
                <div className="relative">
                  <BannerCarousel
                    items={banners}
                    heightClass="h-[28rem] md:h-[32rem]" // Increased height
                    widthClass="w-full"
                    fit="cover" // Changed to cover to eliminate white spaces
                    className="object-center" // Center the image properly
                  />

                  {/* Navigation Indicators */}
                  {banners.length > 1 && (
                    <div className="absolute bottom-4 right-6 flex items-center gap-2">
                      <div className="flex gap-1">
                        {banners.slice(0, 5).map((_, index) => (
                          <button
                            key={index}
                            className="w-2 h-2 rounded-full bg-white/40 hover:bg-white/80 transition-all duration-300 hover:scale-125"
                            aria-label={`Go to slide ${index + 1}`}
                          />
                        ))}
                        {banners.length > 5 && (
                          <span className="text-white/60 text-xs ml-1">
                            +{banners.length - 5}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Interactive Hover Effect */}
                <div className="absolute inset-0 rounded-xl ring-0 ring-[#2563EB]/0 group-hover:ring-2 group-hover:ring-[#2563EB]/30 transition-all duration-300 pointer-events-none"></div>
              </div>

              {/* Caption Below Banner */}
              {banners.length > 0 && (
                <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group/caption">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-4 py-2 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white text-sm font-bold rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer">
                      ✨ Featured Announcement
                    </span>
                    <span className="text-xs text-[#64748B] dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-lg md:text-xl font-bold mb-2 text-[#0F2C59] dark:text-white group-hover/caption:text-[#2563EB] dark:group-hover/caption:text-blue-400 transition-colors duration-300">
                    {banners[0]?.title || "Latest Updates & Course Offerings"}
                  </h3>
                  <p className="text-sm md:text-base text-[#475569] dark:text-gray-300 leading-relaxed">
                    {banners[0]?.description ||
                      "Stay informed with our latest updates and course offerings"}
                  </p>
                </div>
              )}

              {/* Interactive Features Counter */}
              {banners.length > 0 && (
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg px-3 py-1 shadow-lg">
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {banners.length}{" "}
                    {banners.length === 1 ? "Banner" : "Banners"}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeBanners;
