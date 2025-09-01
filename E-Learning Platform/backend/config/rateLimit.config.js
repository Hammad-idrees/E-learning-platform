import rateLimit from "express-rate-limit";

// Named export
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 600, // Limit each IP to 200 requests per window
  message: "Too many requests from this IP, please try again later",
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false, // Disable X-RateLimit-* headers
});

// Alternative if you prefer default export:
// const apiLimiter = rateLimit({...});
// export default apiLimiter;
