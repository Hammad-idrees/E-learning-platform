import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Award,
  Star,
  Eye,
  Download,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Import certificate images
import cert1 from "../../../assets/certificates/Certificate_1.jpg";
import cert2 from "../../../assets/certificates/Certificate_2.jpg";
import cert3 from "../../../assets/certificates/Certificate_3.jpg";
import cert4 from "../../../assets/certificates/Certificate_4.jpg";
import cert5 from "../../../assets/certificates/Certificate_5.jpg";
import cert6 from "../../../assets/certificates/Certificate_6.jpg";

const certificates = [
  {
    id: 1,
    image: cert1,
    title: "Internship",
    issuer: "A.F. Ferguson & Co. (PwC Pakistan)",
    year: "2022",
    description: "Intern in an Audit Section",
  },
  {
    id: 2,
    image: cert2,
    title: "Responsable Comptable Et Financier",
    issuer: "PPA Business School",
    year: "2024",
  },
  {
    id: 3,
    image: cert3,
    title: "Certification Of Appreciation",
    issuer: "Association Of Chartered Certified Accountants",
    year: "2024",
  },
  {
    id: 4,
    image: cert4,
    title: "Strategic Professional",
    issuer: "Association Of Chartered Certified Accountants",
    year: "2023",
  },
  {
    id: 5,
    image: cert5,
    title: "Bachelor Of Business Administration In Finance",
    issuer: "PPA Business School",
    year: "2024",
  },
  {
    id: 6,
    image: cert6,
    title: "Bachelor De Business Administration En Financial Management",
    issuer: "PPA Business School",
    year: "2024",
  },
];

const CertificateCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedCert, setSelectedCert] = useState(null);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % certificates.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % certificates.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + certificates.length) % certificates.length
    );
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const openModal = (cert) => {
    setSelectedCert(cert);
    setIsAutoPlaying(false);
  };

  const closeModal = () => {
    setSelectedCert(null);
    setIsAutoPlaying(true);
  };

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-40 h-40 bg-blue-200/20 dark:bg-blue-800/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 left-20 w-32 h-32 bg-indigo-200/20 dark:bg-indigo-800/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-200/10 dark:bg-purple-800/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="mx-auto w-full px-6 sm:px-8 lg:px-12 xl:px-20 max-w-[1400px] relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 rounded-full text-amber-700 dark:text-amber-400 text-sm font-medium mb-4 shadow-sm border border-amber-200/50 dark:border-amber-700/50">
            <Award className="w-4 h-4" />
            Professional Certifications
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F2C59] dark:text-white mb-3">
            Instructor Credentials
          </h2>
          <p className="text-lg text-[#64748B] dark:text-gray-400 max-w-2xl mx-auto">
            Our instructor holds prestigious certifications from globally
            recognized institutions, ensuring you receive world-class education
            and guidance.
          </p>
        </div>

        {/* Main Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Carousel Container */}
          <div className="relative h-96 sm:h-[500px] overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-800 dark:to-slate-700">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center p-4"
              >
                <div className="relative h-full w-full group flex items-center justify-center">
                  {/* Certificate Image */}
                  <img
                    src={certificates[currentIndex].image}
                    alt={certificates[currentIndex].title}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      width: "auto",
                      height: "auto",
                    }}
                  />

                  {/* Overlay with Certificate Info */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-yellow-300">
                          {certificates[currentIndex].year}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        {certificates[currentIndex].title}
                      </h3>
                      <p className="text-blue-200 text-sm mb-3">
                        {certificates[currentIndex].issuer}
                      </p>
                      <p className="text-gray-200 text-sm">
                        {certificates[currentIndex].description}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => openModal(certificates[currentIndex])}
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200 mr-2"
                    >
                      <Eye className="w-5 h-5 text-white" />
                    </button>
                    <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200">
                      <Download className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200 group"
            >
              <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200 group"
            >
              <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {certificates.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? "bg-blue-600 scale-125"
                    : "bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500"
                }`}
              />
            ))}
          </div>

          {/* Certificate Counter */}
          <div className="text-center mt-4">
            <span className="text-sm text-[#64748B] dark:text-gray-400">
              {currentIndex + 1} of {certificates.length}
            </span>
          </div>
        </div>

        {/* Certificate Grid Preview */}
        <div className="mt-16">
          <h3 className="text-xl font-semibold text-[#0F2C59] dark:text-white text-center mb-8">
            All Certifications
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="relative group cursor-pointer"
                onClick={() => goToSlide(index)}
              >
                <div
                  className={`relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-800 dark:to-slate-700 ${
                    index === currentIndex
                      ? "ring-4 ring-blue-500 ring-offset-2"
                      : "hover:shadow-xl"
                  }`}
                >
                  <div className="h-24 sm:h-32 flex items-center justify-center p-2">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        width: "auto",
                        height: "auto",
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-white text-xs font-medium truncate">
                        {cert.title}
                      </p>
                    </div>
                  </div>
                </div>
                {index === currentIndex && (
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
            <Award className="w-5 h-5" />
            <span>Learn from Certified Experts</span>
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-800 dark:to-slate-700 p-4 flex items-center justify-center">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-lg"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "70vh",
                    width: "auto",
                    height: "auto",
                  }}
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {selectedCert.year}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-[#0F2C59] dark:text-white mb-2">
                  {selectedCert.title}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                  {selectedCert.issuer}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {selectedCert.description}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CertificateCarousel;
