// JWT Configuration
export default {
  secret: process.env.JWT_SECRET || "fallback_secret_please_change",
  expiresIn: process.env.JWT_EXPIRES_IN || "7d",
};
