import React from "react";
import StudentHeader from "../../components/user/header-footer/StudentHeader";
import StudentFooter from "../../components/user/header-footer/StudentFooter";
import AboutHero from "../../components/user/about/AboutHero";
import AboutCTA from "../../components/user/about/AboutCTA";
import InstructorMessage from "@/components/user/about/InstructorMessage";
import CertificateCarousel from "@/components/user/about/CertificateCarousel";
import InstructorExperience from "@/components/user/about/InstructorExperience";

const About = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <StudentHeader />
      <main>
        <AboutHero />
        <InstructorMessage />
        <InstructorExperience />
        <CertificateCarousel />
        <AboutCTA />
      </main>
      <StudentFooter />
    </div>
  );
};

export default About;
