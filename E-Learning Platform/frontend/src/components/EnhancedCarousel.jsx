import { useState, useEffect } from "react";
import {
  Users,
  Play,
  Star,
  Award,
  BookOpen,
  Calculator,
  GraduationCap,
  TrendingUp,
} from "lucide-react";
import manPic from "../assets/images/man_pic.jpg";
const carouselData = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop&crop=center",
    category: "ACCA Fundamentals",
    title: "Master Financial Accounting",
    viewers: "William Reed",
    badge: "LIVE",
    badgeColor: "bg-red-500",
    quote: "Mastering ACCA starts with a single step.",
    description:
      "The best accountants are not just number-crunchers; they’re financial storytellers.",
  },
  {
    id: 2,
    image:
      "https://t4.ftcdn.net/jpg/10/26/44/71/240_F_1026447163_PDuy8vptL5LHLqtNrAluuMQE5AYkuPZk.jpg",
    category: "Strategic Professional",
    title: "Corporate and Business Law",
    viewers: "Jessica Turner",
    badge: "Expert Level",
    badgeColor: "bg-purple-500",
    quote:
      "In the world of finance, the best accounting is like poetry—precise and timeless.",
    description:
      "Advanced techniques for financial analysis and strategic decision making",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=1200&h=800&fit=crop&q=80",
    category: "Leadership & Collaboration",
    title: "Business Analysis & Valuation",
    viewers: "Jennifer Lewis",
    badge: "Interactive",
    badgeColor: "bg-blue-500",
    quote:
      "Accounting students are the navigators in the vast sea of financial knowledge.",
    description: "Comprehensive business analysis and valuation methodologies",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center",
    category: "Applied Skills",
    title: "Strategic Business Reporting",
    viewers: "Melissa Davis",
    badge: "Updated",
    badgeColor: "bg-emerald-500",
    quote: "Accounting is the language of business.",
    description:
      "Learn to evaluate and communicate complex financial reporting issues using real-world scenarios.",
  },
  {
    id: 5,
    image:
      "https://t4.ftcdn.net/jpg/06/10/04/81/240_F_610048165_98IMPb1ylMnzQUpFv0WQAdzuDSL5geGC.jpg",
    category: "Core Competencies",
    title: "Advanced Audit and Assurance",
    viewers: "Christopher Miller",
    badge: "Updated 2024",
    badgeColor: "bg-indigo-500",
    quote:
      "In the world of finance, students are the pioneers of numerical literacy.",
    description:
      "Develop expertise in audit and assurance engagements for large entities, with an emphasis on risk and ethics.",
  },
  {
    id: 6,
    image:
      "https://t4.ftcdn.net/jpg/09/50/33/59/240_F_950335964_odS3lJL32UdnqFDkIAloZxZfabDUGs8f.jpg",
    category: "Core Competencies",
    title: "Advanced Taxation",
    viewers: "Sam Levenson",
    badge: "Latest Syllabus",
    badgeColor: "bg-pink-500",
    quote: "Don't watch the clock; do what it does. Keep going.",
    description:
      "Master complex tax planning, compliance, and advisory strategies for multinational corporations.",
  },
];

export function EnhancedCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselData.length);
    }, 7000); // Auto-rotate every 7 seconds

    return () => clearInterval(interval);
  }, []);

  const currentSlide = carouselData[currentIndex];

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Background Images with Enhanced Transitions */}
      <div className="absolute inset-0">
        {carouselData.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-2000 ease-in-out ${
              idx === currentIndex
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover transition-transform duration-[8000ms] ease-linear hover:scale-110"
            />
          </div>
        ))}
        {/* Professional Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/85 via-slate-900/70 to-indigo-900/90" />

        {/* Animated Floating Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 animate-float delay-0">
            <div className="rounded-full bg-emerald-400/20 p-3 backdrop-blur-sm">
              <Award className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="absolute top-3/4 right-1/4 animate-float delay-1000">
            <div className="rounded-full bg-blue-400/20 p-2 backdrop-blur-sm">
              <Star className="h-4 w-4 text-white" />
            </div>
          </div>
          <div className="absolute top-1/2 left-3/4 animate-float delay-2000">
            <div className="rounded-full bg-purple-400/20 p-4 backdrop-blur-sm">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex h-full flex-col justify-between p-8 lg:p-12">
        {/* Top Section - Enhanced Branding */}
        <div
          className={`flex items-start justify-between transform transition-all duration-1500 delay-300 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="rounded-full bg-emerald-400/30 p-1 backdrop-blur-sm">
              <img
                src={manPic}
                alt="Profile"
                className="h-12 w-12 object-cover rounded-full border-none"
                draggable={false}
              />
            </div>

            <div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent drop-shadow-lg">
                AfaqNama
              </h1>
              <p className="text-base text-blue-100 font-semibold tracking-wide">
                Your trusted guide to ACCA success
              </p>
            </div>
          </div>

          <div
            className={`inline-flex items-center gap-3 rounded-2xl ${currentSlide.badgeColor} px-6 py-3 text-white shadow-xl backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-105`}
          >
            <div className="h-2.5 w-2.5 rounded-full bg-white animate-pulse shadow-sm" />
            <span className="text-sm font-bold tracking-wide">
              {currentSlide.badge}
            </span>
          </div>
        </div>

        {/* Center Section - Enhanced Quote Card */}
        <div
          className={`flex items-center justify-center px-4 transform transition-all duration-1500 delay-500 ${
            isLoaded
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-16 opacity-0 scale-90"
          }`}
        >
          <div className="max-w-2xl rounded-3xl bg-white/15 p-8 lg:p-10 backdrop-blur-xl border border-white/30 shadow-2xl hover:bg-white/20 transition-all duration-500 group">
            <div className="flex items-start gap-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#10B981] to-[#059669] shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                <BookOpen className="h-7 w-7 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xl lg:text-2xl text-white font-bold leading-relaxed mb-4 italic">
                  "{currentSlide.quote}"
                </p>
                <p className="text-blue-100 text-base mb-6 leading-relaxed">
                  {currentSlide.description}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                    <Users size={16} className="text-blue-200" />
                    <span className="text-blue-200 font-medium">
                      {currentSlide.viewers}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                    <TrendingUp size={16} className="text-emerald-300" />
                    <span className="text-emerald-300 font-medium">
                      Growing fast ↑
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Course Info and Actions */}
        <div
          className={`space-y-6 transform transition-all duration-1500 delay-700 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="space-y-4">
            <div className="inline-block rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] px-6 py-3 text-sm font-bold text-white shadow-xl border border-blue-400/30">
              {currentSlide.category}
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight drop-shadow-lg">
              {currentSlide.title}
            </h2>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="flex items-center gap-4 flex-wrap">
            <button className="flex items-center gap-3 rounded-2xl bg-white/20 px-8 py-4 text-white font-semibold backdrop-blur-sm transition-all duration-300 hover:bg-white/30 hover:scale-105 shadow-xl border border-white/30 group">
              <Play
                size={20}
                className="transition-transform group-hover:scale-110"
              />
              <span>Preview Courses</span>
            </button>
            <button className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#10B981] to-[#059669] px-8 py-4 text-white font-semibold transition-all duration-300 hover:from-[#059669] hover:to-[#047857] hover:scale-105 shadow-xl group">
              <Calculator
                size={20}
                className="transition-transform group-hover:scale-110"
              />
              <span>Start Learning</span>
            </button>
          </div>

          {/* Enhanced Carousel Indicators */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex gap-3">
              {carouselData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`rounded-full transition-all duration-500 hover:scale-125 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                    index === currentIndex
                      ? "h-3 w-12 bg-white shadow-lg"
                      : "h-3 w-3 bg-white/50 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
            <div className="text-white/70 text-sm font-medium bg-black/20 rounded-full px-4 py-2 backdrop-blur-sm">
              {currentIndex + 1} / {carouselData.length} • Auto-rotates every 7s
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add custom CSS for floating animation
const style = document.createElement("style");
style.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    25% { transform: translateY(-10px) rotate(2deg); }
    50% { transform: translateY(-5px) rotate(-1deg); }
    75% { transform: translateY(-15px) rotate(1deg); }
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
`;
document.head.appendChild(style);
