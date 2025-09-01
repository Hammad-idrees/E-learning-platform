import React from "react";
import StudentHeader from "../../components/user/header-footer/StudentHeader";
import StudentFooter from "../../components/user/header-footer/StudentFooter";
import HomeHero from "../../components/user/home/HomeHero";
import HomeFeatures from "../../components/user/home/HomeFeatures";
import HomeBanners from "../../components/user/home/HomeBanners";
import HomeOfferedCourses from "../../components/user/home/HomeOfferedCourses";
import HomeStats from "../../components/user/home/HomeStats";

import HomeAboutAfaqNama from "../../components/user/home/HomeAboutAfaqNama";
import AdBlockerNotice from "@/components/user/home/AdBlockerNotice";
import ResultsGrid from "@/components/user/home/ResultsGrid";

const Home = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Ad Blocker Notice */}
      <AdBlockerNotice />
      <StudentHeader />
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-6 sm:py-8 lg:py-10">
        <HomeHero />
        <HomeFeatures />
        <HomeBanners />
        <HomeOfferedCourses />
        <HomeStats />
        <ResultsGrid />
        <HomeAboutAfaqNama />
      </main>
      <StudentFooter />
    </div>
  );
};

export default Home;
