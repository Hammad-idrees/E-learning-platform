import React from "react";

const InfoCard = ({ title, items }) => (
  <div className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
    <h4 className="text-[#0F2C59] dark:text-gray-100 font-semibold mb-2">
      {title}
    </h4>
    <ul className="list-disc pl-5 space-y-1 text-sm text-[#64748B] dark:text-gray-400">
      {items.map((it, idx) => (
        <li key={idx}>{it}</li>
      ))}
    </ul>
  </div>
);

const SupportEnrollment = () => {
  return (
    <section id="enrollment" className="space-y-4">
      <h2 className="text-xl font-semibold text-[#0F2C59] dark:text-blue-300">
        Enrollment Information
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <InfoCard
          title="Statuses"
          items={[
            "Pending: awaiting admin review",
            "Approved: access granted",
            "Rejected: reason sent in notifications",
          ]}
        />
        <InfoCard
          title="Processing time"
          items={[
            "Reviews typically within 24-48 hours",
            "Peak times may take longer",
          ]}
        />
        <InfoCard
          title="Tips"
          items={[
            "Ensure your profile details are accurate",
            "Watch email/notifications for updates",
          ]}
        />
      </div>
    </section>
  );
};

export default SupportEnrollment;
