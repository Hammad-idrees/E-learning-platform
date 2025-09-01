import dotenv from "dotenv";
dotenv.config(); // Load .env first
import nodemailer from "nodemailer";
import logger from "../utils/logger.js";
import User from "../models/User.model.js";

// Initialize email transporter

const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST,
  port: parseInt(process.env.BREVO_SMTP_PORT),
  secure: false, // STARTTLS
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_KEY,
  },
  // Optional: Add these for better reliability
  connectionTimeout: 60000, // 1 minute
  greetingTimeout: 30000, // 30 seconds
});

// Verify connection
transporter.verify((error) => {
  if (error) {
    logger.error("SMTP connection error:", error.message);
    logger.warn("Email service will be disabled due to connection issues");
  } else {
    logger.info("SMTP server is ready to send messages");
  }
});

// Email templates
const templates = {
  new_enrollment_request: (courseName, requester) => ({
    subject: `New Enrollment Request: ${courseName}`,
    text: `${requester} has requested access to "${courseName}". Review in admin dashboard.`,
    html: `
      <p><strong>${requester}</strong> has requested access to:</p>
      <h3>${courseName}</h3>
      <a href="${process.env.ADMIN_URL}/enrollments">Review Request</a>
    `,
  }),
  enrollment_approved: (courseName) => ({
    subject: `Enrollment Approved: ${courseName}`,
    text: `You've been approved for "${courseName}". Start learning now!`,
    html: `
      <p>Congratulations!</p>
      <p>You can now access <strong>${courseName}</strong>.</p>
      <a href="${process.env.APP_URL}/courses">Go to Dashboard</a>
    `,
  }),
  enrollment_rejected: (courseName, reason = "") => ({
    subject: `Enrollment Update: ${courseName}`,
    text: `Your request for "${courseName}" was declined. ${reason}`,
    html: `
      <p>Your enrollment for <strong>${courseName}</strong> was not approved.</p>
      ${reason && `<p>Reason: ${reason}</p>`}
    `,
  }),
  course_removal: (courseName) => ({
    subject: `Access Revoked: ${courseName}`,
    text: `You've been removed from "${courseName}" by the admin.`,
    html: `
      <p>Your access to <strong>${courseName}</strong> has been revoked.</p>
      <p>Contact support if this was a mistake.</p>
    `,
  }),
  new_course: (courseName) => ({
    subject: `New Course Available: ${courseName}`,
    text: `We've just launched "${courseName}". Enroll now!`,
    html: `
      <p>Check out our new course: <strong>${courseName}</strong>!</p>
      <a href="${process.env.APP_URL}/courses">Browse Courses</a>
    `,
  }),

  course_completed: (courseName) => ({
    subject: `🎉 Congratulations! You've completed ${courseName}`,
    text: `You've successfully finished "${courseName}". Download your certificate!`,
    html: `
      <h1>Course Completed!</h1>
      <p>Amazing work finishing <strong>${courseName}</strong>!</p>
      <a href="${process.env.APP_URL}/certificate">Download Certificate</a>
    `,
  }),
  profile_updated: () => ({
    subject: `Profile Update Confirmation`,
    text: "Your profile information was recently updated.",
    html: `
      <p>We noticed recent changes to your account.</p>
      <p>If this wasn't you, please <a href="${process.env.APP_URL}/support">contact support</a> immediately.</p>
    `,
  }),
  password_reset: (resetLink) => ({
    subject: `Password Reset Request`,
    text: `Use this link to reset your password: ${resetLink}`,
    html: `
      <p>Click below to reset your password (expires in 1 hour):</p>
      <a href="${resetLink}">Reset Password</a>
    `,
  }),
};

// Rate limiting tracker
const emailRateLimiter = {
  lastSent: {},
  canSend(userId, type) {
    const key = `${userId}_${type}`;
    const lastSentTime = this.lastSent[key] || 0;
    const cooldown = 24 * 60 * 60 * 1000; // 24 hours

    if (Date.now() - lastSentTime < cooldown) {
      return false;
    }

    this.lastSent[key] = Date.now();
    return true;
  },
};

export const sendEmail = async (userId, type, data = {}) => {
  try {
    // Check if email service is configured
    if (
      !process.env.BREVO_SMTP_HOST ||
      !process.env.BREVO_SMTP_USER ||
      !process.env.BREVO_SMTP_KEY
    ) {
      logger.warn("Email service not configured, skipping email send");
      return false;
    }

    // 1. Get user info
    const user = await User.findById(userId).select("email firstName");
    if (!user) {
      logger.error(`User ${userId} not found for email`);
      return false;
    }

    // 2. Rate limiting check
    if (!emailRateLimiter.canSend(userId, type)) {
      logger.warn(`Email rate limited for user ${userId} (${type})`);
      return false;
    }

    // 3. Prepare email
    const template = templates[type](
      data.courseName || data.resetLink,
      data.daysInactive
    );
    const html =
      template.html?.replace(/\${firstName}/g, user.firstName) || template.text;
    const text = template.text.replace(/\${firstName}/g, user.firstName);

    // 4. Send email
    await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.NOTIFICATION_EMAIL_FROM}>`,
      to: user.email,
      subject: template.subject,
      text,
      html,
    });

    logger.info(`Sent ${type} email to ${user.email}`);
    return true;
  } catch (error) {
    logger.error(`Email failed (${type} to ${userId}):`, error.message);
    return false;
  }
};

// export const sendBatchEmails = async (userIds, type, data = {}) => {
//   const users = await User.find({ _id: { $in: userIds } }).select("email");

//   if (users.length === 0) {
//     logger.error("No users found for batch email");
//     return false;
//   }

//   const template = templates[type](data.courseName);

//   try {
//     await transporter.sendMail({
//       from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.NOTIFICATION_EMAIL_FROM}>`,
//       bcc: users.map((u) => u.email),
//       subject: template.subject,
//       text: template.text,
//       html: template.html,
//     });

//     logger.info(`Sent batch ${type} emails to ${users.length} users`);
//     return true;
//   } catch (error) {
//     logger.error("Batch email failed:", error.message);
//     return false;
//   }
// };
export const sendBatchEmails = async (userIds, type, data = {}) => {
  try {
    // Check if email service is configured
    if (
      !process.env.BREVO_SMTP_HOST ||
      !process.env.BREVO_SMTP_USER ||
      !process.env.BREVO_SMTP_KEY
    ) {
      logger.warn("Email service not configured, skipping batch email send");
      return false;
    }

    logger.info(`Preparing to send ${type} emails to ${userIds.length} users`);

    const users = await User.find({ _id: { $in: userIds } }).select("email");
    if (!users.length) {
      logger.error("No valid users found for batch email");
      return false;
    }

    const template = templates[type](data.courseName, data.requester);
    if (!template) {
      throw new Error(`Email template not found for type: ${type}`);
    }

    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.NOTIFICATION_EMAIL_FROM}>`,
      bcc: users.map((u) => u.email),
      subject: template.subject,
      text: template.text,
      html: template.html,
    };

    logger.info("Mail options:", {
      from: mailOptions.from,
      bccCount: mailOptions.bcc.length,
      subject: mailOptions.subject,
    });

    const info = await transporter.sendMail(mailOptions);
    logger.info(
      `Batch email sent to ${users.length} users. Message ID: ${info.messageId}`
    );
    return true;
  } catch (error) {
    logger.error("Batch email failed:", {
      error: error.message,
      stack: error.stack,
      type,
      userIds,
    });
    throw error; // Re-throw to handle in calling function
  }
};

// Specialized functions
export const sendPasswordResetEmail = (email, resetLink) => {
  const template = templates.password_reset(resetLink);

  return transporter.sendMail({
    to: email,
    subject: template.subject,
    text: template.text,
    html: template.html,
  });
};

export const sendCourseAnnouncement = (course, userIds) => {
  return sendBatchEmails(userIds, "new_course", {
    courseName: course.title,
  });
};
