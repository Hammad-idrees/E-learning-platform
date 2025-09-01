import React, { useCallback, useEffect, useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Ayesha Khan",
    location: "Lahore, Pakistan",
    review:
      "AfaqNama transformed my ACCA prep. The lessons are clear and structured. The interactive approach made complex topics easy to understand.",
    rating: 5,
    avatar: "AK",
  },
  {
    id: 2,
    name: "Omar Farooq",
    location: "Karachi, Pakistan",
    review:
      "Great content and pacing. The practice flow and guidance made a real difference for me. I passed my exam on the first attempt!",
    rating: 4,
    avatar: "OF",
  },
  {
    id: 3,
    name: "Zainab Ali",
    location: "Islamabad, Pakistan",
    review:
      "Loved the quality of videos and notes. Everything felt premium and focused on exam success. The support team was incredibly helpful.",
    rating: 5,
    avatar: "ZA",
  },
  {
    id: 4,
    name: "Syed Muhammad Bilal",
    location: "Rawalpindi, Pakistan",
    review:
      "Made it interactive and smooth to study. The flow kept me consistent every week! The progress tracking feature is amazing.",
    rating: 5,
    avatar: "SMB",
  },
  {
    id: 5,
    name: "Hiba Raza",
    location: "Peshawar, Pakistan",
    review:
      "Clear explanations, practical tips, and great support. I finally felt confident for the exam. The mock tests were particularly helpful.",
    rating: 5,
    avatar: "HR",
  },
  {
    id: 6,
    name: "Ali Haider",
    location: "Multan, Pakistan",
    review:
      "Solid structure and easy-to-follow videos. The platform is stable and fast. Great value for money with excellent teaching quality.",
    rating: 4,
    avatar: "AH",
  },
];

const StarRating = ({ rating }) => {
  return (
    <div
      className="flex items-center gap-0.5 sm:gap-1"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 sm:w-4 sm:h-4 ${
            i < rating
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300 dark:text-gray-600"
          }`}
        />
      ))}
    </div>
  );
};

const HomeSuccessStories = () => {
  const [index, setIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const trackRef = useRef(null);
  const touchStartX = useRef(null);
  const touchDeltaX = useRef(0);
  const autoPlayRef = useRef(null);

  const goTo = useCallback((i) => {
    const nextIndex = (i + reviews.length) % reviews.length;
    setIndex(nextIndex);
  }, []);

  const next = useCallback(() => {
    setIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  }, []);

  const prev = useCallback(() => {
    setIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    autoPlayRef.current = setInterval(() => {
      next();
    }, 5000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [next, isAutoPlaying]);

  // Touch/Swipe handlers
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    setIsAutoPlaying(false);
  };

  const onTouchMove = (e) => {
    if (touchStartX.current == null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const onTouchEnd = () => {
    if (touchStartX.current == null) return;
    const threshold = 50;
    if (touchDeltaX.current > threshold) {
      prev();
    } else if (touchDeltaX.current < -threshold) {
      next();
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  // Keyboard accessibility
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") {
        prev();
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 3000);
      }
      if (e.key === "ArrowRight") {
        next();
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 3000);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 max-w-[1400px]">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
            Success Stories
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4 px-4">
            What Our{" "}
            <span className="text-blue-600 dark:text-blue-400">Learners</span>{" "}
            Say
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto px-4">
            Join thousands of successful ACCA students who transformed their
            careers with AfaqNama
          </p>
        </div>

        {/* Reviews Carousel */}
        <div
          className="relative max-w-6xl mx-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="overflow-hidden rounded-xl sm:rounded-2xl"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              ref={trackRef}
              className="flex transition-all duration-700 ease-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {reviews.map((review, i) => (
                <div
                  key={review.id}
                  className="min-w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20"
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div
                    className={`relative bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-xl border border-slate-200 dark:border-slate-700 transition-all duration-500 min-h-[280px] sm:min-h-[300px] md:min-h-[320px] ${
                      hoveredCard === i
                        ? "shadow-2xl scale-[1.01] sm:scale-[1.02] border-blue-300 dark:border-blue-600"
                        : ""
                    }`}
                  >
                    {/* Quote Icon */}
                    <div className="absolute top-4 right-4 sm:top-6 sm:right-6 md:right-8 text-blue-200 dark:text-blue-800">
                      <Quote className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 fill-current opacity-50" />
                    </div>

                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
                      <div className="flex items-center gap-3 sm:gap-4">
                        {/* Avatar */}
                        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm sm:text-base md:text-lg shadow-lg flex-shrink-0">
                          {review.avatar}
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white truncate">
                            {review.name}
                          </h3>
                          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm truncate">
                            {review.location}
                          </p>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-start sm:items-end gap-2 sm:gap-2 self-start">
                        <StarRating rating={review.rating} />
                        <div className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">
                          #{review.id}
                        </div>
                      </div>
                    </div>

                    {/* Review Text */}
                    <blockquote className="text-sm sm:text-base md:text-lg leading-relaxed text-slate-700 dark:text-slate-300 relative z-10">
                      {review.review}
                    </blockquote>

                    {/* Decorative Elements */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-b-xl sm:rounded-b-2xl"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              type="button"
              onClick={() => {
                prev();
                setIsAutoPlaying(false);
                setTimeout(() => setIsAutoPlaying(true), 3000);
              }}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 
             w-10 h-10 sm:w-12 sm:h-12 
             rounded-full bg-white/20 dark:bg-slate-800/20 
             hover:bg-white/30 dark:hover:bg-slate-800/30 
             border border-slate-200/30 dark:border-slate-700/30 
             shadow-md hover:shadow-xl 
             transition-all duration-300 
             flex items-center justify-center group 
             backdrop-blur-md"
              aria-label="Previous review"
            >
              <ChevronLeft
                className="w-5 h-5 sm:w-6 sm:h-6 
                          text-slate-700 dark:text-slate-300 
                          group-hover:text-blue-600 dark:group-hover:text-blue-400 
                          transition-colors"
              />
            </button>

            <button
              type="button"
              onClick={() => {
                next();
                setIsAutoPlaying(false);
                setTimeout(() => setIsAutoPlaying(true), 3000);
              }}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 dark:bg-slate-800/95 hover:bg-white dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center group backdrop-blur-sm"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
            {reviews.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  goTo(i);
                  setIsAutoPlaying(false);
                  setTimeout(() => setIsAutoPlaying(true), 3000);
                }}
                className={`transition-all duration-300 rounded-full ${
                  i === index
                    ? "w-6 h-2.5 sm:w-8 sm:h-3 bg-gradient-to-r from-blue-600 to-purple-600 shadow-md"
                    : "w-2.5 h-2.5 sm:w-3 sm:h-3 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500"
                }`}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>

          {/* Auto-play indicator */}
          <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
            <div
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                isAutoPlaying ? "bg-green-500 animate-pulse" : "bg-gray-400"
              }`}
            ></div>
            <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {isAutoPlaying ? "Auto-playing" : "Paused"}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mt-12 sm:mt-14 md:mt-16 max-w-4xl mx-auto px-2">
          <div className="text-center p-4 sm:p-5 md:p-6 bg-white dark:bg-slate-800 rounded-lg sm:rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1 sm:mb-2">
              1000+
            </div>
            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Happy Students
            </div>
          </div>
          <div className="text-center p-4 sm:p-5 md:p-6 bg-white dark:bg-slate-800 rounded-lg sm:rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400 mb-1 sm:mb-2">
              95%
            </div>
            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Pass Rate
            </div>
          </div>
          <div className="text-center p-4 sm:p-5 md:p-6 bg-white dark:bg-slate-800 rounded-lg sm:rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1 sm:mb-2">
              4.8
            </div>
            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Average Rating
            </div>
          </div>
          <div className="text-center p-4 sm:p-5 md:p-6 bg-white dark:bg-slate-800 rounded-lg sm:rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="text-2xl sm:text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1 sm:mb-2">
              24/7
            </div>
            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Support
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSuccessStories;
