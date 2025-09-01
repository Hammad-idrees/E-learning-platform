import React from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const content = {
  title: "Master ACCA with Professional Video Learning",
  desc: "Gain access to comprehensive Chartered Accountancy courses designed and delivered by experienced professionals. Our structured learning approach, combined with engaging video lessons, equips you with the knowledge, confidence, and exam strategies needed to pass your ACCA exams and accelerate your career in finance and accounting.",
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.8 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60 } },
};

const colors = ["#2563EB", "#9333EA", "#3B82F6", "#0EA5E9"]; // color cycle

const HomeHero = () => {
  const { user } = useAuth();
  const userName = user?.firstName || user?.name || "Student";

  // Split "Welcome back" into characters
  const welcomeText = "Welcome back, ";
  const welcomeChars = welcomeText.split(" ");

  return (
    <section className="py-8 sm:py-12 lg:py-16 xl:py-20 relative overflow-hidden">
      {/* Floating background circles */}
      <motion.div
        className="absolute w-40 h-40 bg-sky-400/20 rounded-full top-[60%] left-[10%] blur-3xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-60 h-60 bg-sky-400/20 rounded-full top-[65%] right-[5%] blur-3xl"
        animate={{ y: [0, 25, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-20 max-w-[1400px] relative z-10">
        <motion.div
          className="text-center lg:text-left"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Wave + Greeting */}
          <motion.div
            className="flex items-center gap-2 sm:gap-3 justify-center lg:justify-start"
            variants={item}
          >
            <motion.span
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-4xl origin-bottom-right"
              animate={{ rotate: [0, 20, -10, 20, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              👋
            </motion.span>
            <motion.h1
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight text-[#0F2C59] dark:text-white flex flex-wrap"
              variants={item}
            >
              {welcomeText.split("").map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  animate={{ color: colors[i % colors.length] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    delay: i * 0.1,
                  }}
                >
                  {char === " " ? "\u00A0" : char}{" "}
                  {/* non-breaking space for spacing */}
                </motion.span>
              ))}
              <motion.span
                className="ml-1 text-[#2563EB] dark:text-blue-400"
                animate={{ color: ["#2563EB", "#9333EA", "#2563EB"] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                {userName}!
              </motion.span>
            </motion.h1>
          </motion.div>

          {/* Headline */}
          <motion.p
            className="mt-3 sm:mt-4 lg:mt-5 text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold text-[#1E293B] dark:text-gray-200 leading-snug lg:leading-tight"
            variants={item}
          >
            {content.title}
          </motion.p>

          {/* Subtext */}
          <motion.p
            className="mt-3 sm:mt-4 lg:mt-4 text-sm sm:text-base lg:text-lg xl:text-xl text-[#475569] dark:text-gray-300 max-w-4xl lg:max-w-5xl mx-auto lg:mx-0 leading-6 sm:leading-7 lg:leading-8 xl:leading-9"
            variants={item}
          >
            {content.desc}
          </motion.p>

          {/* Explore Courses Button */}
          <motion.div
            className="mt-6 sm:mt-7 lg:mt-8 flex justify-center lg:justify-start"
            variants={item}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/courses"
                className="inline-flex items-center px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-[#2563EB] text-white text-sm sm:text-base font-semibold shadow-sm"
              >
                Explore Courses
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeHero;
