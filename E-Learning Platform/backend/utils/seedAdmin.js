import User from "../models/User.model.js";
import { hashPassword } from "../services/auth.service.js";
import logger from "./logger.js";

const seedAdmin = async () => {
  try {
    // it checks for admin role and then confirms it's email from the env to check it matches the admin email or not
    const adminExists = await User.exists({
      email: process.env.ADMIN_EMAIL,
      isAdmin: true,
    });

    if (!adminExists) {
      await User.create({
        firstName: "Admin",
        lastName: "System",
        username: "admin",
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        country: "Pakistan",
        isAdmin: true,
      });
      logger.info("Default admin account created");
    }
  } catch (error) {
    logger.error(`Admin seeding failed: ${error.message}`);
    process.exit(1); // Fail startup if seeding fails
  }
};

export default seedAdmin;
