import React from "react";
import StudentHeader from "../../components/user/header-footer/StudentHeader";
import StudentFooter from "../../components/user/header-footer/StudentFooter";
import SupportHero from "../../components/user/support/SupportHero";
import SupportContacts from "../../components/user/support/SupportContacts";
import SupportGuide from "../../components/user/support/SupportGuide";
import SupportEnrollment from "../../components/user/support/SupportEnrollment";
import SupportFAQ from "../../components/user/support/SupportFAQ";
import SupportTerms from "../../components/user/support/SupportTerms";

const Support = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-950">
      <StudentHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <SupportHero />
        <SupportContacts />
        <SupportGuide />
        <SupportEnrollment />
        <SupportFAQ />
        <SupportTerms />
      </main>
      <StudentFooter />
    </div>
  );
};

export default Support;
