import React, { useState } from "react";

const Section = ({ title, children }) => (
  <div className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
    <h4 className="text-[#0F2C59] dark:text-gray-100 font-semibold mb-2">
      {title}
    </h4>
    <div className="text-sm text-[#64748B] dark:text-gray-400 space-y-2">
      {children}
    </div>
  </div>
);

const SupportTerms = () => {
  const [accepted, setAccepted] = useState(false);
  return (
    <section id="terms" className="space-y-4">
      <h2 className="text-xl font-semibold text-[#0F2C59] dark:text-blue-300">
        Terms & Policies
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Section title="Terms of Service">
          <p>
            Use of this platform is subject to fair use and academic integrity.
            Access is personal and non-transferable.
          </p>
        </Section>
        <Section title="Privacy Policy">
          <p>
            We process your data to provide services. We do not sell your
            personal information. See full policy in your account.
          </p>
        </Section>
        <Section title="Refunds & Cancellations">
          <p>
            Refund eligibility depends on course access and time since approval.
            Contact support for assistance.
          </p>
        </Section>
      </div>
      <div className="flex items-center gap-3 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <input
          id="accept"
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          className="w-4 h-4"
        />
        <label
          htmlFor="accept"
          className="text-sm text-[#64748B] dark:text-gray-400"
        >
          I have read and understand the Terms & Policies
        </label>
      </div>
    </section>
  );
};

export default SupportTerms;
