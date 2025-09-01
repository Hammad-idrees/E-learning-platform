import React from "react";

const ContactItem = ({ title, children, icon, href }) => (
  <a
    href={href}
    className="group flex items-start gap-4 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-md transition-shadow"
  >
    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-[#2563EB] dark:text-blue-300 flex items-center justify-center">
      {icon}
    </div>
    <div>
      <p className="text-sm text-[#64748B] dark:text-gray-400">{title}</p>
      <div className="text-[#0F2C59] dark:text-gray-100 font-semibold group-hover:text-[#2563EB] dark:group-hover:text-blue-300">
        {children}
      </div>
    </div>
  </a>
);

const SupportContacts = () => {
  return (
    <section id="contact" className="space-y-4">
      <h2 className="text-xl font-semibold text-[#0F2C59] dark:text-blue-300">
        Contact Information
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <ContactItem
          title="Admin Email"
          href="mailto:admin@example.com"
          icon={
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          }
        >
          admin@example.com
        </ContactItem>

        <ContactItem
          title="Support Phone"
          href="tel:+1234567890"
          icon={
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 5a2 2 0 012-2h3.28a2 2 0 011.95 1.4l.57 1.7a2 2 0 01-.45 2.06l-1.2 1.2a16 16 0 006.36 6.36l1.2-1.2a2 2 0 012.06-.45l1.7.57A2 2 0 0121 17.72V21a2 2 0 01-2 2h-1C9.82 23 1 14.18 1 4V3a2 2 0 012-2h2z"
              />
            </svg>
          }
        >
          +1 (234) 567-890
        </ContactItem>

        <ContactItem
          title="Developer Email"
          href="mailto:techenlighten454@gmail.com"
          icon={
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 18l6-6-6-6M8 6l-6 6 6 6"
              />
            </svg>
          }
        >
          techenlighten454@gmail.com
        </ContactItem>
      </div>
    </section>
  );
};

export default SupportContacts;
