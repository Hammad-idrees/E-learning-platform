import React, { useEffect, useMemo, useState, useCallback } from "react";

const resolveUrl = (relativeUrl) => {
  const base = (import.meta.env.VITE_API_BASE_URL || "").replace(
    /\/?api\/?$/,
    ""
  );
  if (!relativeUrl) return "";
  if (/^https?:\/\//i.test(relativeUrl)) return relativeUrl;
  return `${base}${
    relativeUrl.startsWith("/") ? relativeUrl : "/" + relativeUrl
  }`;
};

const BannerCarousel = ({
  items = [],
  heightClass = "h-96",
  widthClass = "max-w-5xl mx-auto",
  fit = "cover",
}) => {
  const [index, setIndex] = useState(0);
  const [showCaption, setShowCaption] = useState(true);
  const slides = useMemo(() => items.filter(Boolean), [items]);

  const next = useCallback(
    () => setIndex((i) => (i + 1) % Math.max(1, slides.length)),
    [slides.length]
  );
  const prev = () =>
    setIndex(
      (i) => (i - 1 + Math.max(1, slides.length)) % Math.max(1, slides.length)
    );

  useEffect(() => {
    if (slides.length === 0) {
      setIndex(0);
    } else if (index > slides.length - 1) {
      setIndex(slides.length - 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length]);

  // 🔥 Auto-change image every 4 seconds
  useEffect(() => {
    if (slides.length > 1) {
      const interval = setInterval(next, 4000);
      return () => clearInterval(interval);
    }
  }, [next, slides.length]); // runs again if slides change

  if (!slides.length) {
    return (
      <div
        className={`w-full ${widthClass} ${heightClass} bg-gray-50 flex items-center justify-center rounded border`}
      >
        <div className="text-gray-400">No banners</div>
      </div>
    );
  }

  const safeIndex = Math.min(index, Math.max(0, slides.length - 1));
  const current = slides[safeIndex];
  const src = resolveUrl(current?.image?.url);

  return (
    <div className={`relative w-full ${widthClass} rounded overflow-hidden`}>
      {/* Main Banner Container */}
      <div
        className={`relative w-full ${heightClass} bg-white border rounded-t overflow-hidden`}
      >
        {src && (
          <img
            src={src}
            alt={current.caption || "Banner"}
            className={`w-full h-full ${
              fit === "cover" ? "object-cover" : "object-contain"
            }`}
          />
        )}

        {/* Controls */}
        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 z-10"
              aria-label="Previous"
            >
              <svg
                className="w-5 h-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 z-10"
              aria-label="Next"
            >
              <svg
                className="w-5 h-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === index
                      ? "bg-white w-6"
                      : "bg-white/60 hover:bg-white/80"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Caption Toggle Button */}
        {current.caption && (
          <button
            onClick={() => setShowCaption(!showCaption)}
            className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all duration-200 z-10"
            aria-label={showCaption ? "Hide caption" : "Show caption"}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Caption Section Below Banner */}
      {current.caption && (
        <div
          className={`bg-white dark:bg-gray-800 border border-t-0 rounded-b p-4 transition-all duration-300 ${
            showCaption
              ? "max-h-32 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden p-0"
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full">
                Caption
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                {current.caption}
              </p>
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  Slide {index + 1} of {slides.length}
                </span>
                {slides.length > 1 && (
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Auto-advancing
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerCarousel;
