import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle } from "lucide-react";

const AdBlockerNotice = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(100);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    // Show notice after 0.5 seconds
    const showTimer = setTimeout(() => {
      setIsVisible(true);

      // Start 10-second countdown
      const startTime = Date.now();
      const duration = 10000; // 10 seconds

      const progressTimer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, duration - elapsed);
        setProgress((remaining / duration) * 100);

        if (remaining === 0) {
          clearInterval(progressTimer);
          setIsVisible(false);
        }
      }, 50); // Update every 50ms for smooth animation

      setTimer(progressTimer);

      // Auto-hide after 10 seconds
      setTimeout(() => {
        setIsVisible(false);
        clearInterval(progressTimer);
      }, duration);
    }, 500); // Show after 0.5 seconds

    return () => {
      clearTimeout(showTimer);
      if (timer) clearInterval(timer);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    if (timer) clearInterval(timer);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{
            x: window.innerWidth > 768 ? 400 : 0,
            y: window.innerWidth > 768 ? 0 : 100,
            opacity: 0,
          }}
          animate={{
            x: 0,
            y: 0,
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 100,
              damping: 15,
            },
          }}
          exit={{
            x: window.innerWidth > 768 ? 400 : 0,
            y: window.innerWidth > 768 ? 0 : 100,
            opacity: 0,
            transition: {
              duration: 0.3,
              ease: "easeIn",
            },
          }}
          className="fixed top-16 sm:top-20 right-0 z-50 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-sm px-4 sm:px-0"
        >
          <div className="relative bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg sm:rounded-l-lg shadow-xl overflow-hidden">
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-700">
              <motion.div
                className="h-full bg-white"
                initial={{ width: "100%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Content */}
            <div className="p-3 sm:p-4 pl-8 sm:pl-8">
              <div className="flex items-start gap-2 sm:gap-3">
                {/* Pulsing Indicator */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="flex-shrink-0"
                >
                  <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" />
                </motion.div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs sm:text-sm font-semibold">
                      Notice
                    </span>
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-300 rounded-full"
                    />
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed">
                    For the best experience on our website, please disable any
                    ad blockers. Some content or features may not display
                    correctly if ad blockers are enabled.
                  </p>
                </div>
              </div>
            </div>

            {/* Close Button - Responsive positioning */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClose}
              className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2 p-1 rounded-full hover:bg-blue-400/30 transition-colors"
            >
              <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdBlockerNotice;
