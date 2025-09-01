import React, { useEffect, useRef, useState } from "react";
import {
  GraduationCap,
  BookOpen,
  Video,
  Globe,
  Trophy,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { TypeAnimation } from "react-type-animation";

const features = [
  {
    icon: <GraduationCap className="text-white" />,
    title: "Expert-Led Learning",
    desc: "Courses designed and delivered by qualified ACCA professionals with industry experience.",
    color: "from-[#2563EB] to-[#0F2C59]",
    stats: "20+ Expert Instructors",
    delay: 0,
  },
  {
    icon: <BookOpen className="text-white" />,
    title: "Comprehensive Coverage",
    desc: "Structured lessons that cover the entire ACCA syllabus in detail with interactive content.",
    color: "from-[#22C55E] to-[#16A34A]",
    stats: "100% Syllabus Coverage",
    delay: 100,
  },
  {
    icon: <Video className="text-white" />,
    title: "High-Quality Video Lectures",
    desc: "Engaging, easy-to-follow content tailored for exam success with HD video quality.",
    color: "from-[#0EA5E9] to-[#2563EB]",
    stats: "HD Videos",
    delay: 200,
  },
  {
    icon: <Globe className="text-white" />,
    title: "Anytime, Anywhere Access",
    desc: "Study at your own pace with 24/7 access across all devices and offline downloads.",
    color: "from-[#8B5CF6] to-[#2563EB]",
    stats: "24/7 Availability",
    delay: 300,
  },
  {
    icon: <Trophy className="text-white" />,
    title: "Proven Results",
    desc: "AfaqNama students consistently achieve high pass rates and career success worldwide.",
    color: "from-[#F59E0B] to-[#EF4444]",
    stats: "95% Pass Rate",
    delay: 400,
  },
];

const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsIntersecting(true);
          setHasAnimated(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
        ...options,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasAnimated, options]);

  return [ref, isIntersecting];
};

const FeatureCard = ({ feature }) => {
  const [cardRef, isVisible] = useIntersectionObserver();

  return (
    <div
      ref={cardRef}
      className={`group relative overflow-hidden rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white dark:bg-gray-900 p-6 shadow-lg hover:shadow-2xl transition-all duration-700 transform backdrop-blur-sm ${
        isVisible
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-8 opacity-0 scale-95"
      }`}
      style={{
        transitionDelay: isVisible ? `${feature.delay}ms` : "0ms",
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-200/20 to-transparent dark:from-blue-800/20 rounded-full transform translate-x-16 -translate-y-16"></div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5 rounded-2xl`}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Icon with Animation */}
        <div className="flex items-start justify-between mb-4">
          <div
            className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
          >
            <div className="w-6 h-6">{feature.icon}</div>

            {/* Sparkle effect on hover */}
            <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
            </div>
          </div>

          {/* Stats Badge */}
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
            <div className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full border border-blue-200/50 dark:border-blue-700/50">
              <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
                {feature.stats}
              </span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-[#1E293B] dark:text-gray-100 mb-3 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors duration-300">
          {feature.title}
        </h3>

        {/* Description */}
        <p className="text-[#64748B] dark:text-gray-300 leading-relaxed mb-4 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
          {feature.desc}
        </p>

        {/* Check mark with animation */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 -translate-x-4">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span className="text-sm font-medium text-green-600 dark:text-green-400">
            Proven & Trusted
          </span>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl`}
      ></div>
    </div>
  );
};

const HomeFeatures = () => {
  const [titleRef, titleVisible] = useIntersectionObserver();
  const [statsRef, statsVisible] = useIntersectionObserver();

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-slate-50/50 via-white to-blue-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/20 dark:bg-blue-800/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/20 dark:bg-purple-800/10 rounded-full blur-3xl"></div>
      </div>

      <div className="mx-auto w-full px-6 sm:px-8 lg:px-12 xl:px-20 max-w-[1400px] relative z-10">
        {/* Header */}
        <div
          ref={titleRef}
          className={`text-center mb-12 transition-all duration-1000 transform ${
            titleVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-6 shadow-sm border border-blue-200/50 dark:border-blue-700/50">
            <GraduationCap className="w-4 h-4" />
            Why Choose Us
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F2C59] dark:text-white mb-4 leading-tight">
            <TypeAnimation
              sequence={[
                "Everything You Need for",
                2000,
                "Professional Excellence",
                2000,
                "Career Advancement",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              <TypeAnimation
                sequence={[
                  "ACCA Success",
                  2000,
                  "Exam Mastery",
                  2000,
                  "Industry Leadership",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </span>
          </h2>

          <p className="text-lg text-[#64748B] dark:text-gray-300 max-w-2xl mx-auto">
            <TypeAnimation
              sequence={[
                "Join thousands of successful students who chose AfaqNama for their ACCA journey",
                3000,
                "Expert-led learning designed to accelerate your professional growth",
                3000,
                "Structured paths that guide you from concept to certification",
                3000,
              ]}
              wrapper="span"
              speed={40}
              repeat={Infinity}
            />
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* Stats Section */}
        <div
          ref={statsRef}
          className={`bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-gray-200/50 dark:border-slate-700/50 transition-all duration-1000 transform ${
            statsVisible
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-8 opacity-0 scale-95"
          }`}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-[#0F2C59] dark:text-white mb-2">
              Trusted by Students Worldwide
            </h3>
            <p className="text-[#64748B] dark:text-gray-300">
              Our numbers speak for our commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: "1000+", label: "Students Enrolled" },
              { number: "95%", label: "Pass Rate" },
              { number: "Full", label: "Video Lectures" },
              { number: "24/7", label: "Support Available" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className={`text-center transition-all duration-700 transform ${
                  statsVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
                style={{
                  transitionDelay: statsVisible
                    ? `${index * 100 + 500}ms`
                    : "0ms",
                }}
              >
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-[#64748B] dark:text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeFeatures;
